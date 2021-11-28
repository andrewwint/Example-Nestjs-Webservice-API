import {
  Injectable,
  Logger,
  Optional,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { NotificationService } from '@truechoice/notification';
import { Instance } from '@truechoice/stacks/interfaces/instance.interface';
import { SsmService } from '@truechoice/ssm';
import { StackRepository } from '@truechoice/stacks/repositories/stack-repository';
import { InstallApplicationDTO } from './dto/install-application.dto';

@Injectable()
export class InstallerService {
  private logger = new Logger(InstallerService.name);
  public shellCommand: string = '';

  constructor(
    private readonly stackRepository: StackRepository,
    private readonly ssmService: SsmService,
    @Optional()
    @Inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  /**@async
   * @description Intsalls a single application onto an instance
   *
   * @param installApplicationDTO
   * @requires instance_id  'i-086708117152e6cc1'
   * @requires environment  'dev', 'staging' , 'production'
   * @requires nodesize  'med', 'large','x-large', 'xx-large'
   * @requires version  '4.4.3'
   * @requires region @ 'us-east-1'
   * @returns string standout or standerr
   */
  async installByInstanceId(installApplicationDTO: InstallApplicationDTO): Promise<string> {
    const { instance_id, environment, region } = installApplicationDTO;
    let instance: Instance = await this.stackRepository.findOne({
      instance_id: instance_id
    });

    this.setShellCommand(instance, installApplicationDTO);

    if (instance) {
      try {
        const output = await this.ssmService.executeShellCommandAndReturnCommandId(
          this.shellCommand,
          instance.instance_id,
          region
        );
        if (output) {
          const logMessage = `Installing ${environment} using ${
            this.shellCommand
          } SSM command ID: ${output.trim()}`;
          this.logger.log(logMessage);
          this.notificationService.createNotification({
            topic: 'server',
            message: logMessage
          });
          return `SSM Command ID: ${output}`;
        }
      } catch (error) {
        throw new NotFoundException(
          this.logger.error(`Tried to install ${environment} using ${this.shellCommand}`, error)
        );
      }
    } else {
      throw new HttpException(`Could not find server ${instance_id}`, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description Generates install command with arguements
   *
   * @param instance
   * @param installApplicationDTO
   * @example `sh /home/ubuntu/load/install.sh production Web large 0.4.20`
   * @return install command
   */
  setShellCommand(instance: Instance, installApplicationDTO: InstallApplicationDTO): string {
    const { environment, nodesize, version } = installApplicationDTO;
    if (instance) {
      this.shellCommand = `sh /home/ubuntu/load/install.sh ${environment} ${instance.servertype} ${nodesize} ${version}`;
    }
    return this.shellCommand;
  }
}
