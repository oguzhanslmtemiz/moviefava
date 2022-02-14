import { User } from "../entity/User";
import { IUser } from "../interfaces/User";

const createUserInDB = async (
  userDataFromReqBody: IUser,
  isSocialRegister: boolean = false
) => {
  return isSocialRegister
    ? await User.create({ ...userDataFromReqBody, isPassAutoGen: true }).save()
    : await User.create(userDataFromReqBody).save();
};

const findUserFromDB = async (userEmailFromReqBody: string) => {
  return await User.findOne({ email: userEmailFromReqBody });
};

const getUserPosts = async (userId: number) => {
  return await User.findOne({
    relations: ["movies", "actors"],
    where: { id: userId },
    select: ["email", "id", "username"],
  });
  // return await User.find({ relations: ["movies", "actors"], where: { id: userId } });
  //   // return await Movie.find({ relations: ["user"] });
  // return await Movie.find({ where: { user: { id: userId } } });
};

export { createUserInDB, findUserFromDB, getUserPosts };
