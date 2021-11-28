import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentStore } from '../../interfaces/content-store.interface';
import { CreateContentStoreDTO } from '../../dto/create-content-store.dto';

@Injectable()
export class ContentStoreRepository {
  private readonly logger = new Logger(ContentStoreRepository.name);
  constructor(
    @InjectModel('ContentStore')
    private readonly contentStoreModel: Model<ContentStore>
  ) {}

  async create(createContentStoreDto: CreateContentStoreDTO): Promise<ContentStore> {
    this.logger.log(`Storing content for ${createContentStoreDto.gameName}`);
    const createConent = new this.contentStoreModel(createContentStoreDto);
    return createConent.save();
  }

  getContentStores() {}

  findByGameName(gameName: string) {}

  update() {}

  deleteByGameName(gameName: string) {}
}
