/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Controller, Post, Get, Body, UseGuards, Param, Put, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ExampleDataDto } from './example-data.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AuthJwtExampleService } from './auth-jwt-example.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthControllerJwtExample {
  constructor(private readonly authJwtExampleService: AuthJwtExampleService) {}

  @Get('/jwt/example-request/:data')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user', 'content']))
  async exampleGetRequest(@Param() exampleDataDto: ExampleDataDto): Promise<Object> {
    return this.authJwtExampleService.exampleAllRequest(exampleDataDto);
  }

  @Post('/jwt/example-request')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user', 'content']))
  async examplePostRequest(@Body() exampleDataDto: ExampleDataDto): Promise<Object> {
    return this.authJwtExampleService.exampleAllRequest(exampleDataDto);
  }

  @Put('/jwt/example-request')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user', 'content']))
  async examplePutRequest(@Body() exampleDataDto: ExampleDataDto): Promise<Object> {
    return this.authJwtExampleService.exampleAllRequest(exampleDataDto);
  }

  @Patch('/jwt/example-request')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user', 'content']))
  async examplePatchRequest(@Body() exampleDataDto: ExampleDataDto): Promise<Object> {
    return this.authJwtExampleService.exampleAllRequest(exampleDataDto);
  }

  @Delete('/jwt/example-request')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user', 'content']))
  async exampleDeleteRequest(@Body() exampleDataDto: ExampleDataDto): Promise<Object> {
    return this.authJwtExampleService.exampleAllRequest(exampleDataDto);
  }
}
