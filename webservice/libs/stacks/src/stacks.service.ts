import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { Instance } from './interfaces/instance.interface';
import { UpdateInstanceDTO } from './dto/update-instance.dto';
import { AwsService } from '@truechoice/aws';
import { NotificationService } from '@truechoice/notification';
import * as _ from 'lodash';
import { StackRepository } from './repositories/stack-repository';
import { AwsUtil } from './helpers';
import { count } from 'console';

@Injectable()
export class StacksService {
  private readonly logger = new Logger(StacksService.name);
  private readonly awsUtil = new AwsUtil(this.awsService);
  public shellCommand: string = '';

  /**@namespace StacksService
   * @description Intergrates with AWS API for instance discovery,
   *              typing and appliction installation
   * @param  ServerModel 'Mongoose ORM Model and Interface'
   * @param  awsService 'AWS API Interface'
   * @param  notificationService 'AWS API Interface'
   */
  constructor(
    private readonly stackRepository: StackRepository,
    private readonly awsService: AwsService,
    @Optional()
    @Inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  /**@async
   * @description Deletes instances by it's `stackname`
   * @param stackname
   * @returns `Removed [#] instances with stackName [stackname]`
   */
  async deleteInstanceByStackName(stackname: string): Promise<string> {
    const deletedCount = await this.stackRepository.deleteMany({ stackname: stackname });
    let message = `Removed ${deletedCount} instances with stackName ${stackname}`;
    if (deletedCount > 0) {
      this.logger.log(message);
      this.notificationService.createNotification({
        topic: 'server',
        message: message
      });
    }
    return message;
  }

  /**@async
   * @description Returns a list of server filtered by it's `stackname`
   * @param  stackname
   * @returns array of instances
   */
  async getInstancesByStackName(stackname: string): Promise<Instance[]> {
    const instanance = await this.stackRepository.find({ stackname: stackname });
    if (instanance) {
      this.logger.log(`Found ${instanance.length} servers for stack ${stackname}`);
    }
    return instanance;
  }

  /**@async
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
   * @param stackname
   * @returns array of instances
   * @todo refactor to extra into private function so as not to expose the AWS Service
   */
  async setInstancesByStackName(stackname: string): Promise<Instance[]> {
    this.logger.log(`Refreshing or adding new stack for ${stackname}`);
    const instanances = await this.awsService.describeInstance(stackname);
    const servers = [];

    if (instanances) {
      let deletedCount = await this.stackRepository.deleteMany({ stackname: stackname });
      if (deletedCount > 0) {
        let message = `Removed ${deletedCount} instances from ${stackname} stack`;
        this.logger.log(message);
        this.notificationService.createNotification({
          topic: 'server',
          message: message
        });
      }
      for (const data of instanances) {
        for (const instance of data['Instances']) {
          let server = this.awsUtil.setAWSDescribe2ServerObj(instance, stackname);
          servers.push(server);
          await this.setInstance(server);
        }
      }
    }

    return servers;
  }
  /**@async
   * @borrows setInstance @see this.setInstance()
   * @param createServerDTO
   * @returns new single instance object
   */
  public async createInstance(createServerDTO: CreateInstanceDTO): Promise<Instance> {
    return this.setInstance(createServerDTO);
  }

  /**@async
   * @description Creates a new record in the database based on the
   *              Server interface and createServerDTO values. Using
   *              a DTO Data Transfer Object for encapculating a
   *              large number of parameters for easy transporting
   *
   * @param  createServerDTO
   * @returns new single instance object
   */
  private async setInstance(createServerDTO: CreateInstanceDTO): Promise<Instance> {
    const instance = await this.stackRepository.createInstance(createServerDTO);
    if (instance) {
      this.logger.log(`Created server ${instance.shortname} with id: ${instance._id}`);
      this.notificationService.createNotification({
        topic: 'server',
        message: `Created server ${instance.shortname}`
      });
    }
    return instance;
  }

  /**@async
   * @description List of servers stored in the database
   * @returns array of instances objects
   */
  async getStacks(): Promise<Instance[]> {
    const instance = await this.stackRepository.find();
    if (instance) {
      this.logger.log(`Found ${instance.length} servers`);
      return await this.awsUtil.validateInstance(instance);
    }
    this.logger.log(`0 Servers found`);
    return [];
  }

  /**@async
   * @description Finds a single server by `shortname`
   * @example getServerByShortName('dev')
   *          getServerByShortName('i-0bff3d262cc007a68')
   * @param shortname  shortname or alias_shortname
   * @returns single instance object
   */
  async getServerByShortName(shortname: string): Promise<Instance | undefined> {
    const query = {
      $or: [{ shortname: shortname }, { alias_shortname: shortname }, { name: shortname }]
    };
    const instance = await this.stackRepository.findOne(query);
    if (instance) {
      this.logger.log(`Found server details for: "${shortname}" by shortname`);
    }
    return instance;
  }

  /**@async
   * @description Update a server record by it's database `id`
   *              using the UpdateServerDTO.
   * @param id
   * @param updateServerDTO
   * @returns single instance object
   */
  async updateInstanceById(id: string, updateInstanceDTO: UpdateInstanceDTO): Promise<Instance> {
    const instance = await this.stackRepository.findOneAndUpdate({ _id: id }, updateInstanceDTO);
    if (instance) {
      this.logger.log(`Updated ${id}`);
      this.notificationService.createNotification({
        topic: 'server',
        message: `Updating server "${id}" with ${JSON.stringify(updateInstanceDTO)}`
      });
    }
    return instance;
  }
}
