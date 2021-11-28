/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as xmlbuilder from 'xmlbuilder';

export class Xmlhelper {
  setLevelLangProfileXML(
    root: xmlbuilder.XMLElement,
    level_value: string,
    languageMap: Object,
    profileMap: Object,
    locale = 'en',
    parent_att = {},
  ) {
    let level: xmlbuilder.XMLElement = root.ele('level', {
      value: level_value,
      ...parent_att,
    });

    this.setLangProfileXML(level, languageMap, profileMap, locale);

    return level;
  }

  setResourceLangProfileXML(
    root: xmlbuilder.XMLElement,
    parent = 'default_node_name',
    languageMap: Object,
    profileMap: Object,
    locale = 'en',
    parent_att = {},
  ) {
    let resource: xmlbuilder.XMLElement = root.ele('resource', {
      name: parent,
      ...parent_att,
    });

    this.setLangProfileXML(resource, languageMap, profileMap, locale);

    return resource;
  }

  setLangProfileXML(
    root: xmlbuilder.XMLElement,
    languageMap: Object,
    profileMap: Object,
    locale = 'en',
  ) {
    if (languageMap != undefined) {
      const __languageMap = Object.keys(languageMap);
      for (let keys of __languageMap) {
        root.ele(
          'language',
          { key: keys, locale: locale },
          this.htmlEntities(languageMap[keys])
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .replace(/\s+/g, ' ')
            .trim(),
        );
      }
    }

    if (profileMap != undefined) {
      const __profileMap = Object.keys(profileMap);
      for (let keys of __profileMap) {
        root.ele('profile', { key: keys, value: profileMap[keys] });
      }
    }
    return root;
  }

  private htmlEntities(str: string): string {
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
