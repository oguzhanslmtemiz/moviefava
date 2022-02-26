import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { IDatabaseError } from "../interfaces/Error";
import { TokenPayload } from "../interfaces/User";
import { findActor } from "../services/actor";
import {
  addActorComment,
  addMovieComment,
  getActorCommentsFromDB,
  getMovieCommentsFromDB,
} from "../services/comment";
import { findMovie } from "../services/movie";
import { errorHandler } from "../utils/helper";

export const createCommentToMovie = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user as TokenPayload;
    const movieId = parseInt(req.params.movieId);

    const movie = await findMovie(movieId);
    if (!movie) return errorHandler(res, Boom.badRequest("There is no movie in db"));
    const body = { commenter: userId, movie: movieId, ...req.body };
    const comment = await addMovieComment(body);
    res.status(201).send({ success: true, message: "Movie comment created", data: comment });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};

export const createCommentToActor = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user as TokenPayload;
    const actorId = parseInt(req.params.actorId);

    const actor = await findActor(actorId);
    if (!actor) return errorHandler(res, Boom.badRequest("There is no actor in db"));

    const body = { commenter: userId, actor: actorId, ...req.body };
    const comment = await addActorComment(body);
    res.status(201).send({ success: true, message: "Actor comment created", data: comment });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};

export const getMovieComments = async (req: Request, res: Response) => {
  try {
    const comments = await getMovieCommentsFromDB(parseInt(req.params.movieId));
    !comments
      ? errorHandler(res, Boom.notFound("No comments found"))
      : res.status(200).send({
          success: true,
          message: "Movie Comments successfully send",
          data: comments,
        });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const getActorComments = async (req: Request, res: Response) => {
  try {
    const comments = await getActorCommentsFromDB(parseInt(req.params.actorId));
    !comments
      ? errorHandler(res, Boom.notFound("No comments found"))
      : res.status(200).send({
          success: true,
          message: "Actor Comments successfully send",
          data: comments,
        });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
