/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Controller, Logger, Post, Body, Get, Param, Patch, Put, Delete } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDTO } from './dto/create-server.dto';
import { Server } from './server.interface';
import { UpdateServerDTO } from './dto/update-server.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AWS E2C Server Manager')
@Controller('server')
export class ServerController {
  private logger = new Logger('server');
  constructor(private readonly serverService: ServerService) {}

  @Get('/')
  getServers(): Promise<Server[]> {
    this.logger.log(`Accessing all servers`);
    return this.serverService.getServers();
  }

  @Get('/:stackname')
  getServersByStackName(@Param('stackname') stackname: string): Promise<Server[]> {
    this.logger.log(`Acessing all servers for stack ${stackname}`);
    return this.serverService.getServersByStackName(stackname.trim());
  }

  @Post('/new')
  setServer(@Body() createServerDTO: CreateServerDTO): Promise<Server> {
    this.logger.log(`Create a new server with "${JSON.stringify(createServerDTO)}"`);
    return this.serverService.setServer(createServerDTO);
  }

  @Post('/new/:stackname')
  setServersByStackName(@Param('stackname') stackname: string): Promise<Server[]> {
    this.logger.log(`Create stack for ${stackname}`);
    return this.serverService.setServersByStackName(stackname.trim());
  }

  @Get('/shortname/:shortname')
  getServerByShortName(@Param('shortname') shortname: string): Promise<Server> {
    this.logger.log(`Find server details by shortname: "${shortname}"`);
    return this.serverService.getServerByShortName(shortname.trim());
  }

  @Get('/instance/:instance_id')
  getServerByInstanceId(@Param('instance_id') instance_id: string): Promise<Server> {
    this.logger.log(`Find server details by instance_id: "${instance_id}"`);
    return this.serverService.getServerByInstanceId(instance_id.trim());
  }

  @Get('/servertype/:servertype')
  getServersByType(@Param('servertype') servertype: string): Promise<Server[]> {
    this.logger.log(`Find server details by servertype: "${servertype}"`);
    return this.serverService.getServersByType(servertype.trim());
  }

  @Patch('/instance/:shortname')
  updateServerByShortName(
    @Param('shortname') shortname: string,
    @Body() updateServerDTO: UpdateServerDTO
  ): Promise<Server> {
    this.logger.log(`Updating server "${shortname}" with ${JSON.stringify(updateServerDTO)}`);
    return this.serverService.updateServerByShortName(shortname.trim(), updateServerDTO);
  }

  @Patch('/instance/:id')
  updateServerById(
    @Param('id') id: string,
    @Body() updateServerDTO: UpdateServerDTO
  ): Promise<Server> {
    this.logger.log(`Updating server "${id}" with ${JSON.stringify(updateServerDTO)}`);
    return this.serverService.updateServerById(id.trim(), updateServerDTO);
  }

  @Delete('/instance/:shortname')
  deleteServerByShortName(@Param('shortname') shortname: string): Promise<Server> {
    this.logger.log(`Deleting server "${shortname}" `);
    return this.serverService.deleteServerByShortName(shortname.trim());
  }

  @Delete('/stack/:stackname')
  deleteServerByStackName(@Param('stackname') stackname: string): Promise<String> {
    this.logger.log(`Deleting stack: "${stackname}" `);
    return this.serverService.deleteServerByStackName(stackname.trim());
  }

  /**
   * @param  {String} instance_id
   * @param  {String} environment
   * @param  {String} nodesize
   * @returns Promise
   */
  @Get('/install/:instance_id/:environment/:nodesize/:version/:region')
  installApplicationByInstanceId(
    @Param('instance_id') instance_id: String,
    @Param('environment') environment: String,
    @Param('nodesize') nodesize: String,
    @Param('version') version: String,
    @Param('region') region: String
  ): Promise<String> {
    this.logger.log(`Installing "${environment}" for instance "${instance_id}" `);
    return this.serverService.installApplicationByInstanceId(
      instance_id.trim(),
      environment.trim(),
      nodesize.trim(),
      version.trim(),
      region.trim()
    );
  }

  @Get('/install/:stackname/:nodesize')
  installApplicationByStackName(
    @Param('stackname') stackname: String,
    @Param('nodesize') nodesize: String
  ): Promise<String> {
    this.logger.log(`Installing applications to stack "${stackname}" `);
    return this.serverService.installApplicationByStackName(stackname.trim(), nodesize.trim());
  }
}
