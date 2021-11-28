import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as _ from 'lodash';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(90000);
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

  it('/status/path (POST) 200', async () => {
    return request(app.getHttpServer())
      .post('/status/path')
      .set('Accept', 'application/json')
      .send( {path: '/'})
      .expect(({ body }) => {
        expect(_.isObject(body)).toBeTruthy();
      })
      .expect(201);
  });
});
