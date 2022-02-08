import { User } from "../entity/User";
import { IUser } from "../interfaces/User";

const createUserInDB = async (userDataFromReqBody: IUser) => {
  return await User.create(userDataFromReqBody).save();
};

const findUserFromDB = async (userEmailFromReqBody: string) => {
  return await User.findOne({ email: userEmailFromReqBody });
};

export { createUserInDB, findUserFromDB };
