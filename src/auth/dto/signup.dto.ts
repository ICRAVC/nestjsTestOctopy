import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class SignupDto{

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userPassword: string;
}