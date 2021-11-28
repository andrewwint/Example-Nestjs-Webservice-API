import { SsmService } from './ssm.service';

describe('SsmService', () => {
  let service: SsmService;

  beforeAll(() => {
    service = new SsmService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.executeShellCommandOnServer).toBeDefined();
    expect(service.getCommandOutput).toBeDefined();
    expect(service.getCommandStatus).toBeDefined();
  });

  it('should contain an executeShellCommandOnServer method which returns the comand ID of the SSM command', async () => {
    const mockResponse = '4d7aeb85-6d1c-425d-9c05-d2325cda23b8';
    expect.assertions(2);
    const command = 'echo hello world';
    jest
      .spyOn(service, 'executeShellCommandOnServer')
      .mockImplementation(() => Promise.resolve(mockResponse));

    const result = await service.executeShellCommandOnServer(
      command,
      'i-123456789',
    );
    expect(service.executeShellCommandOnServer).toHaveBeenCalledWith(
      command,
      'i-123456789',
    );
    expect(result).toBe(mockResponse);
  });

  it('should contain a getCommandStatus method which returns the status of a command', () => {
    expect.assertions(2);
    const commandId = '4d7aeb85-6d1c-425d-9c05-d2325cda23b8';
    const mockResponse = 'Success';
    jest
      .spyOn(service, 'getCommandStatus')
      .mockImplementation(() => Promise.resolve(mockResponse));
    return service.getCommandStatus(commandId).then(result => {
      expect(service.getCommandStatus).toHaveBeenCalledWith(commandId);
      expect(result).toBe(mockResponse);
    });
  });

  it('should contain a getCommandOutput method which returns the output of a command executed on the server', () => {
    expect.assertions(1);
    const commandId = '4d7aeb85-6d1c-425d-9c05-d2325cda23b8';
    const mockResponse = 'hello world';
    jest
      .spyOn(service, 'getCommandOutput')
      .mockImplementation(() => Promise.resolve(mockResponse));
    return expect(service.getCommandOutput(commandId)).resolves.toBe(
      mockResponse,
    );
  });

  it('should execute a command, check the status until not pending, and return the result of the command', () => {
    expect.assertions(4);

    jest
      .spyOn(service, 'executeShellCommandAndReturnOutput')
      .mockImplementation(async (command, instanceId, region) => {
        jest
          .spyOn(service, 'executeShellCommandOnServer')
          .mockImplementation(() =>
            Promise.resolve('4d7aeb85-6d1c-425d-9c05-d2325cda23b8'),
          );
        jest
          .spyOn(service, 'getCommandStatus')
          .mockImplementation(() => Promise.resolve('Success'));
        jest
          .spyOn(service, 'getCommandOutput')
          .mockImplementation(() => Promise.resolve('hello world'));
        const commandId = await service.executeShellCommandOnServer(
          command,
          instanceId,
        );
        let commandStatus = await service.getCommandStatus(commandId);
        while (commandStatus == 'Pending' || commandStatus == 'InProgress') {
          commandStatus = await service.getCommandStatus(commandId);
        }
        return await service.getCommandOutput(command);
      });

    return service
      .executeShellCommandAndReturnOutput(
        'echo hello world',
        'i-123456',
        'us-west-2',
      )
      .then(result => {
        expect(result).toBe('hello world');
        expect(service.executeShellCommandOnServer).toHaveBeenCalled();
        expect(service.getCommandStatus).toHaveBeenCalled();
        expect(service.getCommandOutput).toHaveBeenCalled();
      });
  });
});
