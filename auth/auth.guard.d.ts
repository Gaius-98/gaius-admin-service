import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private jwtSrv;
    private configSrv;
    private reflector;
    constructor(jwtSrv: JwtService, configSrv: ConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    extractTokenFromHeader(request: Request): string;
}
