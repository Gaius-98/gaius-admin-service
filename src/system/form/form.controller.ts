import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
import { Public } from 'src/public/public.decorator';
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('add')
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.formService.findAll(params);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.formService.findOne(id);
  }

  @Post('update')
  update(@Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(updateFormDto);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.formService.remove(id);
  }
  @Public()
  @Get('template')
  getTemplate(@Query('id') id: string) {
    return this.formService.getTemplate(id);
  }
}
