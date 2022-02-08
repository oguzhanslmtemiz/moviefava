import Joi, { ObjectSchema } from "joi";

const loginSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const registerSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required().min(3),
  password: Joi.string().required().min(8),
});

export { loginSchema, registerSchema };
