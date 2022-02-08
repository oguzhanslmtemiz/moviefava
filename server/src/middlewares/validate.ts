import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import Boom from "@hapi/boom";
import { errorHandler } from "../utils/helper";

export default (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return errorHandler(res, Boom.badRequest("Bad Request Body", error.details));
  }
  next();
};
