import Joi from 'joi';

export const taskSchema = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
});
