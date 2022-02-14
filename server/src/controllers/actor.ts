import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { convertStringToBoolean, errorHandler } from "../utils/helper";
import { IDatabaseError } from "../interfaces/Error";
import { TokenPayload } from "../interfaces/User";
import { createActorInDB } from "../services/actor";

export const createActor = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user as TokenPayload;
    let { shareable, ...restOfBody } = req.body;
    shareable = convertStringToBoolean(shareable);
    const actor = await createActorInDB(decodedToken.id, { shareable, ...restOfBody });

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

export const editActor = async (req: Request, res: Response) => {
  try {
    const decodedToken = res.locals.user;
    //
  } catch (error) {
    errorHandler(res, Boom.internal("", error));
  }
};
