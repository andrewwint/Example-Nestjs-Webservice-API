/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AwsUtil } from './aws-util';
import { AwsService } from '@truechoice/aws';
import { EC2 } from 'aws-sdk';
import { CreateInstanceDTO } from '../dto/create-instance.dto';
import { Instance } from '../interfaces/instance.interface';

describe('AwsUtil', () => {
  let util: AwsUtil;
  let aws: AwsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsService, AwsUtil]
    }).compile();
    util = module.get<AwsUtil>(AwsUtil);
    aws = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(util).toBeDefined();
    expect(util.getTagValueByKey).toBeDefined();
    expect(util.setAWSDescribe2ServerObj).toBeDefined();
    expect(util.validateInstance).toBeDefined();
  });

  describe('getTagValueByKey', () => {
    it('Filters values from the AWS Tag Object ', async () => {
      const Tags: EC2.TagList = [
        { Key: 'StackName', Value: 'production-eu-west-2-hys' },
        { Key: 'Version', Value: '0.3.0' },
        { Key: 'Environment', Value: 'production' },
        { Key: 'ServerType', Value: 'Database' },
        { Key: 'StackType', Value: 'Application' }
      ];
      expect(util.getTagValueByKey(Tags, 'ServerType')).toStrictEqual('Database');
      expect(util.getTagValueByKey(Tags, 'Environment')).toStrictEqual('production');
      expect(util.getTagValueByKey(Tags, 'ServerType')).toStrictEqual('Database');
      expect(util.getTagValueByKey(Tags, 'StackType')).toStrictEqual('Application');
      expect(util.getTagValueByKey(Tags, 'StackName')).toStrictEqual('production-eu-west-2-hys');
    });
  });

  describe('setAWSDescribe2ServerObj', () => {
    it('Mutates AWS describeInstances output to a Model<Server> Object for [ubuntu] user ', async () => {
      const stackName = 'staging-us-east-1-default';
      const awsInstance: EC2.Instance = {
        InstanceId: 'i-086708117152e6cc1',
        InstanceType: 't2.micro',
        PrivateIpAddress: '172.31.5.52',
        PublicIpAddress: '54.174.239.156',
        State: { Code: 16, Name: 'running' },
        Tags: [
          { Key: 'StackName', Value: 'staging-us-east-1-default' },
          { Key: 'Name', Value: 'staging-us-east-1-v2-db-1' },
          { Key: 'Version', Value: '0.3.0' },
          { Key: 'Environment', Value: 'staging' },
          { Key: 'ServerType', Value: 'MySQL Database' },
          { Key: 'StackType', Value: 'Application' }
        ]
      };

      const server: CreateInstanceDTO = {
        shortname: 'staging-us-east-1-v2-db-1',
        stackname: 'staging-us-east-1-default',
        username: 'ubuntu',
        version: '0.3.0',
        instance_type: 't2.micro',
        instance_id: 'i-086708117152e6cc1',
        name: 'staging-us-east-1-v2-db-1',
        environment: 'staging',
        ip: '54.174.239.156',
        private_ip: '172.31.5.52',
        servertype: 'MySQL',
        stacktype: 'Application',
        status: 'Code 16 Name running'
      };
      const result = util.setAWSDescribe2ServerObj(awsInstance, stackName);
      expect(result).toStrictEqual(server);
    });

    it('Mutates AWS describeInstances output to a Model<Server> Object for [ec2-user] user ', async () => {
      const stackName = 'production-eu-west-2-hys';
      const awsInstance: EC2.Instance = {
        InstanceId: 'i-086708117152e6cc1',
        PrivateIpAddress: '172.31.5.52',
        InstanceType: 't2.micro',
        PublicIpAddress: '15.174.239.156',
        State: { Code: 16, Name: 'running' },
        Tags: [
          { Key: 'StackName', Value: 'production-eu-west-2-hys' },
          { Key: 'Name', Value: 'staging-us-east-1-v2-web-2' },
          { Key: 'Version', Value: '0.3.0' },
          { Key: 'Environment', Value: 'production' },
          { Key: 'ServerType', Value: 'App Server' },
          { Key: 'StackType', Value: 'Application' }
        ]
      };

      const server: CreateInstanceDTO = {
        shortname: 'staging-us-east-1-v2-web-2',
        stackname: 'production-eu-west-2-hys',
        username: 'ubuntu',
        instance_id: 'i-086708117152e6cc1',
        instance_type: 't2.micro',
        name: 'staging-us-east-1-v2-web-2',
        version: '0.3.0',
        environment: 'production',
        ip: '15.174.239.156',
        private_ip: '172.31.5.52',
        servertype: 'App',
        stacktype: 'Application',
        status: 'Code 16 Name running'
      };
      const result = util.setAWSDescribe2ServerObj(awsInstance, stackName);
      expect(result).toStrictEqual(server);
    });
  });
  describe('validateInstance', () => {
    it('Checks for the exsistance of a stack by the stackname ', async () => {
      const instances: any = [
        {
          shortname: 'i-086708117152e6cc1',
          stackname: 'staging-us-east-2-solstice'
        },
        {
          shortname: 'i-086708117152e6cc2',
          stackname: 'staging-us-east-2-solstice'
        },
        {
          shortname: 'i-086708117152e6cc3',
          stackname: 'staging-us-east-2-solstice'
        }
      ];
      const verified = await util.validateInstance(instances);
      expect(verified).toEqual(instances);
    });
  });
});
