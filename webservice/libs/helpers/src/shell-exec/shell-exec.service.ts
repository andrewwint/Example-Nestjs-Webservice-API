import { Logger } from '@nestjs/common';
import * as util from 'util';
import { ShellExecStream } from './interfaces/shell-exec-streams.interface';

export class ShellExecService {
  private processor: Function;
  private logger = new Logger(ShellExecService.name);

  constructor(processor = util.promisify(require('child_process').exec)) {
    this.processor = processor;
  }

  /**
   * @description: Wrapper for child_process.exec for executing shell commands
   *
   * @see https://nodejs.org/api/child_process.html
   *
   * @param  {String} comand unix style shell command
   * @returns {Promice<String>} stdout or stderr
   */
  async exec(comand: String): Promise<ShellExecStream> {
    const { stdout, stderr } = await this.processor(comand);

    if (stderr) {
      this.logger.warn(stderr);
    } else {
      this.logger.log(`Executed \`${comand}\` output: ${stdout} ${stderr} `);
    }

    return { stdout: stdout, stderr: stderr };
  }
}
