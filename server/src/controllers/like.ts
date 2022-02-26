import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { IActorLikeData } from "../interfaces/Actor";
import { IDatabaseError } from "../interfaces/Error";
import { IMovieLikeData } from "../interfaces/Movie";
import { TokenPayload } from "../interfaces/User";
import { findActor } from "../services/actor";
import {
  addActorLike,
  addMovieLike,
  deleteActorLike,
  deleteMovieLike,
  findActorLikeOfUser,
  findMovieLikeOfUser,
} from "../services/like";
import { findMovie } from "../services/movie";
import { errorHandler } from "../utils/helper";

export const likeAndUnlikeMovie = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user as TokenPayload;
    const movieId = parseInt(req.params.movieId);

    const movie = await findMovie(movieId);
    if (!movie) return errorHandler(res, Boom.badRequest("There is no movie in db"));

    const isLiked = await findMovieLikeOfUser(userId, movieId);
    if (isLiked) {
      await deleteMovieLike(isLiked);
      return res.status(200).send({ success: true, message: "MovieLike deleted" });
    }

    const body: IMovieLikeData = { liker: userId, movie: movieId };
    const like = await addMovieLike(body);
    res.status(201).send({ success: true, message: "MovieLike created", data: like });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};

export const likeAndUnlikeActor = async (req: Request, res: Response) => {
  try {
    const { id: userId } = res.locals.user as TokenPayload;
    const actorId = parseInt(req.params.actorId);

    const actor = await findActor(actorId);
    if (!actor) return errorHandler(res, Boom.badRequest("There is no actor in db"));

    const isLiked = await findActorLikeOfUser(userId, actorId);
    if (isLiked) {
      await deleteActorLike(isLiked);
      return res.status(200).send({ success: true, message: "ActorLike deleted" });
    }

    const body: IActorLikeData = { liker: userId, actor: actorId };
    const like = await addActorLike(body);
    res.status(201).send({ success: true, message: "ActorLike created", data: like });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};
