import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('form')
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ default: 1 })
  status: number;
  @Column({ type: 'json' })
  schema: any;
  @Column({ nullable: true })
  description: string;
  @Column({ type: 'text' })
  img: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
