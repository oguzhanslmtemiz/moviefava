import { User } from "../entity/User";

export const getSharedPostsInDb = async () => {
  return await User.find({
    relations: ["movies", "actors"],
    select: ["email", "id", "username"],
  });
};
