import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
