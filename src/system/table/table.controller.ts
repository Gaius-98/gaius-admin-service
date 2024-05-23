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
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('add')
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.tableService.findAll(params);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.tableService.findOne(id);
  }

  @Post('update')
  update(@Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(updateTableDto);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.tableService.remove(id);
  }
}
