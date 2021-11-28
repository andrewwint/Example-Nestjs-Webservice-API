/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/users.interface';
import { CreateUserDto } from '../dto/createuser.dto';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    try {
      await new this.userModel(createUserDto).save();
      this.logger.log(`Created user account for ${createUserDto.username}`);
    } catch (error) {
      if (error.code === 11000) {
        this.logger.log(`Username '${createUserDto.username}' already exists`);
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findOneSafe(query: object): Promise<User> {
    return this.userModel.findOne(query).select('-password -salt -apikey ');
  }

  async find(): Promise<User[]> {
    return this.userModel.find({}).select('-password -salt -apikey ');
  }

  async findOneAndDelete(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete({ _id: id });
  }

  async findOneAndUpdate(query: object = {}, update: object = {}): Promise<User> {
    return this.userModel.findOneAndUpdate(query, update, {
      new: true
    });
  }
}
