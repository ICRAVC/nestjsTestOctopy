import { Role } from "../../roles/entities/role.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({type: 'varchar', unique: true, length:25, nullable: false})
  userName: string;

  @Column({type: 'varchar', nullable: false})
  userEmail: string;

  @Column({type: 'varchar', nullable: false})
  userPassword: string;

  @ManyToMany(type => Role, role => role.roles_users, {eager: true})
  @JoinTable({name: 'users_roles'})
  users_roles: Role[];

  @Column({type: 'varchar', default: 'ACTIVE', length: 8})
  status: string;

  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt: Date;
}
