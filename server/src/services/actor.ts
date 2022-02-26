import { Actor } from "../entity/Actor";
import { IActor } from "../interfaces/Actor";

export const createActorInDB = async (actorDataFromReqBody: IActor) => {
  return await Actor.create(actorDataFromReqBody).save();
};

export const findActor = async (actorId: number) => {
  return await Actor.findOne({ where: { id: actorId } });
};

export const getSharedActor = async (actorId: number) => {
  return await Actor.createQueryBuilder("actor")
    .where(`actor.id = ${actorId}`)
    .andWhere("actor.shareable = true")
    .leftJoinAndSelect("actor.user", "user")
    .leftJoinAndSelect("actor.likes", "likes")
    .leftJoinAndSelect("likes.liker", "liker")
    .loadRelationCountAndMap("actor.countOfComments", "actor.comments")
    .getOne();
};

export const findActorOfUser = async (userId: number, actorId: number) => {
  return await Actor.findOne({ where: { id: actorId, user: userId } });
};

export const deleteOneActor = async (actorId: number) => {
  return await Actor.delete(actorId);
};

export const updateActor = async (actorId: number, actor: IActor) => {
  return await Actor.update(actorId, actor);
};
