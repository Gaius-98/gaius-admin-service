import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 32 })
  label: string;
  @Column({ name: 'parent_id', nullable: true })
  pid: string;
  @Column({ name: 'menu_type' })
  menuType: string;
  @Column({ name: 'route_address', nullable: true })
  address: string;
  @Column({ nullable: true })
  desc: string;
  @Column({ nullable: true })
  icon: string;
  @Column({ name: 'sort_num' })
  sortNum: number;
  @Column()
  type: string;
  @Column()
  openType: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
