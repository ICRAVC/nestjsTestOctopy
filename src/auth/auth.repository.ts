import { EntityRepository, getConnection, Repository } from 'typeorm';
import {genSalt, hash} from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { RoleRepository } from 'src/roles/roles.repository';
import { Role } from '../roles/entities/role.entity';
import { RoleType } from '../roles/rolestype.enum';

@EntityRepository(User)
export class AuthRepository extends Repository<User>{
  async signup(signupDto: SignupDto){
    const {userName, userEmail, userPassword} = signupDto;
    const user = new User();
    user.userName = userName;
    user.userEmail = userEmail;

    const roleRepository: RoleRepository = await getConnection().getRepository(Role);
    const defaultRole: Role = await roleRepository.findOne({where: {roleName: RoleType.GENERAL}});
    user.users_roles = [defaultRole];

    const salt = await genSalt(10);
    user.userPassword = await hash(userPassword, salt);
    await user.save();
    return
  }
}