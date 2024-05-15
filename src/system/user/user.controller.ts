import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Public } from 'src/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get('detail')
  getDetail(@Query('username') username: string) {
    return this.userService.getDetail(username);
  }

  @Get('userInfo')
  getUserInfo(@Req() req) {
    return this.userService.getDetail(req.username);
  }
  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
  @Get('remove')
  remove(@Query('username') username: string) {
    return this.userService.remove(username);
  }
  @Get('list')
  getUserList(@Query() params: SearchUserDto) {
    return this.userService.findAll(params);
  }
}
