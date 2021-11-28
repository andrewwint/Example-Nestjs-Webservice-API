/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDTO {
  _id?: string;

  @ApiProperty()
  content_id?: any;

  @ApiProperty()
  gameName?: string;

  @ApiProperty()
  attributes?: [object];

  @ApiProperty()
  language?: string;

  @ApiProperty()
  surveyQuestionMap?: object;

  @ApiProperty()
  groupedAttributes?: object;

  @ApiProperty()
  systemResource?: object;

  @ApiProperty()
  stageData?: object;

  @ApiProperty()
  subGameName?: string;

  @ApiProperty()
  gameObject?: string;

  @ApiProperty()
  subGameObject?: string;

  @ApiProperty()
  allTradeoffsSet?: boolean;

  @ApiProperty()
  instanceLevel?: boolean;

  @ApiProperty()
  instanceAttribute?: boolean;

  @ApiProperty()
  systemResourceObject?: string;

  @ApiProperty()
  controlsResourceObject?: string;

  @ApiProperty()
  systemText?: object;

  @ApiProperty()
  controls?: [];

  @ApiProperty()
  gameInstanceName?: string;

  @ApiProperty()
  subgameInstanceName?: string;

  @ApiProperty()
  levels?: [];

  @ApiProperty()
  createdate?: Date;

  @ApiProperty()
  modifieddate?: Date;

  @ApiProperty()
  version?: number;

  @ApiProperty()
  version_history?: number;

  @ApiProperty()
  history?: [object];

  @ApiProperty()
  __v?: number;
}
