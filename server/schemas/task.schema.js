const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().required(),
});

module.exports = taskSchema;
