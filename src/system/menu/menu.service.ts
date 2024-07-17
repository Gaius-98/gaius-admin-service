import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/model/IHttp';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
interface MenuItem {
  id: string;
  label: string;
  pid?: string;
  desc?: string;
  icon?: string;
  sortNum: number;
  type: 'table' | 'page' | 'front' | 'form';
  openType: '_blank' | '_self';
  children?: MenuItem[];
  address?: string;
  menuType: 'app' | 'directory';
}
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    private roleService: RoleService,
    private userService: UserService,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.create(createMenuDto);
    try {
      await this.menuRepository.save(menu);
      return '添加成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(keyword: string, username: string) {
    try {
      const userInfo = await this.userService.findOne(username);
      let roleList;
      if (userInfo) {
        roleList = await this.roleService.findOneByRoleId(userInfo.roleId);
        roleList = roleList.roleValue;
      }
      let menuList = await this.menuRepository.find({
        where: {
          label: Like(`%${keyword}%`),
        },
        order: {
          sortNum: 'ASC',
        },
      });
      menuList = menuList.filter((menu) => {
        return roleList.includes(menu.id);
      });
      if (keyword) {
        return menuList;
      } else {
        return this.buildMenuTree(menuList as MenuItem[], null) as Menu[];
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const menu = await this.menuRepository.findOne({
      where: {
        id,
      },
    });
    if (!menu) throw new ApiException('未找到此菜单', ApiErrorCode.ERROR_OTHER);
    return menu;
  }

  async update(updateMenuDto: UpdateMenuDto) {
    try {
      return await this.menuRepository.save(updateMenuDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const menu = await this.menuRepository.findOne({
      where: { id },
    });
    if (!menu)
      throw new ApiException(`菜单不存在,删除失败`, ApiErrorCode.ERROR_OTHER);
    await this.menuRepository.remove(menu);
    return `删除菜单成功`;
  }
  async findAllDirectory() {
    try {
      const menuList = await this.menuRepository.find({
        select: ['label', 'id', 'pid'],
        where: {
          menuType: 'directory',
        },
        order: {
          sortNum: 'ASC',
        },
      });
      return this.buildMenuTree(menuList as MenuItem[], null) as Menu[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAllMenu() {
    try {
      const menuList = await this.menuRepository.find({
        select: ['label', 'id', 'pid'],
        order: {
          sortNum: 'ASC',
        },
      });
      return this.buildMenuTree(menuList as MenuItem[], null) as Menu[];
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  buildMenuTree(menuList: MenuItem[], parentId: string | null) {
    const tree: MenuItem[] = [];
    menuList
      .filter((menu) => {
        if (!parentId) {
          return !menu.pid;
        } else {
          return menu.pid === parentId;
        }
      })
      .forEach((menu) => {
        const children = this.buildMenuTree(menuList, menu.id);
        if (children.length > 0) {
          menu.children = children;
        }
        tree.push(menu);
      });
    tree.sort((a, b) => a.sortNum - b.sortNum);
    return tree;
  }
}
