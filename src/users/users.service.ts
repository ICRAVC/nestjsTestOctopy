import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from 'src/roles/roles.repository';
import { MoreThan } from 'typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository
    ){}
  async findAll(dates: string): Promise<ReadUserDto[]> {
    const date: Date = new Date(dates)
    const users: User[] = await this.userRepository.find({where: {status: 'ACTIVE', createdAt: MoreThan(dates)}, });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean>{
    const userExist = await this.userRepository.findOne(userId, {where: {status: 'ACTIVE'}});
    if(!userExist){
      throw new NotFoundException();
    }

    const roleExist = await this.roleRepository.findOne(roleId, {where: {roleStatus: 'ACTIVE'}});
    if(!roleExist){
      throw new NotFoundException('Rol doesnt exist');
    }
    userExist.users_roles.pop();
    userExist.users_roles.push(roleExist);
    await this.userRepository.save(userExist);
    return true;
  }
}
