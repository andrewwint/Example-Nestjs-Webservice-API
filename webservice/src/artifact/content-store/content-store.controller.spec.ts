import { Test, TestingModule } from '@nestjs/testing';
import { ContentStoreController } from './content-store.controller';
import { ContentStoreService } from './content-store.service';
import { CreateContentStoreDTO } from './dto/create-content-store.dto';

const mockContentStoreService = () => ({
  createContentStore: jest.fn(),
  findContentStoreByGameName: jest.fn()
});

describe('ContentStore Controller', () => {
  let controller: ContentStoreController;
  let service: ContentStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentStoreService, { provide: ContentStoreService, useFactory: mockContentStoreService }],
      controllers: [ContentStoreController]
    }).compile();

    controller = module.get<ContentStoreController>(ContentStoreController);
    service = module.get<ContentStoreService>(ContentStoreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.createContentStore).toBeDefined();
  });

  describe('createContentStore', () => {
    it('should save a new content item form xml', async () => {
      const request: CreateContentStoreDTO = {
        gameName: 'prototype',
        rootagfolder: 'truechoice/app/clients/prototype/',
        version: '4.2.33'
      };

      await controller.createContentStore(request);
      expect(service.createContentStore).toBeCalled();
      expect(service.createContentStore).toBeCalledWith(request);
    });
  });

  describe('findContentStoreByGameName', () => {
    it('should find a content store record', async () => {
      jest.spyOn(service, 'findContentStoreByGameName').mockImplementation();
      const content = await controller.findContentStoreByGameName('prototype');
      expect(service.findContentStoreByGameName).toBeCalled();
      expect(service.findContentStoreByGameName).toBeCalledWith('prototype');
    });
  });
});
