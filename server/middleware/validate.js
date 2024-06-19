const { HttpStatusCode } = require("axios");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ error: error.details[0].message });
  }
  next();
};

module.exports = validate;
