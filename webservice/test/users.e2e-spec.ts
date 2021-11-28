import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from '@truechoice/users/dto/createuser.dto';
import * as _ from 'lodash';
import { User } from '@truechoice/users/interfaces/users.interface';
import { UpdateUserDto } from '@truechoice/users/dto/updateuser.dto';

const accessToken = process.env.JWT_E2ETEST_ACCESS;

const userAdmin: CreateUserDto = {
  username: 'e2euser_admin',
  password: process.env.JWT_E2ETEST_USERPWD,
  first_name: 'e2e_first_name',
  last_name: 'e2e_last_name',
  email: 'e2e-user@mail.com',
  roles: ['user', 'admin', 'server']
};

const userRegular: CreateUserDto = {
  username: 'e2euser_regular',
  password: process.env.JWT_E2ETEST_USERPWD,
  first_name: 'e2euser_regular_first_name',
  last_name: 'e2euser_regular_last_name',
  email: 'e2euser_regular@mail.com',
  roles: ['user']
};

const userUpdate: UpdateUserDto = {
  password: process.env.JWT_E2ETEST_USERPWD,
  first_name: 'e2euser_regular_first_name_new',
  last_name: 'e2euser_regular_last_name',
  email: 'e2euser_regular@mail.com',
  roles: ['user', 'api']
};

let user: User;
let admin: User;
let authUser: User;

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(100000);
  });

  afterAll(async (done) => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    await app.close();
    done();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Create Users (e2e)', () => {
    it('/users/new (POST) 201', async () => {
      return await request(app.getHttpServer())
        .post('/users/new')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userAdmin)
        .expect(201)
        .expect('Content-Length', '36');
    });

    it('/users/new (POST) 409', async () => {
      return await request(app.getHttpServer())
        .post('/users/new')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userAdmin)
        .expect(409);
    });

    it('/users/new (POST) 201', async () => {
      return await request(app.getHttpServer())
        .post('/users/new')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userRegular)
        .expect(201)
        .expect('Content-Length', '36');
    });
  });

  describe('Get Users (e2e)', () => {
    it('/users (GET) 200', async () => {
      return await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response) => {
          expect.assertions(10);
          user = _.find(response.body, { username: userRegular.username });
          admin = _.find(response.body, { username: userAdmin.username });
          expect(user.username).toEqual(userRegular.username);
          expect(user.first_name).toEqual(userRegular.first_name);
          expect(user.last_name).toEqual(userRegular.last_name);
          expect(user.roles).toEqual(userRegular.roles);
          expect(user.password).toBeUndefined();
          expect(admin.username).toEqual(userAdmin.username);
          expect(admin.first_name).toEqual(userAdmin.first_name);
          expect(admin.last_name).toEqual(userAdmin.last_name);
          expect(admin.roles).toEqual(userAdmin.roles);
          expect(admin.password).toBeUndefined();
        });
    });
  });

  describe('Update User (e2e)', () => {
    it('/users/:id (GET) 200 admin', async () => {
      return await request(app.getHttpServer())
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userUpdate)
        .expect(200)
        .expect({});
    });
  });

  describe('Delete Users (e2e)', () => {
    it('/users/:id (DELETE) 200 user', async () => {
      return await request(app.getHttpServer())
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('/users/:id (DELETE) 200 user', async () => {
      return await request(app.getHttpServer())
        .delete(`/users/${admin._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });
  });
});
