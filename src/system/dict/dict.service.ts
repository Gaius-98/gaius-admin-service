import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Dict } from './entities/dict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, In, QueryBuilder } from 'typeorm';
import { ApiErrorCode } from 'src/common/model/IHttp';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { SearchDictDto } from './dto/search-dict.dto';
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private dictRepository: Repository<Dict>,
  ) {}
  async create(createDictDto: CreateDictDto) {
    const dict = await this.dictRepository.create(createDictDto);
    try {
      await this.dictRepository.save(dict);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: SearchDictDto) {
    try {
      const { keyword, dictType, pageNumber, pageSize } = params;
      const dictList = await this.dictRepository.findAndCount({
        skip: pageNumber - 1,
        take: pageSize,
        where: {
          label: Like(`%${keyword}%`),
          dictType: dictType || null,
        },
        order: {
          dictType: 'ASC',
        },
      });
      return {
        data: dictList[0],
        total: dictList[1],
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const dict = await this.dictRepository.findOne({
      where: {
        id,
      },
    });
    if (!dict) throw new ApiException('未找到此字典', ApiErrorCode.ERROR_OTHER);
    return dict;
  }

  async update(updateDictDto: UpdateDictDto) {
    try {
      return await this.dictRepository.save(updateDictDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const dict = await this.dictRepository.findOne({
      where: { id },
    });
    if (!dict)
      throw new ApiException(`字典不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.dictRepository.remove(dict);
    return `删除字典成功`;
  }
  async findAllDirectory() {
    try {
      const dictList = await this.dictRepository
        .createQueryBuilder('dict')
        .select('dict.dictType')
        .addSelect('dict.dictTypeDesc')
        .groupBy('dict.dictType')
        .getMany();
      return dictList;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findByTypes(dictTypes: string[]) {
    try {
      const dictList = await this.dictRepository.find({
        select: ['label', 'id', 'dictType'],
        where: {
          dictType: In(dictTypes),
          status: 1,
        },
        order: {
          sortNum: 'ASC',
        },
      });
      const dictObj = {};
      dictTypes.map((dictType) => {
        dictObj[dictType] = dictList.filter((e) => e.dictType == dictType);
      });
      return dictObj;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
