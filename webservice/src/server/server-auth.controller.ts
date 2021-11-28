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
  UseGuards,
  Logger,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Put,
  Delete
} from '@nestjs/common';
import { ServerService } from './server.service';
import { Server } from './server.interface';
import { JwtAuthGuard } from '@truechoice/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@truechoice/auth/guards/roles.guard';
import { UpdateServerDTO } from './dto/update-server.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Stack Manager using Auth and ACL')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
@Controller('auth/servers')
export class ServerAuthController {
  private logger = new Logger('server');
  constructor(private readonly serverService: ServerService) {}

  @Delete('/stack/:stackname')
  @ApiOperation({ summary: "Removes servers by it's stackname" })
  deleteServerByStackName(@Param('stackname') stackname: string): Promise<String> {
    this.logger.log(`Deleting stack: "${stackname}" `);
    return this.serverService.deleteServerByStackName(stackname.trim());
  }

  @Get('/')
  @ApiOperation({ summary: 'Gets all servers' })
  getServers(): Promise<Server[]> {
    this.logger.log(`Accessing all servers`);
    return this.serverService.getServers();
  }
  @Get('/shortname/:shortname')
  @ApiOperation({
    summary: 'Finds a server by `shortname` or `alias`'
  })
  getServerByShortName(@Param('shortname') shortname: string): Promise<Server> {
    this.logger.log(`Find server details by shortname: "${shortname}"`);
    return this.serverService.getServerByShortName(shortname.trim());
  }

  @Get('/:stackname')
  @ApiOperation({ summary: 'Finds servers by stack name' })
  getServersByStackName(@Param('stackname') stackname: string): Promise<Server[]> {
    this.logger.log(`Acessing all servers for stack ${stackname}`);
    return this.serverService.getServersByStackName(stackname.trim());
  }

  /**
   * @param  {String} instance_id
   * @param  {String} environment
   * @param  {String} nodesize
   * @returns Promise
   */
  @Get('/install/:instance_id/:environment/:nodesize/:version/:region')
  @ApiOperation({ summary: 'Install the backend onto a target server ' })
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

  @Get('/new/:stackname')
  @ApiOperation({
    summary: 'Uses AWS SDK to discover, describe, and store server terraformed by solstice'
  })
  setServersByStackName(@Param('stackname') stackname: string): Promise<Server[]> {
    this.logger.log(`Create stack for ${stackname}`);
    return this.serverService.setServersByStackName(stackname.trim());
  }

  @Put('/instance/:id')
  @ApiOperation({
    summary: 'Updates server record by id'
  })
  updateServerById(
    @Param('id') id: string,
    @Body() updateServerDTO: UpdateServerDTO
  ): Promise<Server> {
    this.logger.log(`Updating server "${id}" with ${JSON.stringify(updateServerDTO)}`);
    return this.serverService.updateServerById(id.trim(), updateServerDTO);
  }
}
