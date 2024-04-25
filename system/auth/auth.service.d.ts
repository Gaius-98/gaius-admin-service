import { LoginAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as svgCaptcha from 'svg-captcha';
export declare class AuthService {
    private userSrv;
    private jwtSrv;
    private configSrv;
    constructor(userSrv: UserService, jwtSrv: JwtService, configSrv: ConfigService);
    login(loginAuthDto: LoginAuthDto, captchaCode: string): Promise<string>;
    createCaptcha(): svgCaptcha.CaptchaObj;
}
