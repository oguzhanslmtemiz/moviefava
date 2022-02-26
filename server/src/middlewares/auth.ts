import { NextFunction, Request, Response } from "express";
import Boom from "@hapi/boom";
import { errorHandler, getTokenFromHeader, verifyToken } from "../utils/helper";
import { IJwtError } from "../interfaces/Error";
import { findMovieOfUser } from "../services/movie";
import { findActorOfUser } from "../services/actor";

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

export const selfAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = res.locals.user;
    const { movieId, actorId } = req.params;
    let post;
    if (movieId) {
      post = await findMovieOfUser(decodedToken.id, parseInt(movieId));
      if (!post) throw Error;
    } else if (actorId) {
      post = await findActorOfUser(decodedToken.id, parseInt(actorId));
      if (!post) throw Error;
    }
    res.locals.user.post = post;
    next();
  } catch (error) {
    next(errorHandler(res, Boom.forbidden("You don't have a permission", error)));
  }
};
