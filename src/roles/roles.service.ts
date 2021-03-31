import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from './dto/create-role.dto';
import { ReadRoleDto } from './dto/read-role.dto';
import { RoleRepository } from './roles.repository';
import {Role} from './entities/role.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository
    ){}
  
    
  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole = await this.roleRepository.save(role);
    return plainToClass(ReadRoleDto,savedRole);
  }

  async findAll() {
    const roles: Role[] = await this.roleRepository.find({where: {roleStatus: 'ACTIVE'}, });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }
}
