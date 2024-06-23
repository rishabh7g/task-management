const MESSAGE_AUTH_FAILED = "Authentication failed.";
const MESSAGE_EMAIL_NOT_EXISTS = "No account found for the given email.";
const MESSAGE_EMAIL_EXISTS = "Email exists already.";
const MESSAGE_INVALID_EMAIL_OR_PASSWORD = "Invalid email or password entered.";
const MESSAGE_INVALID_PASSWORD =
  "Invalid password. Must be at least 6 characters long.";
const MESSAGE_INVALID_CREDENTIALS = "Invalid credentials.";
const MESSAGE_USER_REGISTER_FAILED =
  "User registeration failed due to validation errors.";

const MESSAGE_USER_CREATED = "User created.";
const MESSAGE_REFRESH_TOKEN_NOT_FOUND =
  "Authentication failed: Refresh token is required.";
const MESSAGE_INVALID_REFRESH_TOKEN =
  "Authentication failed: Invalid refresh token.";
const MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN =
  "Authentication failed: Error verifying refresh token.";
const MESSAGE_ERROR_GENERATING_REFRESH_TOKEN =
  "Authentication failed: Unable to generate new access token.";

const MESSAGE_USER_NOT_FOUND = "User not found";
const MESSAGE_TASK_NOT_FOUND = "Task not found";

module.exports = {
  MESSAGE_AUTH_FAILED,
  MESSAGE_EMAIL_EXISTS,
  MESSAGE_EMAIL_NOT_EXISTS,
  MESSAGE_INVALID_EMAIL_OR_PASSWORD,
  MESSAGE_INVALID_PASSWORD,
  MESSAGE_INVALID_CREDENTIALS,
  MESSAGE_USER_REGISTER_FAILED,
  MESSAGE_USER_CREATED,
  MESSAGE_USER_NOT_FOUND,
  MESSAGE_TASK_NOT_FOUND,
  MESSAGE_REFRESH_TOKEN_NOT_FOUND,
  MESSAGE_INVALID_REFRESH_TOKEN,
  MESSAGE_ERROR_VERIFYING_REFRESH_TOKEN,
  MESSAGE_ERROR_GENERATING_REFRESH_TOKEN,
};
