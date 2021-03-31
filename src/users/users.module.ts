import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RoleRepository } from 'src/roles/roles.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository]), AuthModule, ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
