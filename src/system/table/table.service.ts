import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiErrorCode } from 'src/common/model/IHttp';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { HttpException, HttpStatus } from '@nestjs/common';
import PaginationDto from 'src/common/dto/pagination.dto';
import { Table } from './entities/table.entity';
@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}
  async create(createTableDto: CreateTableDto) {
    const form = await this.tableRepository.create(createTableDto);
    try {
      await this.tableRepository.save(form);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = params;
      const formList = await this.tableRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {
          name: Like(`%${keyword}%`),
        },
        order: {
          createTime: 'DESC',
        },
      });
      return {
        data: formList[0],
        total: formList[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const form = await this.tableRepository.findOne({
      where: {
        id,
      },
    });
    if (!form) throw new ApiException('未找到此表格', ApiErrorCode.ERROR_OTHER);
    return form;
  }

  async update(updateTableDto: UpdateTableDto) {
    try {
      return await this.tableRepository.save(updateTableDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const form = await this.tableRepository.findOne({
      where: { id },
    });
    if (!form)
      throw new ApiException(`表格不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.tableRepository.remove(form);
    return `删除表格成功`;
  }
}
