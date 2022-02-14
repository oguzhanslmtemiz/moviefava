import { NextFunction, Request, Response } from "express";
import Boom from "@hapi/boom";
import { errorHandler, getTokenFromHeader, verifyToken } from "../utils/helper";
import { IJwtError } from "../interfaces/Error";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromHeader(req);
    const decodedToken = verifyToken(token);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    const jwtError = error as IJwtError;
    const stringError = JSON.stringify(jwtError);
    next(errorHandler(res, Boom.unauthorized(stringError)));
  }
};
