import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ReadRoleDto } from './dto/read-role.dto';
import { ResponseRoleDto } from './dto/response-roles.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  
  @ApiResponse({status:201, description: 'Successful!', type: ResponseRoleDto})
  @Post('/addRole')
  async createRole(@Res() res, @Body() role: CreateRoleDto): Promise<ResponseRoleDto>{
    const roles = await this.rolesService.create(role);
    return res.status(HttpStatus.CREATED).json({
      status:201,
      message: 'Successful!',
      data: roles
    })
  }

  @ApiResponse({status:200, description: 'Successful!', type: ResponseRoleDto})
  @Get('/allRoles')
  async findAll(@Res() res):Promise<ResponseRoleDto> {
    const roles = await this.rolesService.findAll();
    return res.status(HttpStatus.ACCEPTED).json({
      status:201,
      message: 'Successful!',
      data: roles
    })
  }
}
