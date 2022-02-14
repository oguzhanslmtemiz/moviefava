import Joi, { ObjectSchema } from "joi";

export const actorSchema: ObjectSchema = Joi.object({
  fullname: Joi.string().required(),
  image: Joi.string().optional(),
  description: Joi.string().optional(),
  shareable: Joi.boolean(),
});
