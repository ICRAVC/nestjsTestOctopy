import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateRoleDto{

  @IsString()
  @MaxLength(50, {message: 'El nombre no es valido'})
  @ApiProperty()
  readonly roleName: string;

  @IsString()
  @MaxLength(100, {message: 'La description no es valida'})
  @ApiProperty()
  readonly roleDescription: string;
}
