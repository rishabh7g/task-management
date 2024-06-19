const jwt = require("jsonwebtoken");
const { HttpStatusCode } = require("axios");

/**
 * Middleware to authorize access token from request header.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the call stack.
 */
const authorizeAccessTokenMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(HttpStatusCode.Unauthorized); // Unauthorized if token is not provided
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(HttpStatusCode.Forbidden); // Forbidden if token is invalid
    }

    req.user = user; // Add the user payload to the request object
    next(); // Proceed to the next middleware
  });
};

module.exports = authorizeAccessTokenMiddleware;
