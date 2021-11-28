import { Test, TestingModule } from '@nestjs/testing';
import { XmlLoaderController } from './xml-loader.controller';
import { XmlLoaderService } from './xml-loader.service';
import { LoadXmlFileDTO } from './dto/load-xml-file.dto';
import { UploadXmlFileDTO } from './dto/upload-xml-file.dto';
import { StacksService } from '@truechoice/stacks';
import { SecureShellService } from './secure-shell/secure-shell.service';

const mockStacksService = () => ({
  getServerByShortName: jest.fn()
});

const mockSecureShellService = () => ({
  prepareBatchApplicationsProductsXmls: jest.fn(),
  prepareApplicationXmlFile: jest.fn()
});

describe('XmlLoader Controller', () => {
  let controller: XmlLoaderController;
  let service: XmlLoaderService;
  let stack: StacksService;
  let shell: SecureShellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StacksService,
        { provide: StacksService, useFactory: mockStacksService },
        XmlLoaderService,
        SecureShellService,
        { provide: SecureShellService, useFactory: mockSecureShellService }
      ],
      controllers: [XmlLoaderController]
    }).compile();

    controller = module.get<XmlLoaderController>(XmlLoaderController);
    service = module.get<XmlLoaderService>(XmlLoaderService);
    stack = module.get<StacksService>(StacksService);
    shell = module.get<SecureShellService>(SecureShellService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(controller.loadXmlBatch).toBeDefined();
    expect(controller.loadXmlByContentId).toBeDefined();
    expect(controller.loadXmlFile).toBeDefined();
    expect(controller.upLoadXmlFile).toBeDefined();
  });

  describe('loadXmlBatch', () => {
    const instance: any = { instance_id: '5f275f06f6f50377a0e96aaa', servertype: 'App' };
    const batch: LoadXmlFileDTO = {
      server: 'dev-test',
      payload: {
        deleteXml: true,
        app:
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlIj4NCiAgICA8Z2Ft ZSBuYW1lPSJwcm90b3R5cGUiIGZpeGVkPSJmYWxzZSI+ICAgDQogICAgPC9nYW1lPg0KPC9jbGll bnQ+DQo=',
        app_pb:
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlX3BiIj4NCgk8Z2Ft ZSBuYW1lPSJwcm90b3R5cGVfcGIiIGZpeGVkPSJmYWxzZSI+DQoJCQ0KCTwvZ2FtZT4NCjwvY2xp ZW50Pg0K',
        functional_tests:
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0iZnVuY3Rpb25hbF90ZXN0cyI+DQog ICAgPGdhbWUgbmFtZT0iZnVuY3Rpb25hbF90ZXN0cyIgZml4ZWQ9ImZhbHNlIj4NCiAgICAgIA0K ICAgIDwvZ2FtZT4NCjwvY2xpZW50Pg0K',
        app_pb_products:
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlX3BiIj4NCjwvY2xp ZW50Pg0K'
      }
    };

    it('should pass a group of xml files to the correct service method =', async () => {
      jest.spyOn(service, 'loadXmlFile');
      jest.spyOn(service, 'loadXmlBatch');
      jest.spyOn(stack, 'getServerByShortName').mockImplementation(() => instance);
      jest.spyOn(shell, 'prepareBatchApplicationsProductsXmls');

      await controller.loadXmlBatch(batch);
      expect(service.loadXmlBatch).toHaveBeenCalled();
      expect(stack.getServerByShortName).toHaveBeenCalled();
      expect(stack.getServerByShortName).toHaveBeenCalledWith(batch.server);
      expect(service.loadXmlFile).not.toHaveBeenCalled();
      expect(service.loadXmlBatch).toHaveBeenCalledWith(batch);
      expect(shell.prepareBatchApplicationsProductsXmls).toHaveBeenCalled();
      expect(shell.prepareBatchApplicationsProductsXmls).toHaveBeenCalledWith(
        batch,
        batch.deleteXml,
        instance
      );
    });
  });

  describe('importXmlByContentId', () => {
    it('should pass the xml id and target server  to the correct service method ', async () => {
      jest.spyOn(service, 'loadXmlByContentId');
      jest.spyOn(service, 'loadXmlFile');
      jest.spyOn(stack, 'getServerByShortName');
      await controller.loadXmlByContentId('5e0255c45db08b348814d542', 'dev');
      expect(service.loadXmlFile).not.toHaveBeenCalled();
      expect(service.loadXmlByContentId).toHaveBeenCalledWith('5e0255c45db08b348814d542', 'dev');
    });
  });

  describe('loadXmlFile', () => {
    const instance: any = { instance_id: '5f275f06f6f50377a0e96aaa', servertype: 'App' };
    const xml: LoadXmlFileDTO = {
      server: 'dev-test',
      deleteXml: 'client',
      payload:
        'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlIj4NCiAgICA8Z2Ft ZSBuYW1lPSJwcm90b3R5cGUiIGZpeGVkPSJmYWxzZSI+ICAgDQogICAgPC9nYW1lPg0KPC9jbGll bnQ+DQo='
    };

    it('should pass the xml file to the correct service method ', async () => {
      jest.spyOn(service, 'loadXmlFile');
      jest.spyOn(service, 'loadXmlBatch');
      jest.spyOn(stack, 'getServerByShortName').mockImplementation(() => instance);
      jest.spyOn(shell, 'prepareApplicationXmlFile');

      await controller.loadXmlFile(xml);
      expect(service.loadXmlFile).toHaveBeenCalled();
      expect(service.loadXmlBatch).not.toHaveBeenCalled();
      expect(service.loadXmlFile).toHaveBeenCalledWith(xml);
      expect(stack.getServerByShortName).toHaveBeenCalledWith(xml.server);
      expect(shell.prepareApplicationXmlFile).toHaveBeenCalled();
      expect(shell.prepareApplicationXmlFile).toBeCalledWith(
        xml.payload,
        { type: 'base64' },
        xml.deleteXml,
        instance
      );
    });
  });

  describe('upLoadXmlFile', () => {
    it('should pass the xml file to the correct service method ', async () => {
      const instance: any = { instance_id: '5f275f06f6f50377a0e96aaa', servertype: 'App' };
      const uploadXmlFileDto: UploadXmlFileDTO = {
        server: 'dev-test',
        deleteXml: 'client'
      };
      const xmlFile = Buffer.from('<client name="prototype"></client>');
      jest.spyOn(service, 'upLoadXmlFile');
      jest.spyOn(service, 'loadXmlBatch');
      jest.spyOn(service, 'loadXmlFile');
      jest.spyOn(stack, 'getServerByShortName').mockImplementation(() => instance);
      jest.spyOn(shell, 'prepareApplicationXmlFile');

      await controller.upLoadXmlFile(xmlFile, uploadXmlFileDto.server, uploadXmlFileDto.deleteXml);
      expect(service.upLoadXmlFile).toHaveBeenCalled();
      expect(service.loadXmlBatch).not.toHaveBeenCalled();
      expect(service.loadXmlFile).not.toHaveBeenCalled();
      expect(service.upLoadXmlFile).toHaveBeenCalled();
      expect(service.upLoadXmlFile).toHaveBeenCalledWith(uploadXmlFileDto, xmlFile);
      expect(shell.prepareApplicationXmlFile).toHaveBeenCalled();
      expect(shell.prepareApplicationXmlFile).toHaveBeenCalledWith(
        xmlFile.buffer,
        { type: 'buffer' },
        uploadXmlFileDto.deleteXml,
        instance
      );
    });
  });
});
