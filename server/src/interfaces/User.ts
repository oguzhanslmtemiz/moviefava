import { JwtPayload } from "jsonwebtoken";

export interface IUserBody {
  email: string;
  username: string;
  password: string;
  avatar?: string;
}

export type TokenPayload = JwtPayload & Omit<IUserBody, "password"> & { id: number };
