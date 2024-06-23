const { HttpStatusCode } = require("axios");
const { add, get } = require("../data/user.data");
const { createJSONToken, isValidPassword } = require("../util/auth.util");
const { isValidEmail, isValidText } = require("../util/validation.util");
const { verify } = require("jsonwebtoken");
const {
  MESSAGE_INVALID_CREDENTIALS,
  MESSAGE_INVALID_EMAIL_OR_PASSWORD,
  MESSAGE_EMAIL_EXISTS,
  MESSAGE_INVALID_PASSWORD,
  MESSAGE_USER_REGISTER_FAILED,
  MESSAGE_USER_CREATED,
  MESSAGE_REFRESH_TOKEN_NOT_FOUND,
  MESSAGE_INVALID_REFRESH_TOKEN,
  MESSAGE_ERROR_GENERATING_REFRESH_TOKEN,
  MESSAGE_EMAIL_NOT_EXISTS,
} = require("../constant/message.constant");
const { ACCESS_TOKEN_EXPIRES_IN } = require("../constant/time.constant");

let refreshTokenList = [];

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res
      .status(HttpStatusCode.NotFound)
      .json({ message: MESSAGE_EMAIL_NOT_EXISTS });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(HttpStatusCode.UnprocessableEntity).json({
      message: MESSAGE_INVALID_CREDENTIALS,
      errors: { credentials: MESSAGE_INVALID_EMAIL_OR_PASSWORD },
    });
  }

  const { id, roles } = user;

  const userPayload = { email, id };
  const accessToken = _generateAccessToken(userPayload);
  const refreshToken = createJSONToken(
    userPayload,
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
  );
  refreshTokenList.push(refreshToken);

  res.json({ accessToken, roles, refreshToken });
};

const register = async (req, res, next) => {
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
      message: MESSAGE_USER_REGISTER_FAILED,
      errors,
    });
  }

  try {
    const dataWithRoles = { ...data, roles: ["user"] };
    await add(dataWithRoles);
    res.status(HttpStatusCode.Created).json({
      message: MESSAGE_USER_CREATED,
    });
  } catch (error) {
    next(error);
  }
};

const generateNewToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: MESSAGE_REFRESH_TOKEN_NOT_FOUND });
  }

  const isRefreshTokenInvalid = !refreshTokenList.includes(refreshToken);

  if (isRefreshTokenInvalid) {
    return res
      .status(HttpStatusCode.Forbidden)
      .json({ message: MESSAGE_INVALID_REFRESH_TOKEN });
  }

  try {
    verify(
      refreshToken,
      process.env.REFRESH_ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.status(HttpStatusCode.Forbidden).json({
            message: MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN,
          });
        }
        const { id, email } = user;
        const userPayload = { id, email };
        const accessToken = _generateAccessToken(userPayload);
        res.json({ accessToken });
      },
    );
  } catch (error) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ message: MESSAGE_ERROR_GENERATING_REFRESH_TOKEN });
  }
};

const logout = async (req, res) => {
  refreshTokenList = refreshTokenList.filter(
    (refreshToken) => refreshToken !== req.body.token,
  );
  return res.sendStatus(HttpStatusCode.NoContent);
};

const _generateAccessToken = (payload) => {
  const accessToken = createJSONToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
  );
  return accessToken;
};

module.exports = { login, register, generateNewToken, logout };
