import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';
import * as AWS from 'aws-sdk';

const mockAwsService = () => ({
  describeInstance: jest.fn(),
  getTagValueByKey: jest.fn(),
});

describe('AwsService', () => {
  let service: AwsService;
  let realservice: AwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsService,
        { provide: AwsService, useFactory: mockAwsService },
      ],
    }).compile();

    service = module.get<AwsService>(AwsService);
    realservice = new AwsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.describeInstance).toBeDefined();
    expect(realservice.getRegionByFilterKey).toBeDefined();
  });

  describe('describeInstance', () => {
    it('Make API call to AWS', async () => {
      const awsInstance: any = [
        {
          Groups: [],
          Instances: [
            {
              AmiLaunchIndex: 0,
              ImageId: 'ami-09d069a04349dc3cb',
              InstanceId: 'i-086708117152e6cc1',
              InstanceType: 't2.micro',
              PrivateDnsName: 'ip-172-31-5-52.ec2.internal',
              PrivateIpAddress: '172.31.5.52',
              PublicDnsName: 'ec2-54-174-239-156.compute-1.amazonaws.com',
              PublicIpAddress: '54.174.239.156',
              SubnetId: 'subnet-5eb4b117',
              VpcId: 'vpc-e2f76f84',
              Architecture: 'x86_64',
              ClientToken: '',
              EbsOptimized: false,
              EnaSupport: true,
              Hypervisor: 'xen',
              RootDeviceName: '/dev/xvda',
              RootDeviceType: 'ebs',
              SourceDestCheck: true,
              ElasticGpuAssociations: [],
              ElasticInferenceAcceleratorAssociations: [],
              NetworkInterfaces: [],
              State: { Code: 16, Name: 'running' },
              Tags: [
                { Key: 'StackName', Value: 'production-eu-west-2-hys' },
                { Key: 'Version', Value: '0.3.0' },
                { Key: 'environment', Value: 'production' },
                { Key: 'ServerType', Value: 'Database' },
                { Key: 'StackType', Value: 'Application' },
              ],
            },
          ],
          OwnerId: '790768631355',
          ReservationId: 'r-01ffbbf6b95aba1fd',
        },
      ];

      jest
        .spyOn(service, 'describeInstance')
        .mockImplementation(() => awsInstance);

      const result = await service.describeInstance('production-eu-west-2-hys');
      expect(service.describeInstance).toHaveBeenCalled();
      expect(service.describeInstance).toHaveBeenCalledWith(
        'production-eu-west-2-hys',
      );

      expect(result).toBe(awsInstance);
    });
  });

  describe('getRegionByFilterKey', () => {
    it('Finds AWS Region by well formed Tag.Key.StackName', async () => {
      expect(
        realservice.getRegionByFilterKey('production-us-east-1-hillspet'),
      ).toStrictEqual('us-east-1');

      expect(
        realservice.getRegionByFilterKey('staging-us-east-2-solstice'),
      ).toStrictEqual('us-east-2');

      expect(
        realservice.getRegionByFilterKey('production-me-south-1-adnoc'),
      ).toStrictEqual('me-south-1');

      expect(
        realservice.getRegionByFilterKey('production-us-east-1-ip'),
      ).toStrictEqual('us-east-1');
    });

    it('Finds AWS Region by malformed Tag.Key.StackName defaulting to us-east-1', async () => {
      expect(
        realservice.getRegionByFilterKey('production-us-east-1'),
      ).toStrictEqual('us-east-1');

      expect(
        realservice.getRegionByFilterKey(
          'production-us-east-2-client-client-something_hello',
        ),
      ).toStrictEqual('us-east-2');

      expect(
        realservice.getRegionByFilterKey('us-east-2-solstice'),
      ).toStrictEqual('us-east-1');

      expect(
        realservice.getRegionByFilterKey(
          'client-client-something_hello_us-east-2-solstice',
        ),
      ).toStrictEqual('us-east-1');

      expect(
        realservice.getRegionByFilterKey('hello-us-east-two-solstice'),
      ).toStrictEqual('us-east-1');
    });
  });
});
