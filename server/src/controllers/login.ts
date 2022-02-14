import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { findUserFromDB } from "../services/user";
import { comparePassword, errorHandler, generateToken, sanitizeUser } from "../utils/helper";

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await findUserFromDB(req.body.email);
    !user && errorHandler(res, Boom.unauthorized("There is no such e-mail on the system"));
    if (user) {
      // prettier-ignore
      if (user.isPassAutoGen) {
        return errorHandler(res, Boom.unauthorized(
          "This email address is associated with an account but no password " +
          "is associated with it yet, so it can’t be used to log in. Please " +
          "reset your password (NOT ACTIVE - IN DEVELOPMENT) or use social login")
        );
      }
      const isMatchPassword = await comparePassword(req.body.password, user.password);
      if (isMatchPassword) {
        const userWithOutPassword = sanitizeUser(user);
        const token = generateToken(userWithOutPassword);
        res.locals.test = "TEST";
        res.status(200).send({
          success: true,
          message: "You have successfully logged in",
          data: { user: userWithOutPassword, token },
        });
      } else {
        errorHandler(res, Boom.unauthorized("Your password is not correct"));
      }
    }
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
