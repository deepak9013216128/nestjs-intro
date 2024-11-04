import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardType: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // authTypes from reflector
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    // console.log(authTypes, context.getHandler());

    // array of guards
    const guards = authTypes.map((type) => this.authTypeGuardType[type]).flat();
    // console.log(guards);

    // default error
    const error = new UnauthorizedException();

    // loop guards canActivate
    for (const instance of guards) {
      // console.log('instance', instance);
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => ({
        error: err,
      }));
      // console.log('canActivate', canActivate);
      if (canActivate !== true) {
        throw error;
      }
    }

    return true;
  }
}
