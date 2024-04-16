import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { SearchDictDto } from './dto/search-dict.dto';
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post('add')
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Get('list')
  findAll(params: SearchDictDto) {
    return this.dictService.findAll(params);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.dictService.findOne(id);
  }

  @Post('update')
  update(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(updateDictDto);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.dictService.remove(id);
  }
  @Get('dictByType')
  findByType(@Query('dictType') dictTypes: string[]) {
    return this.dictService.findByTypes(dictTypes);
  }
  @Get('dictTypeList')
  findDictTypeList() {
    return this.dictService.findAllDirectory();
  }
}
