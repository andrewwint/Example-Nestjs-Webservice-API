import { SecureShellService } from './secure-shell.service';
import { ShellFactoryOptions } from './interfaces/shell-factory-options.interface';
import { LoadXmlFileDTO } from '../dto/load-xml-file.dto';
import { NotificationService } from '@truechoice/notification';
import { ShellExecService } from '@truechoice/helpers/shell-exec';
import * as path from 'path';
import * as fs from 'fs';

describe('ShellExecutionService', () => {
  let shellCmd: SecureShellService;
  let notificationService: NotificationService;
  let shellExec: ShellExecService;

  beforeEach(async () => {
    shellCmd = new SecureShellService(notificationService);
  });

  it('should be defined', () => {
    expect(shellCmd).toBeDefined();
    expect(shellCmd.importApplicationXmlFile).toBeDefined();
    expect(shellCmd.prepareApplicationXmlFile).toBeDefined();
  });

  describe('should generate excute shell commands', () => {
    const instance: any = {
      shortname: 'dev',
      username: 'ubuntu',
      private_ip: '10.10.10.1',
      ip: '10.10.10.179'
    };

    it('should set property targetServer ', () => {
      shellCmd.targetServer = instance;
      expect(shellCmd.targetServer).toMatchObject(instance);
    });

    it('should set property targetServer from importApplicationXmlFile()', async () => {
      jest.spyOn(shellCmd, 'prepareApplicationXmlFile');
      jest.spyOn(shellCmd, 'importApplicationXmlFile');
      const payload = Buffer.from('<client name="shell_unit_test_prototype_feature"></client>');

      await shellCmd.prepareApplicationXmlFile(payload, { type: 'buffer' }, 'client', null);

      expect(shellCmd.prepareApplicationXmlFile).toBeCalledWith(
        payload,
        { type: 'buffer' },
        'client',
        null
      );
      expect(shellCmd.targetServer).toStrictEqual(null);
      expect(shellCmd.xmlDocument).toBe(
        '<client name="shell_unit_test_prototype_feature"></client>'
      );

      expect(shellCmd.xmlFilename).toMatch(/shell_unit_test_prototype_feature/);
      fs.unlink(path.posix.resolve(`./tmp/${shellCmd.xmlFilename}`), (err) => {});
      expect(shellCmd.clientName).toStrictEqual('shell_unit_test_prototype_feature');
      expect(shellCmd.deleteXml).toBe('client');
      expect(shellCmd.prepareApplicationXmlFile).toBeCalled();
    });

    it('should tranfer Xml File using Private IP address', async () => {
      const optionsScp: ShellFactoryOptions = {
        xmlfilename: 'app.xml',
        type: 'xml-scp'
      };

      const commandScp = `scp -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" ./tmp/app.xml ubuntu@10.10.10.1:/home/ubuntu/load/json-to-xmls/app.xml`;
      let resultScp = shellCmd.shellCmdFactory(instance, optionsScp, 'development');
      expect(resultScp).toStrictEqual(commandScp);
    });

    it('should tranfer Xml File', async () => {
      const optionsScp: ShellFactoryOptions = {
        xmlfilename: 'app.xml',
        type: 'xml-scp'
      };
      const commandScp = `scp -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" ./tmp/app.xml ubuntu@10.10.10.179:/home/ubuntu/load/json-to-xmls/app.xml`;
      let resultScp = shellCmd.shellCmdFactory(instance, optionsScp);
      expect(resultScp).toStrictEqual(commandScp);
    });

    it('should created Delete XML', async () => {
      const optionsCreateDelete: ShellFactoryOptions = {
        clientname: 'prototype',
        type: 'create-client-delete-xml'
      };
      const command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ubuntu@10.10.10.179 ./load/json-to-xmls/bin/delete.xml.sh prototype`;
      let result = shellCmd.shellCmdFactory(instance, optionsCreateDelete);
      expect(result).toStrictEqual(command);
    });

    it('should created Delete XML for game', async () => {
      const optionsCreateDelete: ShellFactoryOptions = {
        clientname: 'prototype',
        gamename: 'prototype_game',
        type: 'create-game-delete-xml'
      };
      const command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ubuntu@10.10.10.179 ./load/json-to-xmls/bin/delete-game.xml.sh prototype prototype_game`;
      let result = shellCmd.shellCmdFactory(instance, optionsCreateDelete);
      expect(result).toStrictEqual(command);
    });

    it('should created Delete XML for subgame', async () => {
      const optionsCreateDelete: ShellFactoryOptions = {
        clientname: 'prototype',
        gamename: 'prototype_game',
        subgamename: 'prototype_subgame',
        type: 'create-subgame-delete-xml'
      };
      const command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ubuntu@10.10.10.179 ./load/json-to-xmls/bin/delete-subgame.xml.sh prototype prototype_game prototype_subgame`;
      let result = shellCmd.shellCmdFactory(instance, optionsCreateDelete);
      expect(result).toStrictEqual(command);
    });

    it('should execute Import Delete XML', async () => {
      const optionsCreateDelete: ShellFactoryOptions = {
        clientname: 'prototype',
        type: 'import-delete-xml'
      };
      const command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ubuntu@10.10.10.179 "export JAVA_HOME=/opt/java/jdk1.5.0_20 && ./load/execute.sh bfd.tools.xml.NewImport ./json-to-xmls/delete_prototype.xml" `;
      let result = shellCmd.shellCmdFactory(instance, optionsCreateDelete);
      expect(result).toStrictEqual(command);
    });

    it('should execute Import Application XML', async () => {
      const optionsImportXML: ShellFactoryOptions = {
        xmlfilename: 'app.xml',
        type: 'import-xml'
      };
      const command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ubuntu@10.10.10.179 "export JAVA_HOME=/opt/java/jdk1.5.0_20 && ./load/execute.sh bfd.tools.xml.NewImport ./json-to-xmls/app.xml" `;
      let result = shellCmd.shellCmdFactory(instance, optionsImportXML);
      expect(result).toStrictEqual(command);
    });

    it('should execute Clear Cache XML', async () => {
      const optionsClearCache: ShellFactoryOptions = {
        type: 'clear-cache'
      };
      const command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ubuntu@10.10.10.179 "export JAVA_HOME=/opt/java/jdk1.5.0_20 && ./load/clearcache.sh &" `;
      let result = shellCmd.shellCmdFactory(instance, optionsClearCache);
      expect(result).toStrictEqual(command);
    });
  });

  describe('Mutators', () => {
    it('should mutate single dimension batch payload to associative structure', () => {
      const input: LoadXmlFileDTO = {
        server: 'dev-test',
        payload: {
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

      const output = {
        app: {
          game:
            'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlIj4NCiAgICA8Z2Ft ZSBuYW1lPSJwcm90b3R5cGUiIGZpeGVkPSJmYWxzZSI+ICAgDQogICAgPC9nYW1lPg0KPC9jbGll bnQ+DQo='
        },
        app_pb: {
          game:
            'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlX3BiIj4NCgk8Z2Ft ZSBuYW1lPSJwcm90b3R5cGVfcGIiIGZpeGVkPSJmYWxzZSI+DQoJCQ0KCTwvZ2FtZT4NCjwvY2xp ZW50Pg0K',
          products: [
            'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0icHJvdG90eXBlX3BiIj4NCjwvY2xp ZW50Pg0K'
          ]
        },
        functional_tests: {
          game:
            'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBjbGllbnQg U1lTVEVNICJvYmplY3QuZHRkIj4NCjxjbGllbnQgbmFtZT0iZnVuY3Rpb25hbF90ZXN0cyI+DQog ICAgPGdhbWUgbmFtZT0iZnVuY3Rpb25hbF90ZXN0cyIgZml4ZWQ9ImZhbHNlIj4NCiAgICAgIA0K ICAgIDwvZ2FtZT4NCjwvY2xpZW50Pg0K'
        }
      };
      expect(shellCmd.batchpayload).toBeNull();
      const result = shellCmd.associateGamesToProducts(input);
      expect(shellCmd.batchpayload).not.toBeNull();
      expect(result).toStrictEqual(output);
    });
  });
});
