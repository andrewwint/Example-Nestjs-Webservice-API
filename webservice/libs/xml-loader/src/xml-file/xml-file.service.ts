import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as xpath from 'xpath';
import { js2xml, xml2js } from 'xml-js';
import { DOMParser } from 'xmldom';
import { ShellFactoryOptions } from '../secure-shell/interfaces/shell-factory-options.interface';
import { xmlFactoryOptions } from './interfaces/xml-factory-options.interface';

export class XmlFileService {
  private readonly logger = new Logger(XmlFileService.name);

  public clientName: string;
  public gameName: string;
  public subgameName: string;
  public xmlfilename: string;
  public xmlDocument: string;
  public xmlObject: Object;

  async getNameFromXml(
    xPathExpression: string,
    XmlDocument: string
  ): Promise<string> {
    let name: object = xpath.select(
      xPathExpression,
      new DOMParser().parseFromString(XmlDocument.toString())
    );
    if (name[0] != undefined) {
      this.logger.log(
        `Found ${name[0].value} from ${XmlDocument.substring(0, 50)}`
      );
      return name[0].value;
    }
    return '';
  }

  async getClientNameFromXml(XmlDocument: string): Promise<string> {
    return await this.getNameFromXml('//client/@name', XmlDocument);
  }

  async getGameNameFromXml(XmlDocument: string): Promise<string> {
    return await this.getNameFromXml('//client/game/@name', XmlDocument);
  }

  async getSubgameNameFromXml(XmlDocument: string): Promise<string> {
    return await this.getNameFromXml(
      '//client/game/subgame/@name',
      XmlDocument
    );
  }

  async saveXmlFileToTmp(name: string, xmldoc: string): Promise<string> {
    const xmlfilename = `${name}-${Date.now()}.xml`;
    fs.writeFile(`./tmp/${xmlfilename}`, xmldoc, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    this.logger.log(`Created file ./tmp/${xmlfilename}`);
    return xmlfilename;
  }

  async getClientNameSaveFileToTmp(
    xmlDocument: string
  ): Promise<ShellFactoryOptions> {
    const xmlString = xmlDocument.toString();
    this.clientName = await this.getClientNameFromXml(xmlString);
    this.gameName = await this.getGameNameFromXml(xmlString);
    this.subgameName = await this.getSubgameNameFromXml(xmlString);
    this.xmlfilename = await this.saveXmlFileToTmp(
      this.clientName,
      xmlDocument
    );
    return {
      clientname: this.clientName,
      gamename: this.gameName,
      subgamename: this.subgameName,
      xmlfilename: this.xmlfilename
    };
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
        document = this.xmlBuiler(payload).toString();
        break;
      default:
        document = Buffer.from(payload).toString();
        break;
    }
    this.xmlDocument = document;
    return document;
  }

  getXmlObject(xmlString: Object): Object {
    let xmlObject: Object;
    xmlObject = xml2js(xmlString.toString());
    this.xmlObject = xmlObject;
    return xmlObject;
  }

  private xmlBuiler(xmlString: any): string {
    let xmlObject: Object = {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'UTF-8'
        }
      },
      elements: [
        {
          type: 'doctype',
          doctype: 'client SYSTEM "object.dtd"'
        }
      ]
    };
    xmlObject['elements'].push(xmlString);
    xmlObject = js2xml(xmlObject, { compact: false, spaces: 4 });
    return xmlObject.toString();
  }
}
