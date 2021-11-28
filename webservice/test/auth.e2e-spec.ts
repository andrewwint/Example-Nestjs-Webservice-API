import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from '@truechoice/users/dto/createuser.dto';
import { JwtToken } from '@truechoice/auth/interfaces/jwt-token.interace';
import { TestDatabaseModule } from './helpers/mongo-testing.module';

const accessToken = process.env.JWT_E2ETEST_ACCESS;
const userAdmin: CreateUserDto = {
  username: 'e2euser_auth',
  password: process.env.JWT_E2ETEST_USERPWD,
  first_name: 'e2e_auth_first_name',
  last_name: 'e2e_auth_last_name',
  email: 'e2e-user-auth@mail.com',
  roles: ['user', 'admin', 'server']
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: JwtToken;

  beforeAll(async () => {
    jest.setTimeout(1000);
  });

  afterAll(async (done) => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    await app.close();
    done();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(MongooseModule)
      .useValue(TestDatabaseModule)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/registration (POST) 201', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userAdmin)
      .expect(201)
      .expect('Content-Length', '36');
  });

  it('/auth/registration (POST) 409', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(userAdmin)
      .expect(409);
  });

  it('/auth/login (POST) 201', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: userAdmin.username, password: userAdmin.password })
      .expect(201)
      .expect(({ body }) => {
        expect.assertions(4);
        expect(body.refreshToken).toBeDefined();
        expect(body.accessToken).toBeDefined();
        expect(body.user['username']).toEqual(userAdmin.username);
        expect(body.user['roles']).toEqual(userAdmin.roles);
        jwtToken = body;
      });
  });

  it('/auth/refresh (POST) 401', async () => {
    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('/auth/refresh (POST) 201', async () => {
    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${jwtToken.refreshToken}`)
      .expect(201)
      .expect(({ body }) => {
        expect.assertions(4);
        expect(body.refreshToken).toBeDefined();
        expect(body.accessToken).toBeDefined();
        expect(body.user['username']).toEqual(userAdmin.username);
        expect(body.user['roles']).toEqual(userAdmin.roles);
      });
  });

  it('/users/:id (DELETE) 200 user', async () => {
    return await request(app.getHttpServer())
      .delete(`/users/${jwtToken.user['id']}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
