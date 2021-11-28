import { XmlLoaderService } from './xml-loader.service';
import { StacksService } from '@truechoice/stacks';
import { SecureShellService } from './secure-shell/secure-shell.service';

describe('XmlLoaderService', () => {
  let service: XmlLoaderService;
  let stacks: StacksService;
  let shell: SecureShellService;

  beforeEach(async () => {
    service = new XmlLoaderService(stacks, shell);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.deleteXml).toBeUndefined();
    expect(service.loadXmlBatch).toBeDefined();
    expect(service.loadXmlByContentId).toBeDefined();
    expect(service.loadXmlFile).toBeDefined();
    expect(service.upLoadXmlFile).toBeDefined();
  });
});
