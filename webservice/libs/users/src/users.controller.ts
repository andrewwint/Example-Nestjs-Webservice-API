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
  Logger,
  Post,
  Body,
  ValidationPipe,
  Ip,
  Get,
  UseGuards,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createuser.dto';
import { ValidateUserDto } from './dto/validateuser.dto';
import { UserToken } from './interfaces/user-token.interface';
import { JwtAuthGuard } from '@truechoice/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@truechoice/auth/guards/roles.guard';
import { User } from './interfaces/users.interface';
import { UpdateUserDto } from './dto/updateuser.dto';

@ApiTags('User Manager (JWT Protected)')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('/new')
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<String> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/validate')
  async validateUser(@Body(ValidationPipe) validateUserDto: ValidateUserDto): Promise<UserToken> {
    return this.usersService.validateUser(validateUserDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Gets all users' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Gets one user by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
  async getUserById(@Param('id') _id: string): Promise<User> {
    return this.usersService.getUserById(_id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Updates user by user id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user']))
  async updateUserById(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') _id: string
  ): Promise<string> {
    return this.usersService.updateUserById(updateUserDto, _id);
  }

  @Put('/:id/password')
  @ApiOperation({ summary: 'Updates password by user id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user']))
  async updatePasswordById(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') _id: string
  ): Promise<string> {
    return this.usersService.updatePasswordById(updateUserDto, _id);
  }

  @Put('/:id/apikey')
  @ApiOperation({ summary: 'Generates and updates apikey by user id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'user']))
  async updateApiKeyById(@Param('id') _id: string): Promise<string> {
    return this.usersService.updateApiKeyById(_id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a single user by id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin']))
  async removeUserById(@Param('id') _id: string): Promise<any> {
    return this.usersService.removeUserById(_id);
  }
}
