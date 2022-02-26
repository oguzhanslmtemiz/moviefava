import { Movie } from "../entity/Movie";
import { IMovieBody } from "../interfaces/Movie";

export const createMovieInDB = async (movieDataFromReqBody: IMovieBody) => {
  return await Movie.create(movieDataFromReqBody).save();
};

export const findMovie = async (movieId: number) => {
  return await Movie.findOne({ where: { id: movieId } });
};

export const getSharedMovie = async (movieId: number) => {
  return await Movie.createQueryBuilder("movie")
    .where(`movie.id = ${movieId}`)
    .andWhere("movie.shareable = true")
    .leftJoinAndSelect("movie.user", "user")
    .leftJoinAndSelect("movie.likes", "likes")
    .leftJoinAndSelect("likes.liker", "liker")
    .loadRelationCountAndMap("movie.countOfComments", "movie.comments")
    .getOne();
};

export const updateMovie = async (movieId: number, movie: IMovieBody) => {
  return await Movie.update(movieId, movie);
};

export const deleteOneMovie = async (movieId: number) => {
  return await Movie.delete(movieId);
};

export const findMovieOfUser = async (userId: number, movieId: number) => {
  return await Movie.findOne({ where: { id: movieId, user: userId } });
};
