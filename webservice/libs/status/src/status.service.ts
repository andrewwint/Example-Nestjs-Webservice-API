import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ShellExecService } from '@truechoice/helpers/shell-exec';
import { ShellExecStream } from '@truechoice/helpers/shell-exec/interfaces/shell-exec-streams.interface';

const shellExecService: ShellExecService = new ShellExecService();

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  private async setPemFilePermission(
    shell: ShellExecService = shellExecService
  ): Promise<ShellExecStream> {
    try {
      return await shell.exec(`chmod 400 ${process.env.AWS_PEM_FILE}`);
    } catch (error) {
      this.logger.log(error);
    }
  }
  //changing

  async getListingByDir(
    filePath: string,
    shell: ShellExecService = shellExecService
  ): Promise<string> {
    this.setPemFilePermission();
    const { stdout, stderr } = await shell.exec(`ls -al ${filePath}`);
    this.logger.log(filePath);
    if (stderr) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: stderr
        },
        201
      );
    } else {
      this.logger.log(stdout);
      return stdout;
    }
  }
}
