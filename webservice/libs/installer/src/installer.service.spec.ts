import { Test, TestingModule } from '@nestjs/testing';
import { InstallerService } from './installer.service';
import { StackRepository } from '@truechoice/stacks/repositories/stack-repository';
import { InstallApplicationDTO } from './dto/install-application.dto';
import { SsmService } from '@truechoice/ssm';
const mockStackRepository = () => ({});

describe('InstallerService', () => {
  let service: InstallerService;
  let repository: StackRepository;
  let ssm: SsmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstallerService,
        StackRepository,
        { provide: StackRepository, useFactory: mockStackRepository },
        SsmService
      ]
    }).compile();

    service = module.get<InstallerService>(InstallerService);
    repository = module.get<StackRepository>(StackRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.installByInstanceId).toBeDefined();
    expect(service.setShellCommand).toBeDefined();
    expect(service.shellCommand).toBeDefined();
  });

  describe('setInstallShellCmdByServerObj', () => {
    it('Installing applicaiton a server', async () => {
      const installApplicationDTO: InstallApplicationDTO = {
        environment: 'production',
        nodesize: 'large',
        version: '0.4.20'
      };
      const server: any = {
        username: 'ubuntu',
        ip: '10.10.10.1',
        environment: 'production',
        servertype: 'Web',
        version: '4.3.5'
      };
      const command = `sh /home/ubuntu/load/install.sh production Web large 0.4.20`;
      await service.setShellCommand(server, installApplicationDTO);
      expect(service.shellCommand).toStrictEqual(command);
    });
  });
});
