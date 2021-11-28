/*
 * Copyright (c) 2006-present TrueChoice IP Holding Company, Inc.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of TrueChoice IP Holding Company, Inc.
 * ("Confidential Information").  You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with the company.
 */

import * as xmlbuilder from 'xmlbuilder';
import { Xmlhelper } from './xmlhelper';

export class Xmlelements extends Xmlhelper {
  protected gameName: String;

  setGameName(gameName: String) {
    this.gameName = gameName;
  }

  getClientGameParent() {
    let xml: xmlbuilder.XMLElement = xmlbuilder
      .create('client')
      .att('name', this.gameName)
      .ele('game', { name: this.gameName, fixed: false });
    xml.dtd('object.dtd');
    return xml;
  }

  getAttributes(root: xmlbuilder.XMLElement, attributes: any) {
    let attribute_xml_node: xmlbuilder.XMLElement;

    for (let attribute of attributes) {
      attribute_xml_node = root.ele('attribute', {
        name: attribute.name.trim(),
        implicit: attribute.implicit,
        'must-have-allowed': attribute.mustHaveAllowed,
        'skip-allowed': attribute.skipAllowed,
        type: attribute.type,
        'unacceptables-allowed': attribute.unacceptablesAllowed,
      });
      for (let level of attribute.levels) {
        this.setLevelLangProfileXML(
          attribute_xml_node,
          level.value,
          level.languageMap,
          level.profileMap,
        );
      }
      this.setLangProfileXML(
        attribute_xml_node,
        attribute.languageMap,
        attribute.profileMap,
        attribute.language.trim(),
      );
    }
    return attribute_xml_node;
  }

  getSubgame(root: xmlbuilder.XMLElement, attributes: any) {
    let subgame_attribute = root.ele('subgame', {
      name: this.gameName,
      'version-label': 0,
    });
    for (let attribute of attributes) {
      let subgame_level_xml_node = subgame_attribute.ele('subgame-attribute', {
        name: attribute.name.trim(),
      });
      for (let level of attribute.levels) {
        subgame_level_xml_node.ele('subgame-level', {
          value: level.value.trim(),
        });
      }
    }
    subgame_attribute.ele('naming', {
      name: this.gameName,
      'by-owner': true,
      type: 'bfd.domain.game.Game',
      owner: `[Client]${this.gameName}/[Game]${this.gameName}`,
    });
    return subgame_attribute;
  }

  getMainResource(root: xmlbuilder.XMLElement, systemResource: any) {
    return root
      .ele('resource', {
        name: 'main',
        value: '/truechoice/app/clients/prototype/TCSFOUR-4013-pinata/',
      })
      .ele(
        'language',
        {
          locale: systemResource.language.trim(),
          key: 'browserTitle',
        },
        this.gameName,
      );
  }

  getControls(root: xmlbuilder.XMLElement, controls: any) {
    let xml = root.ele('resource', { name: 'controls' });
    for (let control of controls) {
      xml.ele('resource-element', { value: control });
    }
    return xml;
  }

  getSystemResource(root: xmlbuilder.XMLElement, systemResource: any) {
    return this.setResourceLangProfileXML(
      root,
      'system',
      systemResource.languageMap,
      systemResource.profileMap,
      systemResource.language.trim(),
    );
  }

  getStageResources(root: xmlbuilder.XMLElement, stageData: any) {
    for (let keys of Object.keys(stageData)) {
      this.setResourceLangProfileXML(
        root,
        stageData[keys].name,
        stageData[keys].languageMap,
        stageData[keys].profileMap,
        stageData[keys].language,
        { value: stageData[keys].value.trim() },
      );
    }
  }

  getUrlResource(
    root: xmlbuilder.XMLElement,
    data = { name: 'url', value: 'uid' },
  ) {
    return root
      .ele('resource', { name: data.name })
      .ele('resource-element', { value: data.value });
  }

  getNaming(root: xmlbuilder.XMLElement, gameObject: any) {
    return root.ele('naming', {
      name: this.gameName,
      owner: gameObject.trim(),
      type: 'bfd.domain.game.Game',
      'by-owner': true,
    });
  }

  getProfileKey(root: xmlbuilder.XMLElement, data = {}) {
    return root
      .ele('profile-key', { key: 'uid', required: false })
      .ele('naming', { name: this.gameName + 'Uid' });
  }
}
