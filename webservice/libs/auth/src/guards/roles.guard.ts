import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private rolesAllowed: Array<string>) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (this.rolesAllowed && request.user.roles) {
      return this.hasRoleAccess(this.rolesAllowed, request.user.roles);
    }
    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  private hasRoleAccess(rolesAllowed: Array<string>, currentUserRoles: Array<string>): boolean {
    if (Array.isArray(rolesAllowed) && Array.isArray(currentUserRoles)) {
      return rolesAllowed.map((role) => currentUserRoles.includes(role)).includes(true);
    }
  }
}
