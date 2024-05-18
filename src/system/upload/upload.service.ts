import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/model/IHttp';
import PaginationDto from 'src/common/dto/pagination.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {}
  async create(createFileDto: CreateUploadDto) {
    const file = await this.uploadRepository.create(createFileDto);
    try {
      await this.uploadRepository.save(file);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = params;
      const list = await this.uploadRepository.findAndCount({
        select: ['id', 'createTime', 'fileName', 'originalName', 'size'],
        where: {
          originalName: Like(`%${keyword}%`),
        },
        order: {
          createTime: 'ASC',
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return {
        data: list[0],
        total: list[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const file = await this.uploadRepository.findOne({
      where: { id },
    });
    if (!file)
      throw new ApiException(`资源不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.uploadRepository.remove(file);
    await this.deleteFile(
      path.join(__dirname, '../../', `./uploads/${file.fileName}`),
    );
    return `删除资源成功`;
  }
  deleteFile(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
}
