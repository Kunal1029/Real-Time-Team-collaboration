import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  uid: Joi.string().required(),
  photoURL: Joi.string().uri().optional(),
  role: Joi.string().valid('admin', 'member', 'manager').optional(),
});

