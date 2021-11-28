import { Test, TestingModule } from '@nestjs/testing';
import { StacksService } from '@truechoice/stacks';
import { PathDto } from './dto/path.dto';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('Status Controller', () => {
  let controller: StatusController;
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
      controllers: [StatusController],
    }).compile();

    controller = module.get<StatusController>(StatusController);
    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.getListingByDir).toBeDefined();
  });

  describe('getListingByDir',  ()=> {
    it('should list a dir', async() =>{

      const request: PathDto = {
        path: '/usr'
      }

      jest.spyOn(service, 'getListingByDir');

      const result = await controller.getListingByDir(request);
      expect(service.getListingByDir).toHaveBeenCalled();
      expect(service.getListingByDir).toHaveBeenCalledWith(request.path);
    } )
  })
});
