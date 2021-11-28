import { ShellExec } from './shell-exec';

let shell: ShellExec;
let shellMock: ShellExec;

beforeEach(async () => {
  shell = new ShellExec();
  const mockExec = () => {
    return {
      stdout: 'Successfull Login',
      stderr: 'ssh: connect to host test.com port 22: Connection timed out',
    };
  };
  shellMock = new ShellExec(mockExec);
});

describe('ShellExec', () => {
  it('should be defined', () => {
    expect(new ShellExec()).toBeDefined();
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
