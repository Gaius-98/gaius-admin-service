import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtSrv: JwtService,
    private configSrv: ConfigService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      //即将调用的方法
      context.getHandler(),
      //controller类型
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new HttpException('验证不通过', HttpStatus.FORBIDDEN);
    try {
      const payload = await this.jwtSrv.verifyAsync(token, {
        secret: this.configSrv.get('JWT_SECRET'),
      });

      request['username'] = payload.username;
    } catch (error) {
      throw new HttpException(
        `token验证失败,原因:${error}`,
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
  extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
