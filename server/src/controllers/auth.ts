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
  sanitizeUser,
} from "../utils/helper";

export const socialLoginAuth = async (req: Request, res: Response) => {
  try {
    const socialLoginCredentialsFromClient = req.body;

    let user = await findUserFromDB(socialLoginCredentialsFromClient.email);

    if (!user) {
      const userCredentials: IUser = {
        email: socialLoginCredentialsFromClient.email,
        password: createAlphaNumericUniqueString(),
        username: convertAlphaNumericUniqueString(socialLoginCredentialsFromClient.name),
      };
      user = await createUserInDB(userCredentials, true);
    }
    const userWithOutPassword = sanitizeUser(user);
    const token = generateToken(userWithOutPassword);

    res.status(200).send({
      success: true,
      message: "You have successfully logged in",
      data: { user: userWithOutPassword, token },
    });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};

export const successfulAuth = (req: Request, res: Response) => res.sendStatus(200);
