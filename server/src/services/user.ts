import { User } from "../entity/User";
import { IUserBody } from "../interfaces/User";

const createUserInDB = async (
  userDataFromReqBody: IUserBody,
  isSocialRegister: boolean = false
) => {
  return isSocialRegister
    ? await User.create({ ...userDataFromReqBody, isPassAutoGen: true }).save()
    : await User.create(userDataFromReqBody).save();
};

const findUserFromDBIncludesPassword = async (userEmailFromReqBody: string) => {
  return await User.findOne(
    { email: userEmailFromReqBody },
    { select: ["id", "email", "username", "password", "isPassAutoGen", "avatar", "createdAt"] }
  );
};

const getUserPosts = async (userId: number) => {
  return await User.createQueryBuilder("user")
    .where(`user.id = ${userId}`)
    .leftJoinAndSelect("user.movies", "movies")
    .leftJoinAndSelect("user.actors", "actors")
    .leftJoinAndSelect("movies.likes", "movieLikes")
    .leftJoinAndSelect("movieLikes.liker", "movieLiker")
    .loadRelationCountAndMap("movies.countOfComments", "movies.comments")
    .leftJoinAndSelect("actors.likes", "actorLikes")
    .leftJoinAndSelect("actorLikes.liker", "actorliker")
    .loadRelationCountAndMap("actors.countOfComments", "actors.comments")
    .getOne();
};

const getUserSharedPosts = async (userId: number) => {
  return await User.createQueryBuilder("user")
    .where(`user.id = ${userId}`)
    .leftJoinAndSelect("user.movies", "movies", "movies.shareable = true")
    .leftJoinAndSelect("user.actors", "actors", "actors.shareable = true")
    .leftJoinAndSelect("movies.likes", "movieLikes")
    .leftJoinAndSelect("movieLikes.liker", "movieLiker")
    .loadRelationCountAndMap("movies.countOfComments", "movies.comments")
    .leftJoinAndSelect("actors.likes", "actorLikes")
    .leftJoinAndSelect("actorLikes.liker", "actorliker")
    .loadRelationCountAndMap("actors.countOfComments", "actors.comments")
    .getOne();
};

export { createUserInDB, findUserFromDBIncludesPassword, getUserPosts, getUserSharedPosts };
