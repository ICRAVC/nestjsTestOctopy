import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { ReadRoleDto } from "../../roles/dto/read-role.dto";


export class ReadUserDto{
  @Expose()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;

  @Expose()
  @IsEmail()
  @ApiProperty()
  readonly userEmail: string;

  @Expose()
  @IsString()
  @ApiProperty()
  readonly userName: string;

  @Expose()
  @Type(type => ReadRoleDto)
  @ApiProperty()
  readonly users_roles: ReadRoleDto[];
}