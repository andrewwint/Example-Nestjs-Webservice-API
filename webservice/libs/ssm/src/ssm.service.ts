import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SsmService {
  private ssm = new AWS.SSM({ region: process.env.AWS_REGION });

  /**
   * @description Executes a shell command on a server using AWS SSM and returns
   *              the output of the command.
   * @param command - the command to execute on the server.
   * @param instanceId - the instance ID of the server to execute the command on.
   * @param serverRegion - the AWS region of the server (e.g. 'us-east-2').
   * @return the output of the command.
   */
  async executeShellCommandAndReturnOutput(
    command: string,
    instanceId: string,
    serverRegion: string,
  ): Promise<string> {
    this.ssm = new AWS.SSM({ region: serverRegion });

    const commandId = await this.executeShellCommandOnServer(
      command,
      instanceId,
    );

    let commandStatus = await this.getCommandStatus(commandId);
    while (
      commandStatus == 'Pending' ||
      commandStatus == 'InProgress' ||
      commandStatus == null
    ) {
      console.log(`Command status: ${commandStatus}, retrying in 2s`);
      await new Promise(r => setTimeout(r, 2000));
      commandStatus = await this.getCommandStatus(commandId);
    }
    return await this.getCommandOutput(commandId);
  }

  /**
   * @description Executes a shell command on a server using AWS SSM and returns
   *              the output of the command.
   * @param command - the command to execute on the server.
   * @param instanceId - the instance ID of the server to execute the command on.
   * @param serverRegion - the AWS region of the server (e.g. 'us-east-2').
   * @return the output of the command.
   */
  async executeShellCommandAndReturnCommandId(
    command: string,
    instanceId: string,
    serverRegion: string,
  ): Promise<string> {
    this.ssm = new AWS.SSM({ region: serverRegion });

    const commandId = await this.executeShellCommandOnServer(
      command,
      instanceId,
    );
    return commandId;
  }

  /**
   * @description Executes a shell command on a server using AWS SSM and returns
   *              the command ID from the AWS Request result.
   * @param command - the command to execute on the server.
   * @param instanceId - the instance ID of the server to execute the command on.
   * @return the command ID.
   */
  executeShellCommandOnServer(
    command: string,
    instanceId: string,
  ): Promise<string> {
    const params = this.getParametersForSendCommand(command, instanceId);

    return new Promise((resolve, reject) => {
      this.ssm.sendCommand(params, (err, data) => {
        if (err) reject(err); // an error occurred
        resolve(data.Command.CommandId);
      });
    });
  }

  /**
   * @description Retrieves the output from an executed AWS SSM command based on the
   *              command ID.
   * @param commandId - the command ID of the command to retrieve the output for.
   * @return the output of the command executed on the server.
   */
  getCommandOutput(commandId: string): Promise<string> {
    const params = {
      CommandId: commandId,
      Details: true,
    };

    return new Promise((resolve, reject) => {
      this.ssm.listCommandInvocations(params, (err, data) => {
        if (err) reject(err);
        const status = data.CommandInvocations[0].CommandPlugins[0].Status;
        const output = data.CommandInvocations[0].CommandPlugins[0].Output;
        if (status == 'Failed') reject(`${status}: ${output}`);
        resolve(output);
      });
    });
  }

  /**
   * @description Retrieves the status of a command executed on the server using AWS SSM
   *              send-command.
   * @param commandId - the command ID of the command to retrieve the status for.
   * @return the status of the command (e.g. 'Pending', 'Success', 'Failed')
   */
  getCommandStatus(commandId: string): Promise<string> {
    const params = {
      CommandId: commandId,
    };

    return new Promise((resolve, reject) => {
      this.ssm.listCommands(params, (err, data) => {
        if (err) reject(err);
        if (data) {
          resolve(data.Commands[0].Status);
        }
        resolve(null);
      });
    });
  }

  /**
   * @description Constructs the parameter object to be sent with the AWS SSM
   *              send-command operation.
   * @see {@link https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html#sendCommand-property}
   * @param command - the command to execute on the server.
   * @param instanceId - the instance ID to execute the command on.
   * @return the parameters to pass to the sendCommand() function.
   */
  getParametersForSendCommand(command: string, instanceId: string): any {
    return {
      DocumentName: 'AWS-RunShellScript',
      InstanceIds: [instanceId],
      Parameters: {
        commands: [command],
      },
    };
  }
}
