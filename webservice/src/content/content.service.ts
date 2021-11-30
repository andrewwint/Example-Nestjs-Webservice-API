/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './interfaces/content.interface';
import { CreateContentDTO } from './dto/create-content.dto';
import { UpdateContentDTO } from './dto/update-content.dto';
import { ContentHistory } from './interfaces/content-history.interface';
import { ObjectId } from 'bson';
import { XmlwriterService } from '../xmlwriter/xmlwriter.service';
//import { CreateContentStoreDTO } from './dto/create-content-store.dto';
//import { ContentStore } from './interfaces/content-store.interface';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
    @InjectModel('ContentHistory')
    private readonly contentHistoryModel: Model<ContentHistory>
  ) {}

  public mytest(): string {
    return;
  }

  async getAll(): Promise<Content[]> {
    return await this.contentModel.find().exec();
  }

  async getContentById(id: String): Promise<Content> {
    const content = await this.contentModel.findById(id);
    return this.transfromOutputContent(content);
  }

  async getXMLContentById(id: String): Promise<String> {
    const writexml = new XmlwriterService();
    writexml.setContent(await this.getContentById(id));
    return writexml.getXML();
  }

  async getContentByName(appname: string): Promise<Content> {
    const content = await this.contentModel.findOne({ gameName: appname }).exec();
    return this.transfromOutputContent(content);
  }

  async createContent(createContentDto: CreateContentDTO): Promise<Content> {
    const content = await new this.contentModel(createContentDto).save();
    return this.transfromOutputContent(content);
  }

  async updateContent(id: string, updateContentDto: UpdateContentDTO): Promise<Content> {
    //Log here
    updateContentDto.modifieddate = Date.now();
    updateContentDto.history = await this.createContentHistory(id, updateContentDto);
    const content = await this.contentModel.findOneAndUpdate({ _id: id }, updateContentDto, { new: true });
    return this.transfromOutputContent(content);
  }

  removeContent(): String {
    return 'removeContent';
  }

 
  private async createContentHistory(id: string, updateContentDelta: Object): Promise<[object]> {
    let current: CreateContentDTO = await this.contentModel.findById(id, '-_id').lean();
    let contentdelta: CreateContentDTO = {};
    for (const key of Object.keys(updateContentDelta)) {
      //TODO# Refactor using higher order function
      // https://codesandbox.io/s/upbeat-torvalds-eos73
      contentdelta[key] = current[key];
      contentdelta.content_id = new ObjectId(id);
      contentdelta.version_history = current.__v;
    }
    const history = await new this.contentHistoryModel({
      ...contentdelta
    }).save();
    current.history.push(new ObjectId(history._id));
    return current.history;
  }
}
