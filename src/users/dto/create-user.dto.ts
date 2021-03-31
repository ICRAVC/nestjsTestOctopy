import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { RoleType } from "../../roles/rolestype.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @ApiProperty()
  userEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  users_roles: RoleType[];

}
