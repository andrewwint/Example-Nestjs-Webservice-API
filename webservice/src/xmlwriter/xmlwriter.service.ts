/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { Injectable } from '@nestjs/common';
import { Xmlelements } from './xmlelements';
import { Content } from '../content/interfaces/content.interface';
import { ContentModule } from 'src/content/content.module';

@Injectable()
export class XmlwriterService extends Xmlelements {
  protected gameName: String;
  protected gameObject: String;
  protected attributes: [Object];
  protected stageData: Object;
  protected systemResource: Object;
  protected content: Content;

  CONTROLS = [
    'welcome',
    'levels',
    'prestage2',
    'attributes',
    'tradeoffs',
    'output',
  ]; //Refactor to make dynamic from the protal frontend

  constructor() {
    super();
  }

  setContent(content: Content): Content {
    this.content = content;
    this.setUp();
    return;
  }

  getXML(): string {
    let root = this.getClientGameParent();
    this.getAttributes(root, this.attributes);
    //TODO: this.getRestrictedPairs(root, this.restrictedSet)
    this.getSubgame(root, this.attributes);
    this.getMainResource(root, this.systemResource);
    this.getControls(root, this.CONTROLS);
    this.getSystemResource(root, this.systemResource);
    this.getStageResources(root, this.stageData);
    this.getUrlResource(root);
    this.getNaming(root, this.gameObject);
    this.getProfileKey(root); //Get all profile keys maybe from JSON Gateway
    return root.doc().end({ pretty: true });
  }

  private setUp() {
    this.gameName = this.content.gameName.trim();
    this.gameObject = this.content.gameObject.trim();
    this.attributes = this.content.attributes;
    this.stageData = this.content.stageData;
    this.systemResource = this.content.systemResource;
    this.setGameName(this.gameName);
  }
}
