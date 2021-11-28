import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as _ from 'lodash';
import { CreateInstanceDTO } from '@truechoice/stacks/dto/create-instance.dto';
import { UpdateInstanceDTO } from '@truechoice/stacks/dto/update-instance.dto';

let _id = '';
const setId = (id: string) => {
  return (_id = id);
};

const instance: CreateInstanceDTO = {
  shortname: 'e2e-test-shortname',
  stackname: 'e2e-test-stack',
  alias_shortname: 'e2e-test-shortname-alt'
};

const updated: UpdateInstanceDTO = {
  shortname: 'e2e-test-shortname-update',
  stackname: 'e2e-test-stack',
  alias_shortname: 'e2e-test-shortname-alt-update'
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    jest.setTimeout(9000);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/stacks (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/stacks')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(_.isArray(body)).toBeTruthy();
      })
      .expect(200);
  });

  it('/stacks/:stackname (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/stacks/dev-us-east-1-default')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(_.isArray(body)).toBeTruthy();
        expect(body[0].stackname).toStrictEqual('dev-us-east-1-default');
      })
      .expect(200);
  });

  it('/stacks/new/:stackname (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/stacks/new/staging-us-east-2-solstice')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(_.isArray(body)).toBeTruthy();
        expect(body[0].stackname).toStrictEqual('staging-us-east-2-solstice');
      })
      .expect(200);
  });

  it('/stacks/instance (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/stacks/instance')
      .set('Accept', 'application/json')
      .send(instance)
      .expect(({ body }) => {
        setId(body._id);
        expect(body.stackname).toEqual(instance.stackname);
        expect(body.shortname).toStrictEqual(instance.shortname);
        expect(body.stackname).toStrictEqual(instance.stackname);
      })
      .expect(201);
  });

  it('/stacks/instance/:id (PUT)', async () => {
    return await request(app.getHttpServer())
      .put(`/stacks/instance/${_id}`)
      .set('Accept', 'application/json')
      .send(updated)
      .expect(({ body }) => {
        expect(body.stackname).toEqual(updated.stackname);
        expect(body.shortname).toStrictEqual(updated.shortname);
        expect(body.stackname).toStrictEqual(updated.stackname);
      })
      .expect(200);
  });

  it('/stacks/instances/:stackname (DELETE)', async () => {
    return await request(app.getHttpServer())
      .delete(`/stacks/instances/${instance.stackname}`)
      .set('Accept', 'application/json')
      .expect(`Removed 1 instances with stackName ${instance.stackname}`)
      .expect(200);
  });
});
