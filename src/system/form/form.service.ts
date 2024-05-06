import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiErrorCode } from 'src/common/model/IHttp';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { HttpException, HttpStatus } from '@nestjs/common';
import PaginationDto from 'src/common/dto/pagination.dto';
@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}
  async create(createFormDto: CreateFormDto) {
    const dict = await this.formRepository.create(createFormDto);
    try {
      await this.formRepository.save(dict);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = params;
      const formList = await this.formRepository.findAndCount({
        skip: pageNumber - 1,
        take: pageSize,
        where: {
          name: Like(`%${keyword}%`),
        },
        order: {
          createTime: 'ASC',
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
    const form = await this.formRepository.findOne({
      where: {
        id,
      },
    });
    if (!form) throw new ApiException('未找到此表单', ApiErrorCode.ERROR_OTHER);
    return form;
  }

  async update(updateFormDto: UpdateFormDto) {
    try {
      return await this.formRepository.save(updateFormDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const form = await this.formRepository.findOne({
      where: { id },
    });
    if (!form)
      throw new ApiException(`表单不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.formRepository.remove(form);
    return `删除表单成功`;
  }
}
