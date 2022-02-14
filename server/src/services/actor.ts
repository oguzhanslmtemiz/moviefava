import { Actor } from "../entity/Actor";
import { IActor } from "../interfaces/Actor";

export const createActorInDB = async (userId: number, actorDataFromReqBody: IActor) => {
  return await Actor.create({ user: userId, ...actorDataFromReqBody }).save();
};
