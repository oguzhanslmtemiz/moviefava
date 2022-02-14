import { Movie } from "../entity/Movie";
import { User } from "../entity/User";
import { IMovie } from "../interfaces/Movie";

export const createMovieInDB = async (userId: number, movieDataFromReqBody: IMovie) => {
  return await Movie.create({ user: userId, ...movieDataFromReqBody }).save();
};

export const getUserMovies = async (userId: number) => {
  return await Movie.find({ where: { user: { id: userId } } });
};

export const getMovie = async (id: number) => {
  return await Movie.findOne({ id });
};

export const updateMovie = async (movieId: number, movie: IMovie) => {
  return await Movie.update(movieId, movie);
};

export const deleteOneMovie = async (movieId: number) => {
  return await Movie.delete(movieId);
};
