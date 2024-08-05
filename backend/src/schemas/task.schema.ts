import Joi from 'joi';

export const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
});
