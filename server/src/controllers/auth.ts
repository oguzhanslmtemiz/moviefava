import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { IDatabaseError } from "../interfaces/Error";
import { IUser } from "../interfaces/User";
import { createUserInDB, findUserFromDB } from "../services/user";
import {
  convertAlphaNumericUniqueString,
  createAlphaNumericUniqueString,
  errorHandler,
  generateToken,
} from "../utils/helper";

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const googleCredentialsFromClient = req.body;

    const user = await findUserFromDB(googleCredentialsFromClient.email);

    if (!user) {
      const userCredentials: IUser = {
        email: googleCredentialsFromClient.email,
        password: createAlphaNumericUniqueString(),
        username: convertAlphaNumericUniqueString(googleCredentialsFromClient.name),
      };
      await createUserInDB(userCredentials, true);
    }
    const token = generateToken(googleCredentialsFromClient);

    res.json(token);
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};
