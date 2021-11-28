import { Test, TestingModule } from '@nestjs/testing';
import { ContentStoreService } from './content-store.service';
import { ContentStoreRepository } from './repositories/content-store/content-store.repository';

describe('ContentStoreService', () => {
  let service: ContentStoreService;
  let repository: ContentStoreRepository;

  beforeEach(async () => {
    service = new ContentStoreService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.createContentStore).toBeDefined();
    expect(service.createOrUpdate).toBeDefined();
  });

  describe('createOrUpdate()', () => {
    it('should find a game and update or create', async () => {
      jest.spyOn(service, 'createOrUpdate');

      const XMLDocument = `
      <client name="prototype">
        <game name="prototype" fixed="false">
          <attribute name="color" implicit="unordered" must-have-allowed="false" skip-allowed="true" type="string" unacceptables-allowed="false">
            <level value="red">
              <language key="description" locale="en">Electric crimson </language>
            </level>
            <language key="description" locale="en">Color is defined as the phenomenon.</language>
          </attribute>
          <resource name="main" value="truechoice/app/clients/prototype/4.2.33/">
            <language key="browserTitle" locale="en">Prototype - MB</language>
          </resource>
        </game>
      </client>  `;
      await service.createOrUpdate('prototype', XMLDocument);
      /*expect(service.createOrUpdate).toBeCalledWith('prototype', XMLDocument);
      expect(service.rootTagFolder).toStrictEqual('truechoice/app/clients/prototype/');
      expect(service.version).toStrictEqual('4.2.33');
      expect(service.baseAttributes).toEqual(
        expect.objectContaining({
          name: 'color',
          implicit: 'unordered',
          key: 'description'
        })
      ); */
    });
  });
});
