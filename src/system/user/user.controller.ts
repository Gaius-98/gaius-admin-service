import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
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
  getUserInfo(@Query('username') username: string) {
    return this.userService.getUserInfo(username);
  }
  @Post('update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
  @Get('delete')
  deleteUser(@Query('username') username: string) {
    return this.userService.remove(username);
  }
  @Get('list')
  getUserList(@Query() params: SearchUserDto) {
    return this.userService.findAll(params);
  }
}
