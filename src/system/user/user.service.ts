import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/model/IHttp';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (existUser) {
      throw new ApiException('此用户已存在', ApiErrorCode.ERROR_OTHER);
    } else {
      try {
        const user = await this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return '注册成功';
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll(params: SearchUserDto) {
    const { pageNumber, pageSize, keyword } = params;
    try {
      return await this.userRepository.findAndCount({
        select: [
          'avatar',
          'email',
          'username',
          'name',
          'role',
          'salt',
          'createTime',
        ],
        skip: pageNumber - 1,
        take: pageSize,
        where: {
          username: Like(`%${keyword}%`),
        },
        order: {
          createTime: 'ASC',
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      select: [
        'avatar',
        'email',
        'username',
        'name',
        'role',
        'salt',
        'createTime',
        'password',
      ],
      where: { username },
    });

    if (!user) throw new ApiException('用户名不存在', ApiErrorCode.ERROR_OTHER);
    return user;
  }
  async getUserInfo(username: string) {
    const user = await this.findOne(username);
    if (!user) throw new ApiException('用户名不存在', ApiErrorCode.ERROR_OTHER);
    delete user.password;
    return user;
  }
  async update(updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.save(updateUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user)
      throw new ApiException(
        `用户[${username}]不存在,删除失败`,
        ApiErrorCode.ERROR_OTHER,
      );
    return `删除用户[${username}]成功`;
  }
}
