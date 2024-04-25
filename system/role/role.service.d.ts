import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import PaginationDto from 'src/common/dto/pagination.dto';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<string>;
    findAll(parmas: PaginationDto): Promise<{
        data: Role[];
        total: number;
    }>;
    findOne(id: string): Promise<Role>;
    update(updateRoleDto: UpdateRoleDto): Promise<{
        roleValue: string;
        id: string;
        roleId?: string;
        roleName?: string;
        desc?: string;
        status?: number;
    } & Role>;
    remove(id: string): Promise<string>;
    findRoleDict(): Promise<Role[]>;
}
