import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'role_id' })
  roleId: string;
  @Column({ name: 'role_name' })
  roleName: string;
  @Column({ name: 'role_value' })
  roleValue: string;
  @Column({ nullable: true })
  desc: string;
  @Column({ default: 1 })
  status: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_time',
  })
  createTime: Date;
}
