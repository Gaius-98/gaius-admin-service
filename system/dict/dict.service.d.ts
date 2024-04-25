import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { Repository } from 'typeorm';
import { SearchDictDto } from './dto/search-dict.dto';
export declare class DictService {
    private dictRepository;
    constructor(dictRepository: Repository<Dict>);
    create(createDictDto: CreateDictDto): Promise<string>;
    findAll(params: SearchDictDto): Promise<{
        data: Dict[];
        total: number;
    }>;
    findOne(id: string): Promise<Dict>;
    update(updateDictDto: UpdateDictDto): Promise<UpdateDictDto & Dict>;
    remove(id: string): Promise<string>;
    findAllDirectory(): Promise<Dict[]>;
    findByTypes(dictTypes: string[]): Promise<{}>;
}
