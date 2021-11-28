import { Test, TestingModule } from '@nestjs/testing';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentStore } from '../../interfaces/content-store.interface';
import { ContentStoreRepository } from './content-store.repository';

describe('ContentStoreRepository', () => {
  let service: ContentStoreRepository;
  let contentStoreModel: Model<ContentStore>;

  beforeEach(async () => {
    service = new ContentStoreRepository(contentStoreModel);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.getContentStores).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.findByGameName).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.deleteByGameName).toBeDefined();
  });
});
