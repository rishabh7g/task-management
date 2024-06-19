const { HttpStatusCode } = require("axios");
const { add, get } = require("../data/user");
const { createJSONToken, isValidPassword } = require("../util/auth.util");
const { isValidEmail, isValidText } = require("../util/validation.util");
const {
  MESSAGE_INVALID_CREDENTIALS,
  MESSAGE_INVALID_EMAIL_OR_PASSWORD,
  MESSAGE_EMAIL_EXISTS,
  MESSAGE_INVALID_PASSWORD,
  MESSAGE_USER_SIGNUP_FAILED,
  MESSAGE_USER_CREATED,
} = require("../constant/message");

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: MESSAGE_AUTH_FAILED });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(HttpStatusCode.UnprocessableEntity).json({
      message: MESSAGE_INVALID_CREDENTIALS,
      errors: { credentials: MESSAGE_INVALID_EMAIL_OR_PASSWORD },
    });
  }

  const token = createJSONToken(email);
  res.json({ id: user.id, token });
};

const signUp = async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = ERRINV;
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = MESSAGE_EMAIL_EXISTS;
      }
    } catch (error) {}
  }

  if (!isValidText(data.password, 6)) {
    errors.password = MESSAGE_INVALID_PASSWORD;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(HttpStatusCode.UnprocessableEntity).json({
      message: MESSAGE_USER_SIGNUP_FAILED,
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res.status(HttpStatusCode.Created).json({
      message: MESSAGE_USER_CREATED,
      user: createdUser,
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn, signUp };
