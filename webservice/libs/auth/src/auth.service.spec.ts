import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@truechoice/users';

const mockUserService = () => ({
  createUser: jest.fn(),
  getUsers: jest.fn(),
  getUserbyUserObj: jest.fn(),
  updateUserbyUserObj: jest.fn(),
  deleteUserbyUserObj: jest.fn()
});

describe('AuthService', () => {
  let service: AuthService;
  let user: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useFactory: mockUserService }]
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.login).toBeDefined();
    expect(service.refreshJwt).toBeDefined();
    expect(service.createUser).toBeDefined();
  });
});
