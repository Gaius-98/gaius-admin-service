import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  @Get('list')
  findAll(@Query('keyword') keyword: string, @Req() req: any) {
    return this.menuService.findAll(keyword, req.username);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Post('update')
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.menuService.remove(id);
  }
  @Get('directory')
  getAllDirectory() {
    return this.menuService.findAllDirectory();
  }

  @Get('all')
  getAllMenu() {
    return this.menuService.findAllMenu();
  }
}
