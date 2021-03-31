import { User } from "../../users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  roleId: number;

  @Column({type: 'varchar', length: 20, nullable: false})
  roleName: string;

  @Column({type: 'text', nullable: false})
  roleDescription: string;

  @ManyToMany(type => User, user => user.users_roles)
  @JoinColumn()
  roles_users: User[]

  @Column({type: 'varchar', default: 'ACTIVE', length: 8})
  roleStatus: string;

  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt: Date;
}
