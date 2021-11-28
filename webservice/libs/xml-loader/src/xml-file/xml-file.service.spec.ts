import { XmlFileService } from './xml-file.service';
import * as path from 'path';
import * as fs from 'fs';

describe('XmlFileService', () => {
  let xml: XmlFileService;

  beforeEach(async () => {
    xml = new XmlFileService();
  });

  it('should be defined', () => {
    expect(new XmlFileService()).toBeDefined();
    expect(xml).toBeDefined();
    expect(xml.getClientNameFromXml).toBeDefined();
    expect(xml.getGameNameFromXml).toBeDefined();
    expect(xml.getSubgameNameFromXml).toBeDefined();
    expect(xml.saveXmlFileToTmp).toBeDefined();
    expect(xml.getClientNameSaveFileToTmp).toBeDefined();
    expect(xml.getXmlFactory).toBeDefined();
    expect(xml.getXmlObject).toBeDefined();
  });

  describe('XML file management', () => {
    it('should find client name from XML file', async () => {
      const xmldoc: string = '<client name="prototype"></client>';
      const clientname = await xml.getClientNameFromXml(xmldoc);
      expect(clientname).toEqual('prototype');
    });
    
    it('should find game name from XML file', async () => {
      const xmldoc: string = '<client name="prototype"><game name="prototype_game"></game></client>';
      const gamename = await xml.getGameNameFromXml(xmldoc);
      expect(gamename).toEqual('prototype_game');
    });

    it('should find subgame name from XML file', async () => {
      const xmldoc: string = `<client name="prototype"><game name="prototype_game">
      <subgame name="prototype_subgame"></subgame></game></client>`;
      const subgamename = await xml.getSubgameNameFromXml(xmldoc);
      expect(subgamename).toEqual('prototype_subgame');
    });

    it('should create a filename from name found in the XML', async () => {
      const xmldoc: string =
        '<client name="unit_test_prototype_feature"></client>';
      const clientname = await xml.getClientNameFromXml(xmldoc);
      const filename = await xml.saveXmlFileToTmp(clientname, xmldoc);
      expect(filename).toMatch(/unit_test_prototype_feature/);
      expect(path.posix.basename(`./tmp/${filename}`)).toEqual(filename);
      fs.unlink(path.posix.resolve(`./tmp/${filename}`), err => {});
    });

    it('should save XML file to the ./tmp folder', async () => {
      const xmldoc: string = '<client name="prototype_pb"></client>';
      const clientName = await xml.getClientNameFromXml(xmldoc);
      const filename = await xml.saveXmlFileToTmp(clientName, xmldoc);
      expect(path.posix.basename(`./tmp/${filename}`)).toEqual(filename);
      fs.unlink(path.posix.resolve(`./tmp/${filename}`), err => {});
    });

    it("should find the client name and save xml file to ./tmp", async () => {
      const xmldoc: string = '<client name="prototype_pb"></client>';
      jest.spyOn(xml, 'getClientNameFromXml');
      jest.spyOn(xml, 'getGameNameFromXml');
      jest.spyOn(xml, 'getSubgameNameFromXml');
      jest.spyOn(xml, 'saveXmlFileToTmp');
      const { xmlfilename } = await xml.getClientNameSaveFileToTmp(
        xmldoc
      );
      expect(xml.clientName).toStrictEqual('prototype_pb');
      expect(xml.gameName).toStrictEqual('');
      expect(xml.subgameName).toStrictEqual('');
      expect(xml.xmlfilename).toStrictEqual(xmlfilename);
      expect(xml.getClientNameFromXml).toBeCalled();
      expect(xml.getGameNameFromXml).toBeCalled();
      expect(xml.getSubgameNameFromXml).toBeCalled();
      expect(xml.saveXmlFileToTmp).toBeCalled();
      expect(path.posix.basename(`./tmp/${xmlfilename}`)).toEqual(xmlfilename);
      fs.unlink(path.posix.resolve(`./tmp/${xmlfilename}`), err => {});
    });

    it("should find the client, game, subgame name and save xml file to ./tmp", async () => {
      const xmldoc: string = `<client name="prototype_pb"><game name="prototype_game">
      <subgame name="prototype_subgame"></subgame></game></client>`;
      jest.spyOn(xml, 'getClientNameFromXml');
      jest.spyOn(xml, 'getGameNameFromXml');
      jest.spyOn(xml, 'getSubgameNameFromXml');
      jest.spyOn(xml, 'saveXmlFileToTmp');
      const { xmlfilename } = await xml.getClientNameSaveFileToTmp(
        xmldoc
      );
      expect(xml.clientName).toStrictEqual('prototype_pb');
      expect(xml.gameName).toStrictEqual('prototype_game');
      expect(xml.subgameName).toStrictEqual('prototype_subgame');
      expect(xml.xmlfilename).toStrictEqual(xmlfilename);
      expect(xml.getClientNameFromXml).toBeCalled();
      expect(xml.getGameNameFromXml).toBeCalled();
      expect(xml.getSubgameNameFromXml).toBeCalled();
      expect(xml.saveXmlFileToTmp).toBeCalled();
      expect(path.posix.basename(`./tmp/${xmlfilename}`)).toEqual(xmlfilename);
      fs.unlink(path.posix.resolve(`./tmp/${xmlfilename}`), err => {});
    });

    describe('XML file factory', () => {
      it('should return an XML from a Buffer/uploaded file', async () => {
        jest.spyOn(xml, 'getXmlFactory');
        const fileBuffer = Buffer.from('<client name="prototype"></client>'); //returns <Buffer 3c 63 6c 69 65 6e 74 20 6e 61 6d 65 3d 22 70 72 6f 74 6f 74 79 70 65 22 3e 3c 2f 63 6c 69 65 6e 74 3e>
        const result: string = '<client name="prototype"></client>';
        const output: string = await xml.getXmlFactory(fileBuffer);
        expect(xml.getXmlFactory).toBeCalled();
        expect(xml.getXmlFactory).toBeCalledWith(fileBuffer);
        expect(output).toStrictEqual(result);
        expect(xml.xmlDocument).toStrictEqual(result);
      });

      it('should return an XML from a Buffer/uploaded file and option passed in', async () => {
        jest.spyOn(xml, 'getXmlFactory');
        const fileBuffer = Buffer.from(
          '<client name="unit_test_prototype_feature"></client>'
        ); //returns <Buffer 3c 63 6c 69 65 6e 74 20 6e 61 6d 65 3d 22 70 72 6f 74 6f 74 79 70 65 22 3e 3c 2f 63 6c 69 65 6e 74 3e>
        const result: string =
          '<client name="unit_test_prototype_feature"></client>';
        const output: string = await xml.getXmlFactory(fileBuffer, {
          type: 'buffer',
        });
        expect(xml.getXmlFactory).toBeCalled();
        const options = { type: 'buffer' };
        expect(xml.getXmlFactory).toBeCalledWith(fileBuffer, options);
        expect(output).toStrictEqual(result);
        expect(xml.xmlDocument).toStrictEqual(result);
      });

      it('should return an XML from a Base64 Buffer', async () => {
        jest.spyOn(xml, 'getXmlFactory');
        const Base64 = 'PGNsaWVudCBuYW1lPSJwcm90b3R5cGUiPjwvY2xpZW50Pg==';
        const result: string = '<client name="prototype"></client>';
        const options = { type: 'base64' };
        const output = await xml.getXmlFactory(Base64, options);
        expect(xml.getXmlFactory).toBeCalled();
        expect(xml.getXmlFactory).toBeCalledWith(Base64, options);
        expect(output).toStrictEqual(result);
        expect(xml.xmlDocument).toStrictEqual(result);
      });

      it('should return an XML from an Object', async () => {
        jest.spyOn(xml, 'getXmlFactory');
        const jsObj: Object = {
          attributes: { name: 'prototype' },
          name: 'client',
          type: 'element',
        };
        const result: string = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE client SYSTEM "object.dtd">
<client name="prototype"/>`;
        const output = await xml.getXmlFactory(jsObj, { type: 'js' });
        expect(xml.getXmlFactory).toBeCalled();
        expect(xml.getXmlFactory).toBeCalledWith(jsObj, { type: 'js' });
        expect(output).toEqual(result);
        expect(xml.xmlDocument).toEqual(result);
      });
    });

    describe('XML to JSON', () => {
      it('should return an JS from a Buffer', async () => {
        jest.spyOn(xml, 'getXmlObject');
        const XMLString: string = '<client name="prototype"></client>';
        const result: Object = {
          elements: [
            {
              attributes: { name: 'prototype' },
              name: 'client',
              type: 'element',
            },
          ],
        };
        const output = xml.getXmlObject(XMLString);
        expect(xml.getXmlObject).toBeCalled();
        expect(xml.getXmlObject).toBeCalledWith(XMLString);
        expect(output).toStrictEqual(result);
        expect(xml.xmlObject).toStrictEqual(result);
      });
    });
  });
});
