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
import { TemplateService } from 'src/common/template/TemplateService';
import { FormatService } from 'src/common/format/FormatService';
import * as path from 'path';
@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    private templateService: TemplateService,
    private formatService: FormatService,
  ) {}
  async create(createFormDto: CreateFormDto) {
    const form = await this.formRepository.create(createFormDto);
    try {
      await this.formRepository.save(form);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = params;
      const formList = await this.formRepository.findAndCount({
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
  async getAll() {
    try {
      const list = await this.formRepository.find({
        select: ['name', 'id'],
        order: {
          createTime: 'DESC',
        },
      });
      return list;
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
  async getTemplate(id: string) {
    try {
      const { schema } = await this.findOne(id);
      const data = await this.templateService.renderTemplateFromFile(
        path.join(__dirname, '../../../', './static/template/form.ejs'),
        {
          list: schema.formCfgItemList,
          path: path.join(__dirname, '../../../', './static/template/'),
          cfg: schema.formConfig,
        },
      );
      const text = await this.formatService.formatCode(data);
      return text;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
