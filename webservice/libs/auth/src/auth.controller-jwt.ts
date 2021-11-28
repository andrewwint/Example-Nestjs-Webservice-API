import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
  Param,
  Put,
  Patch,
  Delete
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginuser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CreateUserDto } from '@truechoice/users/dto/createuser.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthControllerJwt {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User authentication/login' })
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<Object> {
    return this.authService.login(loginUserDto);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Updates expired authorization token' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  async refreshJwt(@Req() request: Request): Promise<any> {
    return this.authService.refreshJwt(request);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, new RolesGuard(['admin', 'server']))
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<String> {
    return this.authService.createUser(createUserDto);
  }
}
