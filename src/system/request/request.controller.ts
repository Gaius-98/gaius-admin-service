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
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SearchRequestDto } from './dto/search-request.dto';
import { Public } from 'src/public/public.decorator';
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('add')
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get('list')
  findAll(@Query() params: SearchRequestDto) {
    return this.requestService.findAll(params);
  }

  @Get('detail')
  findOne(@Query('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Post('update')
  update(@Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(updateRequestDto);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.requestService.remove(id);
  }
  @Public()
  @Get('proxy')
  proxy(@Query('id') id: string) {
    return this.requestService.proxy(id);
  }
}
