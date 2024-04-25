import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
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
export declare class MenuService {
    private menuRepository;
    constructor(menuRepository: Repository<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<string>;
    findAll(keyword: string): Promise<Menu[]>;
    findOne(id: string): Promise<Menu>;
    update(updateMenuDto: UpdateMenuDto): Promise<UpdateMenuDto & Menu>;
    remove(id: string): Promise<string>;
    findAllDirectory(): Promise<Menu[]>;
    buildMenuTree(menuList: MenuItem[], parentId: string | null): MenuItem[];
}
export {};
