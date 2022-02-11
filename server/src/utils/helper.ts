import { Boom } from "@hapi/boom";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entity/User";

const hashPassword = async (plainTextPassword: string) => {
  return await bcrypt.hash(plainTextPassword, 10);
};

const comparePassword = async (plainTextPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const sanitizeUser = (user: User) => {
  const { password, isPassAutoGen, createdAt, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

const errorHandler = (res: Response, error: Boom) => {
  const { output, data } = error;
  return res.status(output.statusCode).json({ success: false, payload: output.payload, data });
};

const generateToken = (payload: Object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

const getTokenFromHeader = (req: Request): string | null => {
  const authorizationHeader = req.headers.authorization;
  const jwtToken = authorizationHeader?.split(" ")[1];
  return (
    (authorizationHeader?.startsWith("Bearer") && jwtToken != undefined && jwtToken) || null
  );
};

const createAlphaNumericUniqueString = () => Math.random().toString(36).slice(-4);

// prettier-ignore
const convertAlphaNumericUniqueString = (string: string): string => {
  return (
    string.trim().toLowerCase().split(" ").join("")
      .normalize("NFD") //  Unicode Normalization Form
      .replace(/\p{Diacritic}/gu, "") // Remove accents/diacritics
      .replace(/[_\W]/g, "") // Remove not alphanumeric characters
      + createAlphaNumericUniqueString()
  );
};

export {
  hashPassword,
  comparePassword,
  sanitizeUser,
  errorHandler,
  generateToken,
  verifyToken,
  getTokenFromHeader,
  createAlphaNumericUniqueString,
  convertAlphaNumericUniqueString,
};
