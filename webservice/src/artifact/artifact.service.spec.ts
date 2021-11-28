import { Test, TestingModule } from '@nestjs/testing';
import { ArtifactService } from './artifact.service';

describe('ArtifactService', () => {
  let service: ArtifactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtifactService],
    }).compile();

    service = module.get<ArtifactService>(ArtifactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
