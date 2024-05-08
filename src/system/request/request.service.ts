import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SearchRequestDto } from './dto/search-request.dto';
import { Request } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from 'src/common/model/IHttp';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { HttpService } from '@nestjs/axios';
import { ParamsItem, Obj } from './model/IRequest';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    private http: HttpService,
  ) {}
  async create(createRequestDto: CreateRequestDto) {
    const request = await this.requestRepository.create(createRequestDto);
    try {
      await this.requestRepository.save(request);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(params: SearchRequestDto) {
    try {
      const { keyword, pageNumber, pageSize, url } = params;
      const list = await this.requestRepository.findAndCount({
        select: ['id', 'status', 'apiName', 'createTime', 'method', 'url'],
        where: {
          apiName: Like(`%${keyword}%`),
          url: Like(`%${url}%`),
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

  async findOne(id: string) {
    try {
      const request = await this.requestRepository.findOne({
        where: {
          id,
        },
      });
      return await request;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateRequestDto: UpdateRequestDto) {
    try {
      return await this.requestRepository.save(updateRequestDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const request = await this.requestRepository.findOne({
      where: { id },
    });
    if (!request)
      throw new ApiException(`API不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.requestRepository.remove(request);
    return `删除API成功`;
  }

  async proxy(id: string) {
    const request = await this.requestRepository.findOne({
      where: { id, status: 1 },
    });
    if (!request)
      throw new ApiException(`API不存在,调用失败`, ApiErrorCode.ERROR_OTHER);
    const { url, method, params, body, headers } = request;
    const requestInfo = {
      url,
      method,
      params: this.transform(params),
      data: this.transform(body),
      headers: this.transform(headers),
    };
    Reflect.deleteProperty(requestInfo, method == 'get' ? 'data' : 'params');
    try {
      const res = await firstValueFrom(this.http.request(requestInfo));
      return res.data;
    } catch (error) {
      throw new ApiException(error, ApiErrorCode.ERROR_OTHER);
    }
  }
  transform(data: ParamsItem[]): Obj {
    const obj: Obj = {};
    data
      .filter((e) => !!e.key)
      .map((item) => {
        obj[item.key] = item.value;
      });
    return obj;
  }
}
