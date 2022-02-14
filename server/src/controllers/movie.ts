import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { convertStringToBoolean, errorHandler } from "../utils/helper";
import { IDatabaseError } from "../interfaces/Error";
import { TokenPayload } from "../interfaces/User";
import {
  createMovieInDB,
  deleteOneMovie,
  getMovie,
  getUserMovies,
  updateMovie,
} from "../services/movie";

export const createMovie = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user as TokenPayload;
    let { shareable, ...restOfBody } = req.body;
    shareable = convertStringToBoolean(shareable);
    const movie = await createMovieInDB(decodedToken.id, { shareable, ...restOfBody });

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

export const getAllUserMovies = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user;

    const movies = await getUserMovies(decodedToken.id);

    return res.json(movies);
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const getOneMovie = async (req: Request, res: Response) => {
  try {
    const movie = await getMovie(parseInt(req.params.movieId));

    return res.json(movie);
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const editMovie = async (req: Request, res: Response) => {
  try {
    await updateMovie(parseInt(req.params.movieId), req.body);
    return res.json({ success: true });
    //
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    await deleteOneMovie(parseInt(req.params.movieId));
    return res.json({ success: true });
    //
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
