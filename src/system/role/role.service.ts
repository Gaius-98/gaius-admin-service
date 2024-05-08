import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/model/IHttp';
import PaginationDto from 'src/common/dto/pagination.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const { roleValue } = createRoleDto;
    const role = await this.roleRepository.create({
      ...createRoleDto,
      roleValue: JSON.stringify(roleValue),
    });
    try {
      await this.roleRepository.save(role);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(parmas: PaginationDto) {
    try {
      const { keyword, pageNumber, pageSize } = parmas;
      const list = await this.roleRepository.findAndCount({
        select: ['id', 'roleId', 'roleName', 'desc', 'createTime', 'status'],
        where: {
          roleName: Like(`%${keyword}%`),
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
      const role = await this.roleRepository.findOne({
        where: {
          id,
        },
      });
      role.roleValue = JSON.parse(role.roleValue);
      return await role;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateRoleDto: UpdateRoleDto) {
    try {
      const { roleValue } = updateRoleDto;
      return await this.roleRepository.save({
        ...updateRoleDto,
        roleValue: JSON.stringify(roleValue),
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    if (!role)
      throw new ApiException(`角色不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.roleRepository.remove(role);
    return `删除角色成功`;
  }
  async findRoleDict() {
    try {
      const list = await this.roleRepository.find({
        select: ['roleId', 'roleName'],
        order: {
          createTime: 'ASC',
        },
        where: {
          status: 1,
        },
      });
      return list;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
