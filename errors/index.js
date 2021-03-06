const NotFoundError = require('./NotFoundError');
const BadRequestError = require('./BadRequestError');
const DuplicateEmailError = require('./DuplicateEmailError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  NotFoundError,
  BadRequestError,
  DuplicateEmailError,
  UnauthorizedError,
  ForbiddenError,
};
