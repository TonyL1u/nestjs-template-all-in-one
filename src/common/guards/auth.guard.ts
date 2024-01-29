import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators';
import { TokenExpiredException } from '../exceptions';
import { extractToken } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const token = extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    let expiredTime: number;
    try {
      const { id, email, exp, name } = await this.jwtService.verifyAsync(token);
      expiredTime = exp * 1000;
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = { id, email, name };
    } catch (error) {
      throw new UnauthorizedException();
    }

    // token 过期
    if (+new Date() > expiredTime) throw new TokenExpiredException('Token is expired.');

    return true;
  }
}
