"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const menu_entity_1 = require("./entities/menu.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const api_exception_1 = require("../../common/filter/http-exception/api.exception");
const IHttp_1 = require("../../common/model/IHttp");
let MenuService = class MenuService {
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async create(createMenuDto) {
        const menu = await this.menuRepository.create(createMenuDto);
        try {
            await this.menuRepository.save(menu);
            return '添加成功';
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(keyword) {
        try {
            const menuList = await this.menuRepository.find({
                where: {
                    label: (0, typeorm_2.Like)(`%${keyword}%`),
                },
                order: {
                    sortNum: 'ASC',
                },
            });
            if (keyword) {
                return menuList;
            }
            else {
                return this.buildMenuTree(menuList, null);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const menu = await this.menuRepository.findOne({
            where: {
                id,
            },
        });
        if (!menu)
            throw new api_exception_1.ApiException('未找到此菜单', IHttp_1.ApiErrorCode.ERROR_OTHER);
        return menu;
    }
    async update(updateMenuDto) {
        try {
            return await this.menuRepository.save(updateMenuDto);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const menu = await this.menuRepository.findOne({
            where: { id },
        });
        if (!menu)
            throw new api_exception_1.ApiException(`菜单不存在,删除失败`, IHttp_1.ApiErrorCode.ERROR_OTHER);
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
            return this.buildMenuTree(menuList, null);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    buildMenuTree(menuList, parentId) {
        const tree = [];
        menuList
            .filter((menu) => {
            if (!parentId) {
                return !menu.pid;
            }
            else {
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
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenuService);
//# sourceMappingURL=menu.service.js.map