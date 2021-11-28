import { Controller, Post, Get, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth, ApiBasicAuth, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginuser.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserLocalDto } from './dto/loginuser-local.dto';
import { ExampleDataDto } from './examples/example-data.dto';

@ApiTags('Authentication')
@UseGuards(LocalAuthGuard)
@Controller('auth/local')
export class AuthControllerLocal {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginUserLocalDto })
  @Post('/access-test')
  register(@Body() exampleDataDto: ExampleDataDto): any {
    return this.authService.exampleAllRequest(exampleDataDto);
  }
}
