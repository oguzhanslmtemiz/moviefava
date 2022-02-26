import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { errorHandler, sanitizeBody } from "../utils/helper";
import { IDatabaseError } from "../interfaces/Error";
import { TokenPayload } from "../interfaces/User";
import {
  createMovieInDB,
  deleteOneMovie,
  getSharedMovie,
  updateMovie,
} from "../services/movie";
import { getCountOfCommentsToMovie } from "../services/comment";

export const createMovie = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user as TokenPayload;
    const body = sanitizeBody(req.body);
    const movieObj = { user: decodedToken.id, ...body };
    const movie = await createMovieInDB(movieObj);

    res.status(201).send({ success: true, message: "Movie created", data: movie });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};

export const getMyMovie = async (req: Request, res: Response) => {
  try {
    const { post, id, email, username, avatar } = res.locals.user;
    const countOfComments = await getCountOfCommentsToMovie(post.id);
    const response = { ...post, user: { id, email, username, avatar }, countOfComments };
    res
      .status(200)
      .send({ success: true, message: "Movie successfully send", data: response });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const getSharedMovieOfUser = async (req: Request, res: Response) => {
  try {
    const movie = await getSharedMovie(parseInt(req.params.movieId));
    !movie
      ? errorHandler(res, Boom.notFound("Movie not found"))
      : res
          .status(200)
          .send({ success: true, message: "Movie successfully send", data: movie });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const editMovie = async (req: Request, res: Response) => {
  try {
    await updateMovie(parseInt(req.params.movieId), sanitizeBody(req.body));
    res.status(200).send({ success: true, message: "Movie updated" });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    await deleteOneMovie(parseInt(req.params.movieId));
    res.status(200).send({ success: true, message: "Movie deleted" });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
