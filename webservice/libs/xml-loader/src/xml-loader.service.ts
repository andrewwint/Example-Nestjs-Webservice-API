import { Injectable, Logger } from '@nestjs/common';
import { StacksService } from '@truechoice/stacks';
import { LoadXmlFileDTO } from './dto/load-xml-file.dto';
import { SecureShellService } from './secure-shell/secure-shell.service';
import { Instance } from '@truechoice/stacks/interfaces/instance.interface';
import { UploadXmlFileDTO } from './dto/upload-xml-file.dto';

@Injectable()
export class XmlLoaderService {
  private readonly logger = new Logger(XmlLoaderService.name);
  public deleteXml: string;

  constructor(
    private readonly stacksService: StacksService,
    private readonly secureShellService: SecureShellService
  ) {}

  async loadXmlBatch(LoadXmlFileDto: LoadXmlFileDTO): Promise<string> {
    const instance: Instance = await this.stacksService.getServerByShortName(LoadXmlFileDto.server);

    await this.secureShellService.prepareBatchApplicationsProductsXmls(
      LoadXmlFileDto,
      LoadXmlFileDto.deleteXml,
      instance
    );
    this.logger.log(`Completed batch loading appication XML files`);
    return `Success`;
  }

  async loadXmlByContentId(id: string, shortname: string): Promise<string> {
    const instance: Instance = await this.stacksService.getServerByShortName(shortname);
    if (instance) {
      //Do something
    }
    return `Success`;
  }

  async loadXmlFile(LoadXmlFileDto: LoadXmlFileDTO): Promise<string> {
    const instance: Instance = await this.stacksService.getServerByShortName(LoadXmlFileDto.server);
    const result = await this.secureShellService.prepareApplicationXmlFile(
      LoadXmlFileDto.payload,
      { type: 'base64' },
      LoadXmlFileDto.deleteXml,
      instance
    );

    this.logger.log(`Completed loading appication XML`);
    return result;
  }

  async upLoadXmlFile(uploadXmlFileDTO: UploadXmlFileDTO, xmlFile: Buffer): Promise<string> {
    const instance: Instance = await this.stacksService.getServerByShortName(
      uploadXmlFileDTO.server
    );
    const result = await this.secureShellService.prepareApplicationXmlFile(
      xmlFile.buffer,
      { type: 'buffer' },
      uploadXmlFileDTO.deleteXml,
      instance
    );
    this.logger.log(`Completed loading of uploaded file`);
    return result;
  }
}
