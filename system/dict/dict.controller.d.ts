import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { SearchDictDto } from './dto/search-dict.dto';
export declare class DictController {
    private readonly dictService;
    constructor(dictService: DictService);
    create(createDictDto: CreateDictDto): Promise<string>;
    findAll(params: SearchDictDto): Promise<{
        data: import("./entities/dict.entity").Dict[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/dict.entity").Dict>;
    update(updateDictDto: UpdateDictDto): Promise<UpdateDictDto & import("./entities/dict.entity").Dict>;
    remove(id: string): Promise<string>;
    findByType(dictTypes: string[]): Promise<{}>;
    findDictTypeList(): Promise<import("./entities/dict.entity").Dict[]>;
}
