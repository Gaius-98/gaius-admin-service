import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/model/IHttp';
import encrypt from 'src/utils/encrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class AuthService {
  constructor(
    private userSrv: UserService,
    private jwtSrv: JwtService,
    private configSrv: ConfigService,
  ) {}
  async login(loginAuthDto: LoginAuthDto, captchaCode: string) {
    const { username, password, captcha } = loginAuthDto;
    const user = await this.userSrv.findOne(username);
    console.log(captchaCode, captcha);
    if (captchaCode == captcha) {
      if (user) {
        const { salt, password: realPassword } = user;
        if (realPassword == encrypt(password, salt)) {
          try {
            return await this.jwtSrv.signAsync(
              { username },
              {
                secret: this.configSrv.get('JWT_SECRET'),
              },
            );
          } catch (error) {
            throw new ApiException(error, ApiErrorCode.ERROR_OTHER);
          }
        } else {
          throw new ApiException('密码错误', ApiErrorCode.ERROR_OTHER);
        }
      } else {
        throw new ApiException('此用户不存在', ApiErrorCode.ERROR_OTHER);
      }
    } else {
      throw new ApiException('验证码错误', ApiErrorCode.ERROR_OTHER);
    }
  }
  createCaptcha() {
    return svgCaptcha.createMathExpr({
      size: 4,
      noise: 0,
      width: 80,
      height: 28,
      fontSize: 35,
    });
  }
}
