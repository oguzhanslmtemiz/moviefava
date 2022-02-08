import { Boom } from "@hapi/boom";
import bcrypt from "bcrypt";
import { Response } from "express";
import { User } from "../entity/User";

const hashPassword = async (plainTextPassword: string) => {
  return await bcrypt.hash(plainTextPassword, 10);
};

const comparePassword = async (plainTextPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const sanitizeUser = (user: User) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

const errorHandler = (res: Response, error: Boom) => {
  const { output, data } = error;
  return res.status(output.statusCode).json({ success: false, payload: output.payload, data });
};

export { hashPassword, comparePassword, sanitizeUser, errorHandler };
