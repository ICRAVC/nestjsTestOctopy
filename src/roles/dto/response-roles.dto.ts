import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ReadRoleDto } from "./read-role.dto";

export class ResponseRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  status: number;

  @IsNotEmpty()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @ApiProperty()
  role: ReadRoleDto | ReadRoleDto[];
}
