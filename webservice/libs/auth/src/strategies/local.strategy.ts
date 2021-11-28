import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '@truechoice/users';
import { ValidateUserDto } from '@truechoice/users/dto/validateuser.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const request: ValidateUserDto = this.getValidateUserDto(username, password);
    const user = await this.usersService.validateUser(request);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private getValidateUserDto(username: string, password: string): ValidateUserDto {
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    let isApiKey = pattern.exec(password);

    const request: ValidateUserDto = {
      username,
      password
    };

    if (isApiKey) {
      request.apikey = password;
      delete request.password;
    }
    return request;
  }
}
