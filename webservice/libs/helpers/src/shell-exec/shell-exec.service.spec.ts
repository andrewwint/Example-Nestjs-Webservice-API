import { ShellExecService } from './shell-exec.service';

let shell: ShellExecService;
let shellMock: ShellExecService;

beforeEach(async () => {
  shell = new ShellExecService();
  const mockExec = () => {
    return {
      stdout: 'Successfull Login',
      stderr: 'ssh: connect to host test.com port 22: Connection timed out'
    };
  };
  shellMock = new ShellExecService(mockExec);
});

describe('ShellExec', () => {
  it('should be defined', () => {
    expect(new ShellExecService()).toBeDefined();
    expect(shell.exec).toBeDefined();
  });
});

describe('Shell', () => {
  it('should successed', async () => {
    jest.spyOn(shellMock, 'exec');
    const command = 'ssh -o ConnectTimeout=1 -T testmoch@test.com';
    const { stdout, stderr } = await shellMock.exec(command);
    expect(shellMock.exec).toBeCalledWith(command);
    expect(stdout).toMatch(/Successfull Login/);
  });

  it('should fail', async () => {
    jest.spyOn(shellMock, 'exec');
    const command = 'ssh -o ConnectTimeout=1 -T testmoch@test.com';
    const { stdout, stderr } = await shellMock.exec(command);
    expect(shellMock.exec).toBeCalledWith(command);
    expect(stderr).toMatch(/ssh: connect to host test.com port 22:/);
  });
});
