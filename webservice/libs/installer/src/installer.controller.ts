import { Controller, Logger, Get, UseGuards, Param } from '@nestjs/common';
import { InstallerService } from './installer.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '@truechoice/auth/guards/roles.guard';
import { JwtAuthGuard } from '@truechoice/auth/guards/jwt-auth.guard';
import { InstallApplicationDTO } from './dto/install-application.dto';

@ApiTags('Installer - Backend Application Installer (JWT Protected)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
@Controller('installer')
export class InstallerController {
  private logger = new Logger(InstallerController.name);

  constructor(private readonly installerService: InstallerService) {}

  /**
   * @param  {String} instance_id
   * @param  {String} environment
   * @param  {String} nodesize
   * @returns Promise
   */
  @Get('/:instance_id/:environment/:nodesize/:version/:region')
  @ApiOperation({ summary: 'Install the backend onto a target server ' })
  installByInstanceId(
    @Param('instance_id') instance_id: string,
    @Param('environment') environment: string,
    @Param('nodesize') nodesize: string,
    @Param('version') version: string,
    @Param('region') region: string
  ): Promise<string> {
    const installApplicationDTO: InstallApplicationDTO = {
      instance_id: instance_id.trim(),
      environment: environment.trim(),
      nodesize: nodesize.trim(),
      version: version.trim(),
      region: region.trim()
    };
    this.logger.log(`Installing "${environment}" for instance "${instance_id}" `);

    return this.installerService.installByInstanceId(installApplicationDTO);
  }
}
