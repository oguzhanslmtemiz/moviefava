import Joi, { ObjectSchema } from "joi";

export const movieSchema: ObjectSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  shareable: Joi.boolean(),
});
