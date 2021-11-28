import { Controller, Post, Body, Logger, Get, Param } from '@nestjs/common';
import { CreateContentStoreDTO } from './dto/create-content-store.dto';
import { ContentStore } from './interfaces/content-store.interface';
import { ContentStoreService } from './content-store.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Content Store/Manager')
@Controller('content-store')
export class ContentStoreController {
  private readonly logger = new Logger(ContentStoreController.name);
  constructor(private readonly contentStoreService: ContentStoreService) {}

  @Post('/new/store')
  async createContentStore(@Body() createContentStoreDto: CreateContentStoreDTO): Promise<ContentStore> {
    this.logger.log(`Storing contont for ${createContentStoreDto.gameName}`);
    return this.contentStoreService.createContentStore(createContentStoreDto);
  }

  @Get('/:gamename')
  async findContentStoreByGameName(@Param('gamename') gamename: String): Promise<String> {
    return this.contentStoreService.findContentStoreByGameName(gamename.trim());
  }
}
