import { RoleType } from "../roles/rolestype.enum";

export interface IJwtPayload {
  userId: number;
  userEmail: string;
  userName: string;
  users_roles: RoleType[];
  iat?: Date;
}