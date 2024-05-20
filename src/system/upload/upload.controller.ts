import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import PaginationDto from 'src/common/dto/pagination.dto';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    return this.uploadService.create(file);
  }

  @Get('list')
  findAll(@Query() params: PaginationDto) {
    return this.uploadService.findAll(params);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.uploadService.remove(id);
  }
}
