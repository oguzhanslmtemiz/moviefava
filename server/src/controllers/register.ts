import { Request, Response } from "express";
import Boom from "@hapi/boom";
import { IDatabaseError } from "../interfaces/Error";
import { createUserInDB } from "../services/user";
import { errorHandler } from "../utils/helper";

export const createUser = async (req: Request, res: Response) => {
  try {
    await createUserInDB(req.body);
    res.status(201).send({ success: true, message: "User created" });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};
