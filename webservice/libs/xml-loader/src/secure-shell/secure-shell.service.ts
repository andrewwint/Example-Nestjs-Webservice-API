import { Logger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoadXmlFileDTO } from '../dto/load-xml-file.dto';
import { ShellExecService } from '@truechoice/helpers/shell-exec';
import { ShellFactoryOptions } from './interfaces/shell-factory-options.interface';
import { XmlFileService } from '../xml-file/xml-file.service';
import { xmlFactoryOptions } from '../xml-file/interfaces/xml-factory-options.interface';
import { NotificationService } from '@truechoice/notification';
import { Instance } from '@truechoice/stacks/interfaces/instance.interface';
import { ShellExecStream } from '@truechoice/helpers/shell-exec/interfaces/shell-exec-streams.interface';

const shellExecService: ShellExecService = new ShellExecService();

@Injectable()
export class SecureShellService {
  private readonly logger = new Logger(SecureShellService.name);

  private xml: XmlFileService = new XmlFileService();
  public xmlDocument: string;
  public xmlFilename: string;
  public clientName: string;
  public gameName: string;
  public subgameName: string;
  public productXmlDoc: string;
  public productXmlfilename: string;
  public targetServer: Instance = null;
  public batchpayload: Object = null;
  public deleteXml: string;
  public appEnv: string = process.env.APP_ENV;

  constructor(private readonly notificationService: NotificationService) {}

  private async setPemFilePermission(shell: ShellExecService = shellExecService): Promise<ShellExecStream>{
    try {
      return await shell.exec(`chmod 400 ${process.env.AWS_PEM_FILE}`) 
    } catch (error) {
      this.logger.log(error)
    } 
  }
 
