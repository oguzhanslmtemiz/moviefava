import { ActorLike } from "../entity/ActorLike";
import { MovieLike } from "../entity/MovieLike";

export const addMovieLike = async (movieDataFromReq: object) => {
  return await MovieLike.create(movieDataFromReq).save();
};

export const deleteMovieLike = async (like: MovieLike) => {
  return await MovieLike.delete(like);
};
export const findMovieLikeOfUser = async (userId: number, movieId: number) => {
  return await MovieLike.findOne({ where: { liker: userId, movie: movieId } });
};

export const addActorLike = async (actorDataFromReq: object) => {
  return await ActorLike.create(actorDataFromReq).save();
};

export const deleteActorLike = async (like: ActorLike) => {
  return await ActorLike.delete(like);
};
export const findActorLikeOfUser = async (userId: number, actorId: number) => {
  return await ActorLike.findOne({ where: { liker: userId, actor: actorId } });
};
