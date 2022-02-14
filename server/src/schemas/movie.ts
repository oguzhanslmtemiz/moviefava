import Joi, { ObjectSchema } from "joi";

export const movieSchema: ObjectSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().optional(),
  description: Joi.string().optional(),
  shareable: Joi.boolean(),
});
