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
  async getTemplate() {
    const test = [
      {
        type: 'grid',
        controlProp: {
          gutter: 0,
          colNumber: 2,
          children: [
            [
              {
                formItemProp: {
                  label: 'field8809',
                  name: 'field8809',
                  required: false,
                },
                controlProp: {
                  allowClear: true,
                  bordered: true,
                  disabled: false,
                  maxlength: null,
                  size: 'middle',
                },
                type: 'input',
                id: '1714997238809',
              },
            ],
            [
              {
                formItemProp: {
                  label: 'field9678',
                  name: 'field9678',
                  required: false,
                },
                controlProp: {
                  allowClear: true,
                  bordered: true,
                  disabled: false,
                  mode: null,
                  size: 'middle',
                  virtual: true,
                },
                type: 'select',
                id: '1714997239678',
              },
            ],
          ],
        },
        id: '1714997236070',
      },
      {
        type: 'card',
        controlProp: {
          title: '',
          bordered: true,
          hoverable: false,
          children: [
            {
              formItemProp: {
                label: 'field9901',
                name: 'field9901',
                required: false,
              },
              controlProp: {
                allowClear: true,
                bordered: true,
                disabled: false,
                maxlength: null,
                size: 'middle',
              },
              type: 'input',
              id: '1714997359901',
            },
          ],
        },
        id: '1714997358477',
      },
      {
        formItemProp: {
          label: 'field6501',
          name: 'field6501',
          required: false,
        },
        controlProp: {
          allowClear: true,
          bordered: true,
          disabled: false,
          maxlength: null,
          size: 'middle',
        },
        type: 'input',
        id: '1714997516501',
      },
      {
        formItemProp: {
          label: 'field7214',
          name: 'field7214',
          required: false,
        },
        controlProp: {
          allowClear: true,
          bordered: true,
          disabled: false,
          mode: null,
          size: 'middle',
          virtual: true,
        },
        type: 'select',
        id: '1714997517214',
      },
      {
        formItemProp: {
          label: 'field7901',
          name: 'field7901',
          required: false,
        },
        controlProp: {
          disabled: false,
          size: 'middle',
          bordered: true,
          controls: true,
          max: null,
          min: null,
          precision: null,
          step: 1,
        },
        type: 'number',
        id: '1714997517901',
      },
      {
        formItemProp: {
          label: 'field8478',
          name: 'field8478',
          required: false,
        },
        controlProp: {
          disabled: false,
          size: 'middle',
          buttonStyle: 'solid',
          optionType: 'button',
        },
        type: 'radio',
        id: '1714997518478',
      },
      {
        formItemProp: {
          label: 'field9108',
          name: 'field9108',
          required: false,
        },
        controlProp: {
          disabled: false,
        },
        type: 'checkbox',
        id: '1714997519108',
      },
    ];
    const data = await this.templateService.renderTemplateFromFile(
      path.join(__dirname, '../../../', './static/template/form.ejs'),
      {
        list: test,
        path: path.join(__dirname, '../../../', './static/template/'),
      },
    );
    const text = await this.formatService.formatCode(data);
    console.log(text);
    return text;
  }
}
