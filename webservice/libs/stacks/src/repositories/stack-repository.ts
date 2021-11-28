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
import { Instance } from '../interfaces/instance.interface';
import { CreateInstanceDTO } from '../dto/create-instance.dto';

@Injectable()
export class StackRepository {
  private readonly logger = new Logger(StackRepository.name);
  constructor(
    @InjectModel('Instance')
    private readonly instanceModel: Model<Instance>
  ) {}

  async createInstance(createInstanceDTO: CreateInstanceDTO): Promise<Instance | undefined> {
    try {
      this.logger.log(`Creating instance ${createInstanceDTO.shortname}`);
      return await new this.instanceModel(createInstanceDTO).save();
    } catch (error) {
      if (error.code === 11000) {
        this.logger.log(`Instance '${createInstanceDTO.shortname}' already exists`);
        throw new ConflictException('Instance already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteMany(query: object = {}): Promise<number> {
    return (await this.instanceModel.deleteMany(query)).deletedCount;
  }

  async find(query: object = {}): Promise<Instance[]> {
    return this.instanceModel.find(query);
  }

  async findOne(query: object = {}): Promise<Instance> {
    return this.instanceModel.findOne(query).exec();
  }

  async findOneAndUpdate(query: object = {}, update: object = {}): Promise<Instance> {
    return this.instanceModel.findOneAndUpdate(query, update, {
      new: true
    });
  }
}
