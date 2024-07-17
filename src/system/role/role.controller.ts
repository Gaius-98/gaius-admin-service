import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.roleService.findAll(params);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Post('update')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.roleService.remove(id);
  }
  @Get('dict')
  get() {
    return this.roleService.findRoleDict();
  }
}
