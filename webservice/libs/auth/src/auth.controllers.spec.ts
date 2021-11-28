import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginuser.dto';
import { AuthControllerLocal } from './auth.controller-local';
import { AuthControllerJwt } from './auth.controller-jwt';
import { CreateUserDto } from '@truechoice/users/dto/createuser.dto';

const mockAuthService = () => ({
  login: jest.fn(),
  createUser: jest.fn()
});

describe('Auth Controller', () => {
  let controller: AuthController;
  let jwtcontroller: AuthControllerJwt;
  let localcontroller: AuthControllerLocal;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: AuthService, useFactory: mockAuthService }],
      controllers: [AuthController, AuthControllerLocal, AuthControllerJwt]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jwtcontroller = module.get<AuthControllerJwt>(AuthControllerJwt);
    localcontroller = module.get<AuthControllerLocal>(AuthControllerLocal);
    service = module.get<AuthService>(AuthService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('controller methods should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.login).toBeDefined();
    expect(jwtcontroller.login).toBeDefined();
    expect(jwtcontroller.refreshJwt).toBeDefined();
    expect(jwtcontroller.createUser).toBeDefined();
    expect(localcontroller.register).toBeDefined();
  });

  describe('login', () => {
    it('should login and return access and refresh tokens', async () => {
      //{ userId: '5ef417b79a506c20486ac100', username: 'awint' }
      const request: LoginUserDto = {
        username: 'my-username',
        password: 'password123'
      };

      const result = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWY0MTdiNzlhNTA2YzIwNDg2YWMxMDAiLCJ1c2VybmFtZSI6ImF3aW50IiwieC1oYXN1cmEtY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFwaSJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IjVlZjQxN2I3OWE1MDZjMjA0ODZhYzEwMCIsIngtaGFzdXJhLXJvbGUiOiJ1c2VyIn0sImlhdCI6MTU5MzExOTA0NSwiZXhwIjoxNTkzMTE5MDQ4fQ.58l05u5OkXrfn_hBcDhEDdhk9_IP5O_hPhUWcfAHL3Q',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWY0MTdiNzlhNTA2YzIwNDg2YWMxMDAiLCJ1c2VybmFtZSI6ImF3aW50IiwiaWF0IjoxNTkzMTE5MDQ1LCJleHAiOjE1OTU3MTEwNDV9.R1Japf1wQtXl7W_D4W0eIVdP29BkPGc7AvZW7WiBKgI',
        user: {
          id: '5ef417b79a506c20486ac100',
          username: 'my-username',
          roles: ['user', 'api'],
          role: 'user',
          name: 'John Smith',
          lastlogin: '2020-06-25T19:49:13.359Z'
        }
      };

      jest.spyOn(service, 'login').mockImplementation(async () => result);

      const tokens = await controller.login(request);
      expect(service.login).toHaveBeenCalled();
      expect(service.login).toBeCalledWith(request);
      expect(tokens).toBe(result);

      const jwttokens = await jwtcontroller.login(request);
      expect(service.login).toHaveBeenCalled();
      expect(service.login).toBeCalledWith(request);
      expect(jwttokens).toBe(result);
    });
  });

  describe('createUser', () => {
    it('creates a new users', async () => {
      const result = void jest.spyOn(service, 'createUser').mockImplementation(() => result);

      const request: CreateUserDto = {
        username: 'test-user',
        password: 'YSPcUGdxFg6W4##A',
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@email.com',
        roles: ['admin', 'user', 'hello']
      };

      const response = await jwtcontroller.createUser(request);
      expect(service.createUser).toHaveBeenCalled();
      expect(service.createUser).toBeCalledWith(request);
      expect(response).toBe(result);
    });
  });
});
