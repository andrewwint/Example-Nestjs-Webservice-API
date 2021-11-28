import { Body, Controller, Get, Logger, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PathDto } from './dto/path.dto';
import { StatusService } from './status.service';

@ApiTags('Docker Container Health')
@Controller('status')
export class StatusController {
    private readonly logger = new Logger(StatusController.name);
    constructor(private readonly statusService: StatusService) {}

    @Post('/path')
    async getListingByDir(@Body(ValidationPipe) pathDto: PathDto ): Promise<string>{
        return await this.statusService.getListingByDir(pathDto.path);
    }
}
