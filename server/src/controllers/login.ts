import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { findUserFromDB } from "../services/user";
import { comparePassword, errorHandler, sanitizeUser } from "../utils/helper";

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await findUserFromDB(req.body.email);
    !user && errorHandler(res, Boom.unauthorized("There is no such e-mail on the system"));
    if (user) {
      const isMatchPassword = await comparePassword(req.body.password, user.password);
      if (isMatchPassword) {
        const userWithOutPassword = sanitizeUser(user);
        res.status(200).send({
          success: true,
          message: "You have successfully logged in",
          data: userWithOutPassword,
        });
      } else {
        errorHandler(res, Boom.unauthorized("Your password is not correct"));
      }
    }
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
