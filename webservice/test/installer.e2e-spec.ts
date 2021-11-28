import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

const accessToken = process.env.JWT_E2ETEST_ACCESS;

describe('InstallerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(90000);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async (done) => {
    await app.close();
    done();
  });

  it('/installer/:instance_id/:environment/:nodesize/:version/:region (GET) 400', async () => {
    return request(app.getHttpServer())
      .get('/installer/i-12345/production/medium/0.4.20/us-east-1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400)
      .expect(({ body }) => {
        expect(body).toEqual({
          message: 'Could not find server i-12345',
          statusCode: 400
        });
      });
  });

  it('/installer/:instance_id/:environment/:nodesize/:version/:region (GET) 200', async () => {
    const devTestServer = 'i-0722f3cc03638d57e';
    const environment = 'development';
    const nodesize = 'medium';
    const version = '4.0.57';
    const region = 'us-east-1';
    return request(app.getHttpServer())
      .get(`/installer/${devTestServer}/${environment}/${nodesize}/${version}/${region}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(({ text }) => {
        expect(text).toContain("{\"statusCode\":400,\"message\":\"Could not find server i-0722f3cc03638d57e\"}");
      })
      .expect(400);
  });
});
