import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('access_log')
export class AccessLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  ip: string;
  @Column()
  url: string;
  @Column()
  province: string;
  @Column()
  city: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
