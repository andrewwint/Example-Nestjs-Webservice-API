import { Test, TestingModule } from '@nestjs/testing';
import { ArtifactController } from './artifact.controller';

describe('Artifact Controller', () => {
  let controller: ArtifactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtifactController],
    }).compile();

    controller = module.get<ArtifactController>(ArtifactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
