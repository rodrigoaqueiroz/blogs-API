// const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { errorMessages } = require('../utils/errorMessages');
const { statusCode } = require('../utils/statusCode');
const { secret } = require('../services/userService');
require('dotenv').config();

// const schema = Joi.string().not().empty().email()
// .required();

const verifyDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.badRequestName });
  }
  next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (typeof email === 'undefined') {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.badRequestNullEmail });
  }
  if (email === '') {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.badRequestEmptyEmail });
  }
  const regex = /\S+@\S+\.\S+/;
  // referência: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  if (!regex.test(email)) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: errorMessages.badRequestInvalidEmail,
    });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (typeof password === 'undefined') {
    return res.status(statusCode.BAD_REQUEST).json({
      message: errorMessages.badRequestNullPassword,
    });
  }
  if (password === '') {
    return res.status(statusCode.BAD_REQUEST).json({
      message: errorMessages.badRequestEmptyPassword,
    });
  }
  if (password.length !== 6) {
    return res.status(statusCode.BAD_REQUEST).json({
      message: errorMessages.badRequestInvalidPassword,
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(statusCode.UNAUTHORIZED).json({
      message: errorMessages.unauthorizedEmptyToken,
    });
  }
  try {
    const user = jwt.verify(authorization, secret);
    req.user = user;
    next();
  } catch (err) {
    return res.status(statusCode.UNAUTHORIZED).json({
      message: errorMessages.unauthorizedInvalidToken,
    });
  }
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyToken,
};
