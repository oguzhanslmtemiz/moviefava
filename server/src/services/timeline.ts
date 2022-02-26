import { Movie } from "../entity/Movie";
import { Actor } from "../entity/Actor";

export const getSharedPostsInDb = async () => {
  const sharedMovies = await Movie.createQueryBuilder("movie")
    .where("shareable = true")
    .leftJoinAndSelect("movie.user", "user")
    .leftJoinAndSelect("movie.likes", "likes")
    .leftJoinAndSelect("likes.liker", "liker")
    .loadRelationCountAndMap("movie.countOfComments", "movie.comments")
    .orderBy("movie.createdAt", "DESC")
    .getMany();

  const sharedActors = await Actor.createQueryBuilder("actor")
    .where("shareable = true")
    .leftJoinAndSelect("actor.user", "user")
    .leftJoinAndSelect("actor.likes", "likes")
    .leftJoinAndSelect("likes.liker", "liker")
    .loadRelationCountAndMap("actor.countOfComments", "actor.comments")
    .orderBy("actor.createdAt", "DESC")
    .getMany();

  return [...sharedActors, ...sharedMovies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
