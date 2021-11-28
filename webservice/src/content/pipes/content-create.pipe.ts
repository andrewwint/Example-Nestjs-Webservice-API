/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ContentCreatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value = this.transformHashkeyInput(value);

    if (value.stageData) {
      value.stageData = this.transformObjdotkeyInput(value.stageData);
    }

    if (value.attributes) {
      value.attributes = this.transformAttribute(value.attributes);
    }

    if (value.controls) {
      value.controls = this.transformObjdotkeyInput(value.controls);
    }

    if (value.systemResource) {
      value.systemResource = this.transformObjdotkeyInput(value.systemResource);
    }

    if (value.systemText) {
      value.systemText = this.transformObjdotkeyInput(value.systemText);
    }

    return value;
  }

  private transformHashkeyInput(value: Object) {
    return JSON.parse(JSON.stringify(value).replace(/\$\$hashKey/g, 'hashKey'));
  }

  private transformObjdotkeyInput(value: Object) {
    return JSON.parse(JSON.stringify(value).replace(/\./g, '&#46;'));
  }

  //Refactor into helper class
  private transformAttribute(value: Object) {
    return JSON.parse(
      JSON.stringify(value)
        .replace(/shortname\.levels/g, 'shortname-levels')
        .replace(/help\.title/g, 'help-title')
        .replace(/help\.body/g, 'help-body')
        .replace(/help\.gotit/g, 'help-gotit')
        .replace(/help\.assets\.image\.alt/g, 'help-assets-image-alt')
        .replace(/help\.assets\.image/g, 'help-assets-image')
        .replace(/intro\.body/g, 'help-assets-image')
        .replace(/intro\.image.alt/g, 'intro-image-alt')
        .replace(/intro\.image/g, 'intro-image-alt')
        .replace(/intro\.title/g, 'intro-title')
        .replace(/intro\.label/g, 'intro-label')
        .replace(/groupwidget\.showoptiontext/g, 'groupwidget-showoptiontext'),
    );
  }
}
