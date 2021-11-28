import { Logger } from '@nestjs/common';
import { Instance } from '../interfaces/instance.interface';
import { AwsService } from '@truechoice/aws';
import { CreateInstanceDTO } from '../dto/create-instance.dto';
import { EC2 } from 'aws-sdk';
import * as _ from 'lodash';

export class AwsUtil {
  private readonly logger = new Logger(AwsUtil.name);
  constructor(private readonly awsService: AwsService) {}
  /**
   * @description Extracts Values from AWS Taglist
   *
   * @example Tags: [{ Key: 'ServerType', Value: 'Database' }]
   *
   *          getTagValueByKey(Tags, 'ServerType')
   *          returns 'Database'
   *
   * @param  {EC2.TagList} Tags
   * @param  {String} Key
   * @returns {String}
   */
  getTagValueByKey(Tags: EC2.TagList, TagKey: String): String {
    const result = Tags.find(({ Key }) => Key === TagKey);
    if (result === undefined) {
      this.logger.error(`Key: ${TagKey} not found`);
      return '';
    } else {
      this.logger.log(`Filtering AWS Tags for Key: ${TagKey} = Value: ${result.Value}`);
      return result.Value;
    }
  }

  /**
   * @description Mutating AWS describeInstances output into a CreateServerDTO
   *
   * @param  {EC2.Instance} awsInstance
   * @param  {String} stackName
   * @returns CreateServerDTO
   */
  setAWSDescribe2ServerObj(awsInstance: EC2.Instance, stackName: string ): CreateInstanceDTO {
    this.logger.log(
      `Mutating AWS describeInstances output for Stack ${stackName} to Model<Server>`
    );
    
    const Tags: EC2.TagList = awsInstance.Tags;  
    const server: CreateInstanceDTO = {
      shortname: this.getTagValueByKey(Tags, 'Name'),
      stackname: stackName,
      username: 'ubuntu',
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

  /**@async
   * @function validateInstance
   * @description Checks for the exsistance of a stack by the stackname
   *              set `xmlimportsupport` property to true | false
   *              if the stack exist on AWS
   * @param {Server[]} servers required array of servers
   * @returns {Server[]}
   */
  async validateInstance(servers: Instance[]): Promise<Instance[]> {
    this.logger.log(`Validating instances`);
    let validatedServers = [];
    try {
      for (const stack of _.uniqBy(servers, 'stackname')) {
        if (stack.stackname !== undefined) {
          const instances = await this.awsService.describeInstance(stack.stackname);
          for (const server of servers) {
            if (stack.stackname === server.stackname) {
              //console.log(stack.stackname, stack.instance_id, this.awsService.instanances[1]);
              Object.assign(server, {
                xmlimportsupport: instances.length === 0 ? false : true
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
}
