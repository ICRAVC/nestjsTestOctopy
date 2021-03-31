import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { ReadUserDto } from "../../users/dto/read-user.dto";

@Exclude()
export class LoggedInDto{
  @Expose()
  @IsString()
  @ApiProperty()
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  @ApiProperty()
  user: ReadUserDto
}