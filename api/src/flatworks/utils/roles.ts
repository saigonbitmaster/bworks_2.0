import { SetMetadata } from '@nestjs/common';

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const ROLES_KEY = 'roles';

enum Role {
  User = 'user',
  Admin = 'admin',
}

const Roles = (...roles: Role[]) => {
  console.log('role decorator added roles', roles);
  return SetMetadata(ROLES_KEY, roles);
};

@Injectable()
class RolesGuard implements CanActivate {
  //extract role from decorator & compare with role from user access token, return true to process return false to reject.
  //can be deploy as controller (all methods) or method level
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      //return true;  -> process all request regardless it has Role decorator or not
      return false; //-> process only request with Role decorator
    }
    console.log('requiredRoles', requiredRoles);
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

export { RolesGuard, Roles, Role };
