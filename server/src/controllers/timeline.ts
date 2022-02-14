import Boom from "@hapi/boom";
import { Request, Response } from "express";
import { IDatabaseError } from "../interfaces/Error";
import { getSharedPostsInDb } from "../services/timeline";
import { errorHandler } from "../utils/helper";

export const getSharedPosts = async (req: Request, res: Response) => {
  try {
    const sharedPosts = await getSharedPostsInDb();
    res
      .status(200)
      .send({ success: true, message: "Post send successfully", data: sharedPosts });
  } catch (error) {
    const dbError = error as IDatabaseError;
    dbError.code === "ER_DUP_ENTRY"
      ? errorHandler(res, Boom.conflict(dbError.sqlMessage))
      : dbError.code === "ER_NO_DEFAULT_FOR_FIELD"
      ? errorHandler(res, Boom.badRequest(dbError.sqlMessage))
      : errorHandler(res, Boom.internal("", error));
  }
};
