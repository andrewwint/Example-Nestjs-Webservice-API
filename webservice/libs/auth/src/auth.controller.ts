import { Controller, Post, Get, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth, ApiBasicAuth, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginuser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<Object> {
    return this.authService.login(loginUserDto);
  }
}
