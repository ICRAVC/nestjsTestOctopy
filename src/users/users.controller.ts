import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/roles/decorators/role.decorators';
import { RoleType } from 'src/roles/rolestype.enum';
import { ReadUserDto } from './dto/read-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UsersService } from './users.service';


@ApiTags('findUsersByDate')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({status:200, description: 'Successful!', type:ResponseUserDto})
  @ApiQuery({name:'dates', description: 'Date in format: YYYY/MM/DD', required: true, type:String})
  @ApiBearerAuth()
  //@Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('usersByDate')
  async findAll(@Res() res, @Query() dates): Promise<ResponseUserDto>{
    const users = await this.usersService.findAll(dates.dates);
    return res.status(HttpStatus.OK).json({
      status:200,
      message: 'Successful!',
      data: users   
    });
  }
  @ApiResponse({status:200, description: 'Successful!'})
  @Post('setRole/:userId/:roleId')
  setRoleToUser(
    @Res() res,
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('roleId', ParseIntPipe) roleId: number,
    ){
      this.usersService.setRoleToUser(userId, roleId);
      return res.status(HttpStatus.OK).json({
        status:200,
        message: 'Successful!'
      });
    }
}
