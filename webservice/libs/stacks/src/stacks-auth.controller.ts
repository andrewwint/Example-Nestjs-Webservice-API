/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Controller, Logger, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Instance } from './interfaces/instance.interface';
import { StacksService } from './stacks.service';
import { UpdateInstanceDTO } from './dto/update-instance.dto';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { JwtAuthGuard } from '@truechoice/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@truechoice/auth/guards/roles.guard';

@ApiTags('Stack Manager (JWT Protected)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
@Controller('auth/stacks')
export class StacksAuthController {
  private logger = new Logger(StacksAuthController.name);
  constructor(private readonly stacksService: StacksService) {}

  @Post('/instance')
  @ApiOperation({
    summary: 'Creates an instance (for e2e testing)'
  })
  async createInstance(@Body() createInstanceDTO: CreateInstanceDTO): Promise<Instance> {
    return this.stacksService.createInstance(createInstanceDTO);
  }

  @Delete('/instances/:stackname')
  @ApiOperation({ summary: "Removes instances by it's stackname" })
  async deleteInstanceByStackName(@Param('stackname') stackname: string): Promise<string> {
    this.logger.log(`Deleting stack: "${stackname}" `);
    return this.stacksService.deleteInstanceByStackName(stackname.trim());
  }

  @Get('/:stackname')
  async getInstancesByStackName(@Param('stackname') stackname: string): Promise<Instance[]> {
    this.logger.log(`Acessing all servers for stack ${stackname}`);
    return this.stacksService.getInstancesByStackName(stackname.trim());
  }

  @Get('/')
  async getStacks(): Promise<Instance[]> {
    this.logger.log(`Accessing all servers`);
    return this.stacksService.getStacks();
  }

  @Get('/new/:stackname')
  @ApiOperation({
    summary: 'Discover and describe a solsitice stack then stores instances'
  })
  async setInstancesByStackName(@Param('stackname') stackname: string): Promise<Instance[]> {
    this.logger.log(`Discovering and setting instance(s) for stack ${stackname}`);
    return this.stacksService.setInstancesByStackName(stackname.trim());
  }

  @Put('/instance/:id')
  @ApiOperation({
    summary: 'Updates server record by id'
  })
  async updateInstanceById(
    @Param('id') id: string,
    @Body() updateInstanceDTO: UpdateInstanceDTO
  ): Promise<Instance> {
    this.logger.log(`Updating server "${id}" with ${JSON.stringify(updateInstanceDTO)}`);
    return this.stacksService.updateInstanceById(id.trim(), updateInstanceDTO);
  }
}
