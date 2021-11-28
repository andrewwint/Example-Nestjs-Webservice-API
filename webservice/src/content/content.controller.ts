/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UsePipes,
  Param,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDTO } from './dto/create-content.dto';
import { Content } from './interfaces/content.interface';
import { ContentCreatePipe } from './pipes/content-create.pipe';
import { UpdateContentDTO } from './dto/update-content.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Content Manager (Deprecated)')
@Controller('content')
export class ContentController {
  constructor(private readonly ContentService: ContentService) {}

  public mytest(): string {
    return this.ContentService.mytest();
  }

  @Get('/')
  getAll(): Promise<Content[]> {
    return this.ContentService.getAll();
  }

  @Get('/:id')
  getContentById(@Param('id') id: string): Promise<Content> {
    return this.ContentService.getContentById(id);
  }

  @Get('/xml/:id')
  getXMLContentById(@Param('id') id: String): Promise<String> {
    return this.ContentService.getXMLContentById(id);
  }

  @Get('/app/:appname')
  getContentByName(@Param('appname') appname: string): Promise<Content> {
    return this.ContentService.getContentByName(appname);
  }

  @Post('/new')
  @UsePipes(new ContentCreatePipe())
  createContent(@Body() createContent: CreateContentDTO): Promise<Content> {
    return this.ContentService.createContent(createContent);
  }

  @Patch('/:id')
  @UsePipes(new ContentCreatePipe())
  updateContent(
    @Param('id') id: string,
    @Body() updateContent: UpdateContentDTO,
  ): Promise<Content> {
    return this.ContentService.updateContent(id, updateContent);
  }
}
