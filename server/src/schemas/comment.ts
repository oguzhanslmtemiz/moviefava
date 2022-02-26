import Joi, { ObjectSchema } from "joi";

export const commentSchema: ObjectSchema = Joi.object({
  comment: Joi.string().required(),
});
