import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import {JwtService} from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { LoggedInDto } from './dto/loggedin.dto';
import { User } from 'src/users/entities/user.entity';
import { IJwtPayload } from './jwt-payload.interface';
import {RoleType} from '../roles/rolestype.enum';
import { plainToClass } from 'class-transformer';
import {compare} from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    ){

  }
  async signup(signupDto: SignupDto): Promise<void>{
    const {userName, userEmail} = signupDto;
    const userExists = await this.authRepository.findOne({
      where: [{userName}, {userEmail}]
    });

    if(userExists){
      throw new ConflictException('The user or email does not exist');
    }

    return this.authRepository.signup(signupDto);
  }

  async signin(signinDto: SigninDto): Promise<LoggedInDto>{
    const {userName, userPassword} = signinDto;
    const user: User = await this.authRepository.findOne({
      where: {userName},
    });

    if(!user){
      throw new NotFoundException("Usuario no existe");
    }
    const isMatch = await compare(userPassword, user.userPassword);
    if(!isMatch){
      throw new UnauthorizedException('Usuario o paswword no válidos');
    }
    const payload: IJwtPayload = {
      userId: user.userId,
      userEmail: user.userEmail,
      userName: user.userName,
      users_roles: user.users_roles.map(r => r.roleName as RoleType)

    }

    const token = this.jwtService.sign(payload);
    return plainToClass(LoggedInDto, {token, user});
  }
}
