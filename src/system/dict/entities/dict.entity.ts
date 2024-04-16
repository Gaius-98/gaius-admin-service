import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('dict')
export class Dict {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  label: string;
  @Column()
  value: string;
  @Column({ name: 'sort_num' })
  sortNum: number;
  @Column()
  desc: string;
  @Column({ name: 'dict_type' })
  dictType: string;
  @Column({ name: 'dict_type_desc' })
  dictTypeDesc: string;
  @Column({ default: 1 })
  status: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
