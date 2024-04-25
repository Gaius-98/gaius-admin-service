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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("./entities/role.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const api_exception_1 = require("../../common/filter/http-exception/api.exception");
const IHttp_1 = require("../../common/model/IHttp");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(createRoleDto) {
        const { roleValue } = createRoleDto;
        const role = await this.roleRepository.create({
            ...createRoleDto,
            roleValue: JSON.stringify(roleValue),
        });
        try {
            await this.roleRepository.save(role);
            return '添加成功';
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(parmas) {
        try {
            const { keyword, pageNumber, pageSize } = parmas;
            const list = await this.roleRepository.findAndCount({
                select: ['id', 'roleId', 'roleName', 'desc', 'createTime', 'status'],
                where: {
                    roleName: (0, typeorm_2.Like)(`%${keyword}%`),
                },
                order: {
                    createTime: 'ASC',
                },
                skip: pageNumber - 1,
                take: pageSize,
            });
            return {
                data: list[0],
                total: list[1],
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const role = await this.roleRepository.findOne({
                where: {
                    id,
                },
            });
            role.roleValue = JSON.parse(role.roleValue);
            return await role;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(updateRoleDto) {
        try {
            const { roleValue } = updateRoleDto;
            return await this.roleRepository.save({
                ...updateRoleDto,
                roleValue: JSON.stringify(roleValue),
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
        });
        if (!role)
            throw new api_exception_1.ApiException(`角色不存在,删除失败`, IHttp_1.ApiErrorCode.ERROR_OTHER);
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
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map