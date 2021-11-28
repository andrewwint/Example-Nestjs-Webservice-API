import { Module } from '@nestjs/common';
import { ContentStoreController } from './content-store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentStoreSchema } from './schemas/content-store.schema';
import { ContentStoreService } from './content-store.service';
import { ContentStoreRepository } from './repositories/content-store/content-store.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ContentStore', schema: ContentStoreSchema },
    ]),
  ],
  providers: [ContentStoreService, ContentStoreRepository],
  controllers: [ContentStoreController],
  exports: [ContentStoreService],
})
export class ContentStoreModule {}