  private async execute(
    options: ShellFactoryOptions,
    shell: ShellExecService = shellExecService
  ): Promise<string> {
    const command = this.shellCmdFactory(this.targetServer, options);
    this.setPemFilePermission()
    
    const { stdout, stderr } = await shell.exec(command);

    if (stderr.includes('Line: ')) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: stderr
        },
        201
      );
    } else {
      return stdout;
    }
  }

  shellCmdFactory(
    server: Instance,
    options: ShellFactoryOptions,
    appEnv: string = this.appEnv
  ): string {
    let command: string = null;
    const ipAddress: string = appEnv === 'development' ? server.private_ip : server.ip;

    switch (options.type) {
      case 'xml-scp':
        command = `scp -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" ./tmp/${options.xmlfilename} ${server.username}@${ipAddress}:/home/${server.username}/load/json-to-xmls/${options.xmlfilename}`;
        break;
      case 'create-client-delete-xml':
        command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ${server.username}@${ipAddress} ./load/json-to-xmls/bin/delete.xml.sh ${options.clientname}`;
        break;
      case 'create-game-delete-xml':
        command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ${server.username}@${ipAddress} ./load/json-to-xmls/bin/delete-game.xml.sh ${options.clientname} ${options.gamename}`;
        break;
      case 'create-subgame-delete-xml':
        command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ${server.username}@${ipAddress} ./load/json-to-xmls/bin/delete-subgame.xml.sh ${options.clientname} ${options.gamename} ${options.subgamename}`;
        break;
      case 'import-delete-xml':
        command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ${server.username}@${ipAddress} "export JAVA_HOME=/opt/java/jdk1.5.0_20 && ./load/execute.sh bfd.tools.xml.NewImport ./json-to-xmls/delete_${options.clientname}.xml" `;
        break;
      case 'import-xml':
        command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ${server.username}@${ipAddress} "export JAVA_HOME=/opt/java/jdk1.5.0_20 && ./load/execute.sh bfd.tools.xml.NewImport ./json-to-xmls/${options.xmlfilename}" `;
        break;
      case 'clear-cache':
        command = `ssh -o StrictHostKeyChecking=no -i "${process.env.AWS_PEM_FILE}" -T ${server.username}@${ipAddress} "export JAVA_HOME=/opt/java/jdk1.5.0_20 && ./load/clearcache.sh &" `;
        break;
    }
    return command;
  }

  async prepareApplicationXmlFile(
    payload: Buffer | Object | string,
    options: xmlFactoryOptions,
    deleteXml: string,
    server: Instance
  ): Promise<string> {
    let result: string;

    this.deleteXml = deleteXml; //client, game, subgame
    this.targetServer = server;
    this.xmlDocument = await this.xml.getXmlFactory(payload, options);
    const xml = await this.xml.getClientNameSaveFileToTmp(this.xmlDocument);
    (this.clientName = xml.clientname), (this.gameName = xml.gamename),
    (this.subgameName = xml.subgamename), (this.xmlFilename = xml.xmlfilename);
    if (server !== null) {
      result = await this.importApplicationXmlFile();
    }
    return result;
  }

  async importApplicationXmlFile(): Promise<string> {
    const xmlfilename = this.xmlFilename;
    const clientname = this.clientName;
    const gamename = this.gameName;
    const subgamename = this.subgameName;
    await this.execute({ xmlfilename: xmlfilename, type: 'xml-scp' }); //Transfers Parent Application XML files

    if (this.deleteXml === 'client') {
      await this.execute({ clientname: clientname, type: 'create-client-delete-xml' }); //Created Delete XML for client
    } else if (this.deleteXml === 'game') {
      await this.execute({ clientname: clientname, gamename: gamename, type: 'create-game-delete-xml' }); //Created Delete XML for game
    } else if (this.deleteXml === 'subgame') {
      await this.execute({ clientname: clientname, gamename: gamename, subgamename: subgamename, type: 'create-subgame-delete-xml' }); //Created Delete XML for subgame
    }
    if (this.deleteXml === 'client' || this.deleteXml === 'game' || this.deleteXml === 'subgame') {
      await this.execute({ clientname: clientname, type: 'import-delete-xml' }); //Execute Import Delete XML
    }
    await this.execute({ xmlfilename: xmlfilename, type: 'import-xml' }); //Execute Import Application XML
    await this.execute({ type: 'clear-cache' }); //Execute Clear Cache XML

    const message = `Imported: ${xmlfilename} TO ${
      this.targetServer.shortname
    } with DELETE : ${this.deleteXml.toString().toUpperCase()}`;

    this.logger.log(message);
    this.notificationService.createNotification({
      topic: 'xml-import',
      message: message
    });
    return message;
  }

  associateGamesToProducts(xmlFileImportDTO: LoadXmlFileDTO) {
    this.batchpayload = xmlFileImportDTO.payload;

    const payloadkeys = Object.keys(xmlFileImportDTO.payload);
    let applications = payloadkeys.filter((key) => !key.includes('products'));
    let products = payloadkeys.filter((key) => key.includes('products'));
    let gamesproductmap = {};

    for (const app of applications) {
      let product = products.find((prod) => prod.slice(0, -9) === app);
      if (product != undefined) {
        gamesproductmap[app] = {
          game: this.batchpayload[app],
          products: [this.batchpayload[product]]
        };
      } else {
        gamesproductmap[app] = { game: this.batchpayload[app] };
      }
    }
    this.logger.log(
      `Associating Games to Products; Found ${applications.length} application(s) and ${products.length} product(s) `
    );

    return gamesproductmap;
  }

  async prepareBatchApplicationsProductsXmls(
    payload: LoadXmlFileDTO,
    deleteXml: string,
    server: Instance
  ): Promise<string> {
    const batchpayload = this.associateGamesToProducts(payload);
    const batchkeys = Object.keys(batchpayload);
    const options = { type: 'base64' };
    this.deleteXml = deleteXml;
    this.targetServer = server;

    for (const key of batchkeys) {
      if (Object.keys(batchpayload[key]).includes('products') === false) {
        this.logger.log(`Processing appliction only [ ${key}.xml ] in Batch `);

        //Application
        let game = batchpayload[key]['game'];
        this.xmlDocument = await this.xml.getXmlFactory(game, options);
        let gxml = await this.xml.getClientNameSaveFileToTmp(this.xmlDocument);
        (this.clientName = gxml.clientname), (this.gameName = gxml.gamename),
        (this.subgameName = gxml.subgamename), (this.xmlFilename = gxml.xmlfilename);

        if (server !== null) {
          await this.importApplicationXmlFile();
        }
      } else {
        this.logger.log(
          `Processing appliction and products [ ${key}.xml ] & [ ${key}_products.xml ] Product in Batch `
        );

        //Product
        let product = batchpayload[key]['products'][0];
        this.productXmlDoc = await this.xml.getXmlFactory(product, options);
        let pxml = await this.xml.getClientNameSaveFileToTmp(this.productXmlDoc);
        this.productXmlfilename = pxml.xmlfilename;

        //Application
        let game = batchpayload[key]['game'];
        this.xmlDocument = await this.xml.getXmlFactory(game, options);
        let gxml = await this.xml.getClientNameSaveFileToTmp(this.xmlDocument);
        (this.clientName = gxml.clientname), (this.gameName = gxml.gamename),
        (this.subgameName = gxml.subgamename), (this.xmlFilename = gxml.xmlfilename);

        if (server !== null) {
          await this.importApplicationProductsXmlFile();
        }
      }
    }

    await this.execute({ type: 'clear-cache' });

    return;
  }

  private async importApplicationProductsXmlFile(): Promise<string> {
    const productfile = this.productXmlfilename;
    const xmlfilename = this.xmlFilename;
    const clientname = this.clientName;
    const gamename = this.gameName;
    const subgamename = this.subgameName;

    await this.execute({ xmlfilename: productfile, type: 'xml-scp' }); //Transfers Product XML files
    await this.execute({ xmlfilename: xmlfilename, type: 'xml-scp' }); //Transfers Parent Application XML files

    if (this.deleteXml === 'client') {
      await this.execute({ clientname: clientname, type: 'create-client-delete-xml' }); //Created Delete XML for client
    } else if (this.deleteXml === 'game') {
      await this.execute({ clientname: clientname, gamename: gamename, type: 'create-game-delete-xml' }); //Created Delete XML for game
    } else if (this.deleteXml === 'subgame') {
      await this.execute({ clientname: clientname, gamename: gamename, subgamename: subgamename, type: 'create-subgame-delete-xml' }); //Created Delete XML for subgame
    }
    if (this.deleteXml === 'client' || this.deleteXml === 'game' || this.deleteXml === 'subgame') {
      await this.execute({ clientname: clientname, type: 'import-delete-xml' }); //Execute Import Delete XML
    }
    await this.execute({ xmlfilename: productfile, type: 'import-xml' }); //Execute Import Prodect XML
    await this.execute({ xmlfilename: xmlfilename, type: 'import-xml' }); //Execute Import Application XML

    delete this.productXmlfilename; //Clean UP

    this.logger.log(
      `Imported: ${this.xmlFilename} TO ${
        this.targetServer.shortname
      } with DELETE : ${this.deleteXml.toString().toUpperCase()}`
    );

    return;
  }
}
