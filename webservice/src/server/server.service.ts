/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Model } from 'mongoose';
import {
  Injectable,
  Logger,
  NotFoundException,
  Inject,
  Optional,
  forwardRef
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateServerDTO } from './dto/create-server.dto';
import { Server } from './server.interface';
import { UpdateServerDTO } from './dto/update-server.dto';
import { AwsService } from '../aws/aws.service';
import * as AWS from 'aws-sdk';
import { version } from 'punycode';
import { NotificationService } from '@truechoice/notification';
import { SsmService } from '@truechoice/ssm';
import * as _ from 'lodash';

@Injectable()
export class ServerService {
  private logger = new Logger('server');
  public shellCommand: string;

  /**
   * @description Intergrates with AWS API for instance discovery,
   *              typing and appliction installation
   *
   * @param  {Model<Server>} ServerModel 'Mongoose ORM Model and Interface'
   * @param  {AwsService} awsService 'AWS API Interface'
   */
  constructor(
    @InjectModel('Server') private readonly serverModel: Model<Server>,
    private readonly awsService: AwsService,
    @Optional()
    @Inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  /**
   * @description List {Array} of servers stored in the database
   * @returns {Promise<Server[]>}
   */
  async getServers(): Promise<Server[]> {
    const result = await this.serverModel.find().exec();
    if (result.length !== 0) {
      this.logger.log(`Found ${result.length} servers`);
      return await this.validateInstance(result);
    }
    this.logger.log(`0 Servers found`);
    return [];
  }

  /**@async
   * @function validateInstance
   * @description Checks for the exsistance of a stack by the stackname
   *              set `xmlimportsupport` property to true | false
   *              if the stack exist on AWS
   * @param {Server[]} servers required array of servers
   * @returns {Server[]}
   */
  private async validateInstance(servers: Server[]): Promise<Server[]> {
    this.logger.log(`Validating instances`);
    let validatedServers = [];
    try {
      for (const stack of _.uniqBy(servers, 'stackname')) {
        if (stack.stackname !== undefined) {
          await this.awsService.describeInstance(stack.stackname);
          for (const server of servers) {
            //status: `Code ${awsInstance.State.Code} Name ${awsInstance.State.Name}`

            if (stack.stackname === server.stackname) {
              console.log(stack.stackname, stack.instance_id, this.awsService.instanances[1]);
              Object.assign(server, {
                xmlimportsupport: this.awsService.instanances.length === 0 ? false : true
              });
              validatedServers.push(server);
            }
          }
        }
      }
      return validatedServers;
    } catch (error) {
      return servers;
    }
  }

  /**
   * @description Returns a list of server filtered by it's `stackname`
   * @param  {String} stackname
   * @returns {Promise<Server[]>}
   */
  async getServersByStackName(stackname: string): Promise<Server[]> {
    const result = await this.serverModel.find({ stackname: stackname }).exec();
    this.logger.log(`Found ${result.length} servers for stack ${stackname}`);
    return result;
  }

  /**
   * @description Creates a new record in the database based on the
   *              Server interface and createServerDTO values. Using
   *              a DTO Data Transfer Object for encapculating a
   *              large number of parameters for easy transporting
   *
   * @param  {CreateServerDTO} createServerDTO
   * @returns  {Promise<Server>}
   */
  async setServer(createServerDTO: CreateServerDTO): Promise<Server> {
    const newServer = await new this.serverModel(createServerDTO).save();
    this.logger.log(`Created server ${newServer.shortname} with id: ${newServer._id}`);
    this.notificationService.createNotification({
      topic: 'server',
      message: `Created server ${newServer.shortname}`
    });
    return newServer;
  }

  /**
   * @description Composition of methods to injests/refreshes a number of servers into
   *              the database for a set of EC2 instances using the Tags.Key
   *              `StackName` Value.
   *
   *              1. Performs AWS api call to describe all instances `Filtered`
   *                 by Tags.Key = 'StackName'
   *              2. Deletes existing record in the database to ensure the lasted
   *                 information is store incase a new IP address is assigned
   *              3. Mutates the AWS describe output to map to the Mongo Server Model
   *              4. Saves a new record in the database
   *
   * @param  {string} stackname
   * @returns {Promise<Server[]>}
   */
  async setServersByStackName(stackname: string): Promise<Server[]> {
    this.logger.log(`Refreshing or adding new stack for ${stackname}`);
    await this.awsService.describeInstance(stackname);
    const servers = [];

    if (this.awsService.instanances.length > 0) {
      await this.deleteServerByStackName(stackname);
    }

    for (const data of this.awsService.instanances) {
      for (const instance of data.Instances) {
        let server = this.setAWSDescribe2ServerObj(instance, stackname);
        servers.push(server);
        await this.setServer(server);
      }
    }

    return servers;
  }

  test() {
    return 'test';
  }

  /**@async
   * @description Finds a single server by `shortname`
   *
   * @example getServerByShortName('dev')
   *          getServerByShortName('i-0bff3d262cc007a68')
   *
   * @param  {String} shortname
   * @returns {Promise<Server>}
   */
  async getServerByShortName(shortname: string = 'dev'): Promise<Server> {
    console.log('servers.getServerByShortName');
    console.log('asdf', shortname);

    const result = await this.serverModel
      .findOne({
        $or: [{ shortname: shortname }, { alias_shortname: shortname }]
      })
      .exec();
    this.logger.log(`Found server details for: "${result.shortname}" by shortname`);
    return result;
  }

  /**@async
   * @description Finds a single server by AWS `instance_id`
   *
   * @example  getServerByInstanceId('i-0bff3d262cc007a68')
   *
   * @param  {String} instance_id
   * @returns {Promise<Server>}
   */
  async getServerByInstanceId(instance_id: string): Promise<Server> {
    const result = await this.serverModel.findOne({ instance_id: instance_id }).exec();
    this.logger.log(`Found server details for: "${result.instance_id}" by instance_id`);
    return result;
  }

  /**
   * @description Finds servers by AWS `Tags.ServerType` value stored in the
   *              MongoDB copied from AWS describeInstance
   *
   * @param  {String} servertype
   * @returns {Promise<Server[]>}
   */
  async getServersByType(servertype: string): Promise<Server[]> {
    const results = await this.serverModel.find({ servertype: servertype }).exec();
    this.logger.log(`Found ${results.length} server(s) for type ${servertype} `);
    return results;
  }

  /**
   * @description Update a server record by it's `shortname` using the
   *              UpdateServerDTO.
   *
   * @param  {String} shortname
   * @param  {UpdateServerDTO} updateServerDTO
   * @returns {Promise<Server>}
   */
  async updateServerByShortName(
    shortname: string,
    updateServerDTO: UpdateServerDTO
  ): Promise<Server> {
    const result = await this.serverModel.findOneAndUpdate(
      { shortname: shortname },
      updateServerDTO,
      { new: true }
    );
    this.logger.log(`Updated ${shortname}`);
    this.notificationService.createNotification({
      topic: 'server',
      message: `Updated ${shortname} server information`
    });
    return result;
  }

  /**@async
   * @description Update a server record by it's database `id`
   *              using the UpdateServerDTO.
   *
   * @param  {String} id
   * @param  {UpdateServerDTO} updateServerDTO
   * @returns {Promise<Server>}
   */
  async updateServerById(id: string, updateServerDTO: UpdateServerDTO): Promise<Server> {
    const result = await this.serverModel.findOneAndUpdate({ _id: id }, updateServerDTO, {
      new: true
    });
    this.logger.log(`Updated ${id}`);
    this.notificationService.createNotification({
      topic: 'server',
      message: `Updating server "${id}" with ${JSON.stringify(updateServerDTO)}`
    });
    return result;
  }

  /**
   * @description Deletes a server record by it's `shortname`
   *
   * @param  {String} shortname
   * @returns {Promise<Server>}
   */
  async deleteServerByShortName(shortname: string): Promise<Server> {
    const result = await this.serverModel.findOneAndDelete(
      { shortname: shortname },
      { select: '_id' }
    );
    if (result) {
      const message = `Removed server ${shortname} with id: ${result._id}`;
      this.logger.log(message);
      this.notificationService.createNotification({
        topic: 'server',
        message: message
      });
    }
    return result;
  }

  /**
   * @description Deletes a server record by it's `stackname`
   *
   * @param  {String} stackname
   * @returns {Promise<String>}
   */
  async deleteServerByStackName(stackname: string): Promise<String> {
    const result = await this.serverModel.deleteMany({ stackname: stackname });
    let message = `Removed ${result.deletedCount} instances with stackName ${stackname} `;
    if (result.deletedCount > 0) {
      this.logger.log(message);
      this.notificationService.createNotification({
        topic: 'server',
        message: message
      });
    }
    return message;
  }

  /**
   * @description Batch intsalls application on to a Stack
   *              using it's `stackname`
   *
   * @param  {String} stackname @example 'production-eu-west-2-hys'
   * @param  {String} nodesize @example '[ med | large| x-large | xx-large ]'
   * @returns {Promise<String>}
   */
  async installApplicationByStackName(stackname: string, nodesize: string): Promise<string> {
    const instances = await this.getServersByStackName(stackname);
    let result = '';
    for (const instance of instances) {
      result += await this.installApplicationByInstanceId(
        instance.instance_id,
        instance.environment,
        nodesize,
        version,
        this.awsService.getRegionByFilterKey(stackname),
        instance
      );
    }
    return result;
  }

  /**
   * @description Intsalls a single application onto an instance
   *
   * @param  {String} instance_id @example 'i-086708117152e6cc1'
   * @param  {String} environment @example '[ dev | staging | production ]'
   * @param  {String} nodesize    @example '[ med | large| x-large | xx-large ]'
   * @param  {String} version
   * @param  {String} region
   * @param  {Object} instanceobj @default undefined Optional
   * @returns {Promise<String>} String standout or standerr
   */
  async installApplicationByInstanceId(
    instance_id: string,
    environment: string,
    nodesize: string,
    version: string,
    region: string,
    instanceobj = undefined
  ): Promise<string> {
    let server: Server;

    if (instanceobj == undefined) {
      server = await this.getServerByInstanceId(instance_id);
    } else {
      server = instanceobj;
    }

    await this.setInstallShellCmdByServerObj(server, environment, nodesize, version);

    try {
      const ssm = new SsmService();
      const output = await ssm.executeShellCommandAndReturnCommandId(
        this.shellCommand,
        server.instance_id,
        region
      );
      const logMessage = `Installing ${environment} using ${
        this.shellCommand
      } SSM command ID: ${output.trim()}`;
      this.logger.log(logMessage);
      this.notificationService.createNotification({
        topic: 'server',
        message: logMessage
      });
      return `${output}`;
    } catch (error) {
      throw new NotFoundException(
        this.logger.error(`Tried to install ${environment} using ${this.shellCommand}`, error)
      );
    }
  }

  /**
   * @description Mutates Install parameters into ssh -i command
   *
   * @param  {Server<Object>} server @example -t ${server.username}@${server.ip}
   * @param  {String} environment
   * @param  {String} nodesize
   * @return {Promise<String>}
   */
  async setInstallShellCmdByServerObj(
    server: Server,
    environment: String,
    nodesize: String,
    version: String
  ): Promise<String> {
    if (environment !== null && nodesize !== null && version !== null) {
      this.shellCommand = `sh /home/ubuntu/load/install.sh ${environment} ${server.servertype} ${nodesize} ${version}`;
    }
    return this.shellCommand;
  }

  /**
   * @description Mutating AWS describeInstances output into a CreateServerDTO
   *
   * @param  {AWS.EC2.Instance} awsInstance
   * @param  {String} stackName
   * @returns CreateServerDTO
   */
  setAWSDescribe2ServerObj(awsInstance: AWS.EC2.Instance, stackName: String): CreateServerDTO {
    this.logger.log(
      `Mutating AWS describeInstances output for Stack ${stackName} to Model<Server>`
    );
    const Tags: AWS.EC2.TagList = awsInstance.Tags;

    const server: CreateServerDTO = {
      shortname: awsInstance.InstanceId,
      stackname: stackName,
      username:
        this.getTagValueByKey(Tags, 'ServerType').split(' ')[0] == 'App' ? 'ec2-user' : 'ubuntu',
      instance_id: awsInstance.InstanceId,
      name: this.getTagValueByKey(Tags, 'Name'),
      instance_type: awsInstance.InstanceType,
      version: this.getTagValueByKey(Tags, 'Version'),
      environment: this.getTagValueByKey(Tags, 'Environment'),
      ip: awsInstance.PublicIpAddress,
      private_ip: awsInstance.PrivateIpAddress,
      servertype: this.getTagValueByKey(Tags, 'ServerType').split(' ')[0],
      stacktype: this.getTagValueByKey(Tags, 'StackType'),
      status: `Code ${awsInstance.State.Code} Name ${awsInstance.State.Name}`
    };

    return server;
  }

  /**
   * @description Extracts Values from AWS Taglist
   *
   * @example Tags: [{ Key: 'ServerType', Value: 'Database' }]
   *
   *          getTagValueByKey(Tags, 'ServerType')
   *          returns 'Database'
   *
   * @param  {AWS.EC2.TagList} Tags
   * @param  {String} Key
   * @returns {String}
   */
  getTagValueByKey(Tags: AWS.EC2.TagList, TagKey: String): String {
    const result = Tags.find(({ Key }) => Key === TagKey);

    if (result === undefined) {
      this.logger.error(`Key: ${TagKey} not found`);
      return '';
    } else {
      this.logger.log(`Filtering AWS Tags for Key: ${TagKey} = Value: ${result.Value}`);
      return result.Value;
    }
  }
}
