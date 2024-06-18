const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  category: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = taskSchema;
