import Joi, { ObjectSchema } from "joi";

export const actorSchema: ObjectSchema = Joi.object({
  fullname: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  shareable: Joi.boolean(),
});
