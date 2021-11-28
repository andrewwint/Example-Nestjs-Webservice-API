import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule, UsersService } from '@truechoice/users';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthControllerLocal } from './auth.controller-local';
import { AuthControllerJwt } from './auth.controller-jwt';
import { AuthControllerJwtExample } from './examples/auth.controller-jwt-example';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthJwtExampleService } from './examples/auth-jwt-example.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    AuthJwtExampleService
  ],
  controllers: [AuthController, AuthControllerLocal, AuthControllerJwt, AuthControllerJwtExample],
  exports: [AuthService]
})
export class AuthModule {}
