/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { REQUEST } from '@nestjs/core';
import { Injectable, Logger, HttpException, HttpStatus, Inject, Optional } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { UsersService } from '@truechoice/users';
import { LoginUserDto } from './dto/loginuser.dto';
import { UserToken } from '@truechoice/users/interfaces/user-token.interface';
import { JwtToken } from './interfaces/jwt-token.interace';
import { ExampleDataDto } from './examples/example-data.dto';
import { CreateUserDto } from '@truechoice/users/dto/createuser.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    @Optional() @Inject(REQUEST) private readonly request: Request
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<String> {
    return await this.usersService.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<Object> {
    const user: UserToken = await this.usersService.validateUser(loginUserDto);
    if (user) {
      this.logger.log(`Authenticated user ${loginUserDto.username}`);
      return this.getJwtToken(user);
    } else {
      this.logger.log(`Failed authentication for user ${loginUserDto.username}`);
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }
  }

  async refreshJwt(request: Request): Promise<object> {
    const requestUser: any = request.user;
    const user: UserToken = await this.usersService.refreshUser(requestUser.userId);

    if (user) {
      this.logger.log(`Refresing JWT Tokens for user ${requestUser.username}`);
      return this.getJwtToken(user);
    } else {
      this.logger.log(`User not found ${requestUser.username}`);
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }
  }

  private getJwtToken(user: UserToken): JwtToken {
    return {
      accessToken: this.getNewAccessToken(user),
      refreshToken: this.getNewRefreshToken(user),
      user: user
    };
  }

  private getNewAccessToken(user: UserToken): string {
    const payload: Object = {
      sub: user.id,
      username: user.username,
      name: user.name,
      roles: [...user.roles]
    };
    const token: string = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
    });
    if (token) {
      this.logger.log(
        `Generated access token for ${user.username} expires in ${process.env.JWT_ACCESS_TOKEN_EXPIRES_IN}`
      );
    }
    return token;
  }

  private getNewRefreshToken(user: UserToken): string {
    const payload: Object = {
      sub: user.id,
      username: user.username
    };
    const token: string = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    });
    if (token) {
      this.logger.log(
        `Generated refresh token for ${user.username} expires in ${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}`
      );
    }
    return token;
  }

  async exampleAllRequest(exampleDataDto: ExampleDataDto | string): Promise<Object> {
    return this.exampleResponce(exampleDataDto);
  }

  private exampleResponce(data: string | object): Object {
    return {
      message: 'Access granted',
      request: data,
      user: this.request.user,
      header: this.request.headers
    };
  }
}
