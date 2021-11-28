import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentStore } from './interfaces/content-store.interface';
import { CreateContentStoreDTO } from './dto/create-content-store.dto';
import { ContentStoreRepository } from './repositories/content-store/content-store.repository';

@Injectable()
export class ContentStoreService {
  private readonly logger = new Logger(ContentStoreService.name);
  public rootTagFolder: String;
  public version: String;
  public baseAttributes: [];

  constructor(private readonly contentStoreRepository: ContentStoreRepository) {}

  async createContentStore(createContentStoreDto: CreateContentStoreDTO): Promise<ContentStore> {
    return await this.contentStoreRepository.create(createContentStoreDto);
  }

  async findContentStoreByGameName(gameName: String): Promise<String> {
    return 'Content';
  }

  async createOrUpdate(gameName: String, xmlDocument: String): Promise<String> {
    //find by gameName
    //update by gameName
    //track history
    //create new
    return '';
  }
}
