import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('table')
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ default: 1 })
  status: number;
  @Column({ type: 'json' })
  columns: any;
  @Column({ type: 'json' })
  global: any;
  @Column({ type: 'json' })
  dataSource: any;
  @Column({ type: 'json' })
  variablePool: any;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
  @Column({ nullable: true })
  description: string;
}
