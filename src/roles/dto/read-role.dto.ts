import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString, MaxLength } from "class-validator";

@Exclude()
export class ReadRoleDto{
  @Expose()
  @IsNumber()
  @ApiProperty()
  readonly roleId: number;

  @Expose()
  @IsString()
  @MaxLength(50, {message: 'El nombre no es valido'})
  @ApiProperty()
  readonly roleName: string;

  @Expose()
  @IsString()
  @MaxLength(100, {message: 'La description no es valida'})
  @ApiProperty()
  readonly roleDescription: string;
}