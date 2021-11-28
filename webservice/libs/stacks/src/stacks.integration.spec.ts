import { Test, TestingModule } from '@nestjs/testing';
import { StacksController } from './stacks.controller';
import { StacksService } from './stacks.service';
import { StackRepository } from './repositories/stack-repository';
import { AwsService, AwsModule } from '@truechoice/aws';
import { UpdateInstanceDTO } from './dto/update-instance.dto';

const mockStackRepository = () => ({
  createInstance: jest.fn(),
  deleteMany: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn()
});

describe('Stacks Controller', () => {
  let controller: StacksController;
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
      ],
      controllers: [StacksController]
    }).compile();

    controller = module.get<StacksController>(StacksController);
    service = module.get<StacksService>(StacksService);
    repository = module.get<StackRepository>(StackRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.getStacks).toBeDefined();
    expect(controller.getInstancesByStackName).toBeDefined();
    expect(controller.setInstancesByStackName).toBeDefined();
    expect(controller.updateInstanceById).toBeDefined();
  });

  describe('deleteInstanceByStackName', () => {
    it('should find and delete instance by stackname', async () => {
      const stackname = 'dev-us-east-1-default';
      jest.spyOn(service, 'deleteInstanceByStackName');
      jest.spyOn(repository, 'deleteMany');
      await controller.deleteInstanceByStackName(stackname);
      expect(service.deleteInstanceByStackName).toHaveBeenCalled();
      expect(service.deleteInstanceByStackName).toBeCalledWith(stackname);
      expect(repository.deleteMany).toHaveBeenCalled();
      expect(repository.deleteMany).toBeCalledWith({ stackname: stackname });
    });
  });

  describe('getInstancesByStackName', () => {
    it('should gets listing of all instances', async () => {
      const stackname = 'dev-us-east-1-default';
      jest.spyOn(service, 'getInstancesByStackName');
      jest.spyOn(repository, 'find');
      await controller.getInstancesByStackName(stackname);
      expect(service.getInstancesByStackName).toHaveBeenCalled();
      expect(repository.find).toHaveBeenCalled();
      expect(repository.find).toBeCalledWith({ stackname: stackname });
    });
  });

  describe('getStacks', () => {
    it('should gets listing of all instances', async () => {
      jest.spyOn(service, 'getStacks');
      jest.spyOn(repository, 'find');
      await controller.getStacks();
      expect(service.getStacks).toHaveBeenCalled();
      expect(repository.find).toHaveBeenCalled();
      expect(repository.find).toBeCalledWith();
    });
  });

  /*Pending code change on the service to extract AWS Service
  describe('setInstancesByStackName', () => {
    it('should find all instances for a stack', async () => {
      const stack = 'staging-us-east-2-solstice';
      jest.spyOn(service, 'setInstancesByStackName');
      jest.spyOn(repository, 'deleteMany');
      await controller.setInstancesByStackName(stack);
      expect(service.setInstancesByStackName).toHaveBeenCalled();
      expect(service.setInstancesByStackName).toBeCalledWith(stack);
      
    });
  });*/

  describe('updateInstanceById', () => {
    it('should find and update instance by _id', async () => {
      const id = '5f24590a13e7952f343d1b11';
      const update: UpdateInstanceDTO = {
        shortname: 'dev',
        username: 'ubuntu',
        alias_shortname: 'dev2-internal'
      };
      jest.spyOn(service, 'updateInstanceById');
      jest.spyOn(repository, 'findOneAndUpdate');
      await controller.updateInstanceById(id, update);
      expect(service.updateInstanceById).toHaveBeenCalled();
      expect(service.updateInstanceById).toBeCalledWith(id, update);
      expect(repository.findOneAndUpdate).toHaveBeenCalled();
      expect(repository.findOneAndUpdate).toBeCalledWith({ _id: id }, update);
    });
  });
});
