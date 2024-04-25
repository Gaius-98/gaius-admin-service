import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: CreateMenuDto): Promise<string>;
    findAll(keyword: string): Promise<import("./entities/menu.entity").Menu[]>;
    findOne(id: string): Promise<import("./entities/menu.entity").Menu>;
    update(updateMenuDto: UpdateMenuDto): Promise<UpdateMenuDto & import("./entities/menu.entity").Menu>;
    remove(id: string): Promise<string>;
    getAllDirectory(): Promise<import("./entities/menu.entity").Menu[]>;
}
