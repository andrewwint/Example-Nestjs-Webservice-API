import {
  Controller,
  Logger,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { XmlLoaderService } from './xml-loader.service';
import { LoadXmlFileDTO } from './dto/load-xml-file.dto';
import { ApiFile } from './decorators/api-file';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadXmlFileDTO } from './dto/upload-xml-file.dto';

@ApiTags('XML Loader')
@Controller('xml-loader')
export class XmlLoaderController {
  private logger = new Logger(XmlLoaderController.name);
  constructor(private readonly xmlLoaderService: XmlLoaderService) {}

  @Post('/batchxml')
  @ApiOperation({ summary: 'Imports a batch of XML files' })
  async loadXmlBatch(@Body() LoadXmlFileDto: LoadXmlFileDTO): Promise<string> {
    this.logger.log(`Importing Single XML file "${LoadXmlFileDto.server}"`);
    return this.xmlLoaderService.loadXmlBatch(LoadXmlFileDto);
  }

  @Get('/:id/:shortname')
  @ApiOperation({ summary: 'Loads a xml file stored in the database' })
  async loadXmlByContentId(
    @Param('id') id: string,
    @Param('shortname') shortname: string
  ): Promise<string> {
    this.logger.log(`Importing from Content Id "${id}" to Server "${shortname}" `);
    return this.xmlLoaderService.loadXmlByContentId(id.trim(), shortname.trim());
  }

  @Post('/xml')
  @ApiOperation({ summary: 'Imports a single XML file' })
  async loadXmlFile(@Body() LoadXmlFileDto: LoadXmlFileDTO): Promise<string> {
    this.logger.log(`Importing Single XML file "${LoadXmlFileDto.server}"`);
    return this.xmlLoaderService.loadXmlFile(LoadXmlFileDto);
  }

  @Post('/upload/:shortname')
  @ApiOperation({ summary: 'Imports a single XML file from a file upload' })
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('xmlFile'))
  async upLoadXmlFile(
    @UploadedFile() xmlFile,
    @Param('shortname') shortname: string,
    @Body('deleteXml') deleteXml: string,
  ): Promise<string> {
      const uploadXmlFileDto: UploadXmlFileDTO = {
        server: shortname.toString().trim(),
        deleteXml: deleteXml
      };
      this.logger.log(`Importing Uploaded file "${xmlFile.originalname}  type: ${xmlFile.mimetype}"`);
      return this.xmlLoaderService.upLoadXmlFile(uploadXmlFileDto, xmlFile);
  }
}
