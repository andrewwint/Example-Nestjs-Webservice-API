import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import * as fs from 'fs';
import * as xpath from 'xpath';
import { Parser, Builder } from 'xml2js';
import { DOMParser } from 'xmldom';
import { xmlFactoryOptions } from './xml-factory-options.interface';
import { ShellFactoryOptions } from '@truechoice/xml-loader/secure-shell/interfaces/shell-factory-options.interface';

export class XmlFileManipulater {
  private readonly logger = new Logger(XmlFileManipulater.name);

  public gameName: string;
  public xmlfilename: string;
  public xmlDocument: string;
  public xmlObject: Object;

  async getGameNamefromXml(XmlDocument: string): Promise<string> {
    let name: object = xpath.select(
      '//client/@name',
      new DOMParser().parseFromString(XmlDocument.toString())
    );
    this.logger.log(`Found ${name[0].value} from ${XmlDocument.substring(0, 50)}`);
    return name[0].value;
  }

  async saveXmlFileToTmp(name: string, xmldoc: string): Promise<string> {
    const xmlfilename = `${name}-${Date.now()}.xml`;
    fs.writeFile(`./tmp/${xmlfilename}`, xmldoc, function(err) {
      if (err) {
        this.logger.error(`Tried to Created file ./tmp/${xmlfilename}`, err);
        return console.log(err);
      }
    });
    this.logger.log(`Created file ./tmp/${xmlfilename}`);
    return xmlfilename;
  }

  async getGameNameSaveFileToTmp(xmlDocument: string): Promise<ShellFactoryOptions> {
    this.gameName = await this.getGameNamefromXml(xmlDocument.toString());
    this.xmlfilename = await this.saveXmlFileToTmp(this.gameName, xmlDocument);
    return { gamename: this.gameName, xmlfilename: this.xmlfilename };
  }

  async getXmlFactory(
    payload: any,
    options: xmlFactoryOptions = { type: 'buffer' }
  ): Promise<string> {
    let document: string;

    switch (options.type) {
      case 'buffer':
        document = Buffer.from(payload).toString();
        break;
      case 'base64':
        document = Buffer.from(payload.toString(), 'base64').toString();
        break;
      case 'js':
        document = this.xmlBuiler().buildObject(payload);
        break;
      default:
        document = Buffer.from(payload).toString();
        break;
    }

    this.xmlDocument = document;
    return document;
  }

  getXmlObject(xmlString: string): Object {
    let xmlObject: Object;
    const parser = new Parser({ attrkey: '@' });
    parser.parseString(xmlString.toString(), (err, result) => {
      if (err) throw err;
      xmlObject = result;
    });
    this.xmlObject = xmlObject;
    return xmlObject;
  }

  private xmlBuiler() {
    return new Builder({
      attrkey: '@',
      doctype: { sysID: 'object.dtd' },
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      async: true
    });
  }
}
