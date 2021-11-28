import { Test, TestingModule } from '@nestjs/testing';
import { StacksService } from './stacks.service';
import { StackRepository } from './repositories/stack-repository';
import { AwsService, AwsModule } from '@truechoice/aws';

const mockStackRepository = () => ({});

describe('StacksService', () => {
  let service: StacksService;
  let repository: StackRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AwsModule],
      providers: [
        StacksService,
        AwsService,
        StackRepository,
        { provide: StackRepository, useFactory: mockStackRepository }
      ]
    }).compile();

    service = module.get<StacksService>(StacksService);
    repository = module.get<StackRepository>(StackRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.shellCommand).toBeDefined();
    expect(service.deleteInstanceByStackName).toBeDefined();
    expect(service.getServerByShortName).toBeDefined();
    expect(service.getStacks).toBeDefined();
    expect(service.setInstancesByStackName).toBeDefined();
  });
});
