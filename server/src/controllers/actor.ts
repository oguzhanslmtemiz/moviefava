import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { errorHandler, sanitizeBody } from "../utils/helper";
import { IDatabaseError } from "../interfaces/Error";
import { TokenPayload } from "../interfaces/User";
import {
  createActorInDB,
  deleteOneActor,
  getSharedActor,
  updateActor,
} from "../services/actor";
import { getCountOfCommentsToActor } from "../services/comment";

export const createActor = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user as TokenPayload;
    const body = sanitizeBody(req.body);
    const actorObj = { user: decodedToken.id, ...body };
    const actor = await createActorInDB(actorObj);

    res.status(201).send({ success: true, message: "Actor created", data: actor });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};

export const getMyActor = async (req: Request, res: Response) => {
  try {
    const { post, id, email, username, avatar } = res.locals.user;
    const countOfComments = await getCountOfCommentsToActor(post.id);
    const response = { ...post, user: { id, email, username, avatar }, countOfComments };
    res
      .status(200)
      .send({ success: true, message: "Actor successfully send", data: response });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const getSharedActorOfUser = async (req: Request, res: Response) => {
  try {
    const actor = await getSharedActor(parseInt(req.params.actorId));
    !actor
      ? errorHandler(res, Boom.notFound("Actor not found"))
      : res
          .status(200)
          .send({ success: true, message: "Actor successfully send", data: actor });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const editActor = async (req: Request, res: Response) => {
  try {
    await updateActor(parseInt(req.params.actorId), sanitizeBody(req.body));
    res.status(200).send({ success: true, message: "Actor updated" });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};

export const deleteActor = async (req: Request, res: Response) => {
  try {
    await deleteOneActor(parseInt(req.params.actorId));
    res.status(200).send({ success: true, message: "Actor deleted" });
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};