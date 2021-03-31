import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ReadUserDto } from "./read-user.dto";

export class ResponseUserDto {
  @IsNotEmpty()
  @ApiProperty()
  status: number;

  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(type => ReadUserDto)
  user: ReadUserDto[];
}
