import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user-repository';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createuser.dto';
import { ValidateUserDto } from './dto/validateuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

const mockUserRespository = () => ({
  createUser: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneSafe: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn()
});

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UserRepository, useFactory: mockUserRespository }],
      controllers: [UsersController]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.getUsers).toBeDefined();
    expect(controller.createUser).toBeDefined();
    expect(controller.validateUser).toBeDefined();
    expect(controller.updateUserById).toBeDefined();
    expect(controller.removeUserById).toBeDefined();
    expect(controller.updatePasswordById).toBeDefined();
    expect(controller.updateApiKeyById).toBeDefined();
  });

  describe('createUser', () => {
    it('creates a new users', async () => {
      const request: CreateUserDto = {
        username: 'test-user',
        password: '12',
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@email.com',
        roles: ['admin', 'anything']
      };

      jest.spyOn(service, 'createUser');
      jest.spyOn(service, 'hash');
      jest.spyOn(repository, 'createUser');

      const result = await controller.createUser(request);
      expect(service.createUser).toHaveBeenCalled();
      expect(repository.createUser).toHaveBeenCalled();
      expect(service.hash).toHaveBeenCalled();
      expect(service.hash).toHaveBeenNthCalledWith(1, '12', request.salt);
      expect(service.hash).toHaveBeenNthCalledWith(2, service.apikey, request.salt);
      expect(service.createUser).toBeCalledWith(request);
      expect(result).toBe(service.apikey);
    });
  });

  describe('getUsers', () => {
    it('should finds all users', async () => {
      jest.spyOn(service, 'getUsers');
      jest.spyOn(repository, 'find');
      await controller.getUsers();
      expect(service.getUsers).toHaveBeenCalled();
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should find one user', async () => {
      const userId = '5ef417b79a506c20486ac100';
      jest.spyOn(repository, 'find');
      jest.spyOn(service, 'getUserById');
      await controller.getUserById(userId);
      expect(service.getUserById).toHaveBeenCalled();
      expect(service.getUserById).toBeCalledWith(userId);
      expect(repository.findOneSafe).toBeCalledWith({ _id: userId });
    });
  });

  describe('removeUserById', () => {
    it('should find one user and delete', async () => {
      const userId = '5ef417b79a506c20486ac100';
      jest.spyOn(service, 'removeUserById');
      jest.spyOn(repository, 'findOneAndDelete');
      await controller.removeUserById(userId);
      expect(service.removeUserById).toHaveBeenCalled();
      expect(service.removeUserById).toBeCalledWith(userId);
      expect(repository.findOneAndDelete).toHaveBeenCalled();
      expect(repository.findOneAndDelete).toBeCalledWith(userId);
    });
  });

  describe('updatePasswordById', () => {
    it('should update user', async () => {
      const _id = '5ef417b79a506c20486ac100';
      const findOneResult: any = {
        _id: _id,
        username: 'test-user',
        salt: '$2b$10$UUQnLrI4lYz8jwIEozdN/e'
      };
      const user: any = {
        username: 'test-user',
        password: '12',
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@email.com',
        roles: ['admin', 'anything']
      };
      const updateUserDto: UpdateUserDto = {
        password: 'password123'
      };

      jest.spyOn(service, 'updatePasswordById');
      jest.spyOn(service, 'hash');
      jest.spyOn(repository, 'findOne').mockImplementation(() => findOneResult);
      jest.spyOn(repository, 'findOneAndUpdate').mockImplementation(() => findOneResult);

      const response = await controller.updatePasswordById(updateUserDto, _id);
      expect(service.updatePasswordById).toHaveBeenCalled();
      expect(service.updatePasswordById).toBeCalledWith(updateUserDto, _id);
      expect(repository.findOne).toBeCalledWith({ _id: _id });
      expect(service.hash).toBeCalledWith(updateUserDto.password, findOneResult.salt);
      expect(repository.findOneAndUpdate).toBeCalledWith(
        { _id: _id },
        { password: service.password }
      );
      expect(response).toBe('Successfully updated password');
    });
  });

  describe('updateApiKeyById', () => {
    it('should update user', async () => {
      const hashedApiKey: any = '$2b$10$UUQnLrI4lYz8jwIEozdN/eNDQtvbEK2pRu76lTo77V7ALGdvj/uIu';
      const _id = '5ef417b79a506c20486ac100';
      const findOneResult: any = {
        username: 'test-user',
        salt: '$2b$10$UUQnLrI4lYz8jwIEozdN/e'
      };
      const user: any = {
        username: 'test-user',
        password: '12',
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@email.com',
        roles: ['admin', 'anything']
      };

      jest.spyOn(service, 'updateApiKeyById');
      jest.spyOn(service, 'hash').mockImplementation(() => hashedApiKey);
      jest.spyOn(repository, 'findOne').mockImplementation(() => findOneResult);
      jest.spyOn(repository, 'findOneAndUpdate').mockImplementation(() => findOneResult);

      const response = await controller.updateApiKeyById(_id);
      expect(service.updateApiKeyById).toHaveBeenCalled();
      expect(service.updateApiKeyById).toBeCalledWith(_id);
      expect(repository.findOne).toBeCalledWith({ _id: _id });
      expect(service.hash).toBeCalledWith(service.apikey, findOneResult.salt);
      expect(repository.findOneAndUpdate).toBeCalledWith({ _id: _id }, { apikey: hashedApiKey });
      expect(response).toBe(service.apikey);
    });
  });

  describe('updateUserById', () => {
    it('should update user', async () => {
      const userId = '5ef417b79a506c20486ac100';
      const user: any = {
        username: 'test-user'
      };
      const updateUserDto: UpdateUserDto = {
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@email.com',
        roles: ['admin', 'anything']
      };

      jest.spyOn(service, 'updateUserById');
      jest.spyOn(service, 'getUserById');
      jest.spyOn(repository, 'findOneAndUpdate').mockImplementation(() => user);

      const response = await controller.updateUserById(updateUserDto, userId);
      expect(service.updateUserById).toHaveBeenCalled();
      expect(service.getUserById).not.toHaveBeenCalled();
      expect(service.updateUserById).toBeCalledWith(updateUserDto, userId);
      expect(repository.findOneAndUpdate).toBeCalledWith({ _id: userId }, updateUserDto);
      expect(response).toBe('User Succesfully Updated');
    });
  });

  describe('validateUser', () => {
    it('Validates username and password', async () => {
      const user: any = {
        username: 'test-user',
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@email.com',
        roles: ['admin', 'anything']
      };
      const request: ValidateUserDto = {
        username: 'test-user',
        password: 'password123'
      };

      jest.spyOn(service, 'validateUser');
      jest.spyOn(repository, 'findOne').mockImplementation(() => user);
      jest.spyOn(repository, 'findOneAndUpdate');
      jest.spyOn(service, 'validateHashedPasswordOrApiKey').mockResolvedValue(true);

      const result = await controller.validateUser(request);
      expect(service.validateUser).toHaveBeenCalled();
      expect(service.validateUser).toBeCalledWith(request);
      expect(repository.findOne).toBeCalledWith({ username: request.username });
      expect(service.validateHashedPasswordOrApiKey).toBeCalledWith(request, user);
      expect(service.validUser).toBeTruthy();
      expect(repository.findOneAndUpdate).toHaveBeenCalled();
      expect(result.name).toBe('John Doe');
    });

    it('Validates api key', async () => {
      const apiUser: any = {
        username: 'jenkins',
        apikey: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
        first_name: 'Jenkins',
        last_name: 'Pipeline'
      };
      const request: ValidateUserDto = {
        username: 'jenkins',
        apikey: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
      };

      jest.spyOn(service, 'validateUser');
      jest.spyOn(repository, 'findOne').mockImplementation(() => apiUser);
      jest.spyOn(repository, 'findOneAndUpdate');
      jest.spyOn(service, 'validateHashedPasswordOrApiKey').mockResolvedValue(true);

      const result = await controller.validateUser(request);
      expect(service.validateUser).toHaveBeenCalled();
      expect(service.validateUser).toBeCalledWith(request);
      expect(repository.findOne).toBeCalledWith({ username: request.username });
      expect(service.validateHashedPasswordOrApiKey).toBeCalledWith(request, apiUser);
      expect(service.validUser).toBeTruthy();
      expect(repository.findOneAndUpdate).toHaveBeenCalled();
      expect(result.name).toBe('Jenkins Pipeline');
    });
  });
});
