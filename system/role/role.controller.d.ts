import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import PaginationDto from 'src/common/dto/pagination.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<string>;
    findAll(params: PaginationDto): Promise<{
        data: import("./entities/role.entity").Role[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/role.entity").Role>;
    update(updateRoleDto: UpdateRoleDto): Promise<{
        roleValue: string;
        id: string;
        roleId?: string;
        roleName?: string;
        desc?: string;
        status?: number;
    } & import("./entities/role.entity").Role>;
    remove(id: string): Promise<string>;
    get(): Promise<import("./entities/role.entity").Role[]>;
}
