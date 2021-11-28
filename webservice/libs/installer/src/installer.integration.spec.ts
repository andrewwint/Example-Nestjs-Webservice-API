import { Test, TestingModule } from '@nestjs/testing';
import { InstallerController } from './installer.controller';
import { StackRepository } from '@truechoice/stacks/repositories/stack-repository';
import { InstallApplicationDTO } from './dto/install-application.dto';
import { InstallerService } from './installer.service';
import { SsmService } from '@truechoice/ssm';

const mockStackRepository = () => ({
  findOne: jest.fn()
});
const mockSsmService = () => ({
  executeShellCommandAndReturnCommandId: jest.fn()
});

describe('Installer Controller', () => {
  let controller: InstallerController;
  let service: InstallerService;
  let repository: StackRepository;
  let ssm: SsmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstallerService,
        StackRepository,
        { provide: StackRepository, useFactory: mockStackRepository },
        SsmService,
        { provide: SsmService, useFactory: mockSsmService }
      ],
      controllers: [InstallerController]
    }).compile();

    controller = module.get<InstallerController>(InstallerController);
    service = module.get<InstallerService>(InstallerService);
    repository = module.get<StackRepository>(StackRepository);
    ssm = module.get<SsmService>(SsmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.installByInstanceId).toBeDefined();
  });

  describe('installByInstanceId', () => {
    it('should install an applicaiton to a server', async () => {
      const instance: any = { instance_id: '5f275f06f6f50377a0e96aaa', servertype: 'App' };
      const request: InstallApplicationDTO = {
        instance_id: '5f275f06f6f50377a0e96aaa',
        environment: 'production',
        nodesize: 'large',
        version: '0.4.20',
        region: 'us-east-1'
      };

      jest.spyOn(service, 'installByInstanceId');
      jest.spyOn(service, 'setShellCommand');
      jest.spyOn(repository, 'findOne').mockImplementation(() => instance);
      jest.spyOn(ssm, 'executeShellCommandAndReturnCommandId');

      await controller.installByInstanceId(
        request.instance_id,
        request.environment,
        request.nodesize,
        request.version,
        request.region
      );

      expect(service.installByInstanceId).toHaveBeenCalled();
      expect(service.installByInstanceId).toHaveBeenCalledWith(request);
      expect(repository.findOne).toHaveBeenCalled();
      expect(service.setShellCommand).toHaveBeenCalled();
      expect(service.setShellCommand).toBeCalledWith(instance, request);
      expect(repository.findOne).toBeCalledWith({ instance_id: '5f275f06f6f50377a0e96aaa' });
      expect(ssm.executeShellCommandAndReturnCommandId).toHaveBeenCalled();
      expect(ssm.executeShellCommandAndReturnCommandId).toBeCalledWith(
        service.shellCommand,
        request.instance_id,
        request.region
      );
    });
  });
});
