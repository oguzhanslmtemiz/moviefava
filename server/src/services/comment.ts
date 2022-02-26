import { ActorComment } from "../entity/ActorComment";
import { MovieComment } from "../entity/MovieComment";

export const addMovieComment = async (movieCommentFromReqBody: object) => {
  return await MovieComment.create(movieCommentFromReqBody).save();
};

export const getCountOfCommentsToMovie = async (movieId: number) => {
  return await MovieComment.createQueryBuilder("comment")
    .where(`comment.movie = ${movieId}`)
    .getCount();
};

export const getMovieCommentsFromDB = async (movieId: number) => {
  return await MovieComment.createQueryBuilder("comment")
    .where(`comment.movie = ${movieId}`)
    .leftJoinAndSelect("comment.commenter", "commenter")
    .getMany();
};

export const addActorComment = async (actorCommentFromReqBody: object) => {
  return await ActorComment.create(actorCommentFromReqBody).save();
};

export const getCountOfCommentsToActor = async (actorId: number) => {
  return await ActorComment.createQueryBuilder("comment")
    .where(`comment.actor = ${actorId}`)
    .getCount();
};

export const getActorCommentsFromDB = async (actorId: number) => {
  return await ActorComment.createQueryBuilder("comment")
    .where(`comment.actor = ${actorId}`)
    .leftJoinAndSelect("comment.commenter", "commenter")
    .getMany();
};
