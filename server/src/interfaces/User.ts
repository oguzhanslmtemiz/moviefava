import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export type TokenPayload = JwtPayload & Omit<IUser, "password"> & { id: number };
