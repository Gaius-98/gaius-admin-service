import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/public/public.decorator';
import { Skip } from 'src/skip/skip.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto, @Req() req) {
    const captchaCode = req.cookies['admin-captcha'];
    return this.authService.login(loginAuthDto, captchaCode);
  }
  @Public()
  @Get('captcha')
  @Skip()
  getCaptcha(@Res() res) {
    const { text, data } = this.authService.createCaptcha();
    res.cookie('admin-captcha', text);
    res.send(data);
    return;
  }
}
