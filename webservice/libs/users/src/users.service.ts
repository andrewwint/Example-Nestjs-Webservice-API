/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v1 as uuid } from 'uuid';
import { UserRepository } from './repositories/user-repository';
import { CreateUserDto } from './dto/createuser.dto';
import { ValidateUserDto } from './dto/validateuser.dto';
import { User } from './interfaces/users.interface';
import { UserToken } from './interfaces/user-token.interface';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UsersService {
  public apikey: string = '';
  public password: string = '';
  public validUser: boolean = false;

  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<String> {
    this.apikey = uuid();
    createUserDto.salt = await bcrypt.genSalt();
    createUserDto.password = await this.hash(createUserDto.password, createUserDto.salt);
    createUserDto.apikey = await this.hash(this.apikey, createUserDto.salt);
    await this.userRepository.createUser(createUserDto);
    return this.apikey;
  }

  async getUserById(_id: string): Promise<User> {
    return await this.userRepository.findOneSafe({ _id });
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  private getUserToken(user: User): UserToken {
    const token = {
      id: user._id,
      username: user.username,
      roles: user.roles,
      role: 'user',
      name: `${user.first_name} ${user.last_name}`,
      lastlogin: user.modifieddate
    };
    return token;
  }

  async hash(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async removeUserById(_id: string): Promise<any> {
    return this.userRepository.findOneAndDelete(_id);
  }

  async updateUserById(updateUserDto: UpdateUserDto, _id: string): Promise<string | null> {
    if (await this.userRepository.findOneAndUpdate({ _id: _id }, updateUserDto)) {
      return 'User Succesfully Updated';
    }
    return null;
  }

  async updatePasswordById(updateUserDto: UpdateUserDto, _id: string): Promise<string | null> {
    const user: User = await this.userRepository.findOne({ _id });
    if (user) {
      this.password = await this.hash(updateUserDto.password, user.salt);
      if (await this.userRepository.findOneAndUpdate({ _id: _id }, { password: this.password })) {
        return 'Successfully updated password';
      }
      return null;
    }
  }

  async updateApiKeyById(_id: string): Promise<string | null> {
    const user: User = await this.userRepository.findOne({ _id });
    this.apikey = uuid();
    const hashedApikey = await this.hash(this.apikey, user.salt);
    if (await this.userRepository.findOneAndUpdate({ _id: _id }, { apikey: hashedApikey })) {
      return this.apikey;
    }
    return null;
  }

  async refreshUser(_id: string): Promise<UserToken | null> {
    const user = await this.userRepository.findOne({ _id: _id });
    if (user) {
      return this.getUserToken(user);
    }
    return null;
  }

  async validateHashedPasswordOrApiKey(
    validateUserDto: ValidateUserDto,
    user: User
  ): Promise<boolean> {
    const { password, apikey } = validateUserDto;
    if (apikey) {
      return await this.validateHash(apikey, user.apikey, user.salt);
    } else {
      return await this.validateHash(password, user.password, user.salt);
    }
  }

  private async validateHash(
    plainText: string,
    hashString: string,
    salt: string
  ): Promise<boolean> {
    const hash = await this.hash(plainText, salt);
    return hash === hashString;
  }

  async validateUser(validateUserDto: ValidateUserDto): Promise<UserToken | null> {
    const { username } = validateUserDto;
    const user: User = await this.userRepository.findOne({ username: username });
    this.validUser = await this.validateHashedPasswordOrApiKey(validateUserDto, user);
    if (user && this.validUser === true) {
      await this.userRepository.findOneAndUpdate({ _id: user.id }, { modifieddate: Date.now() });
      return this.getUserToken(user);
    }
    return null;
  }
}
