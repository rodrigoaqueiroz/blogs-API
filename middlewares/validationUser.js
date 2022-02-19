// const Joi = require('joi');
const { errorMessages } = require('../utils/errorMessages');
const { statusCode } = require('../utils/statusCode');

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
  if (!email) { 
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.badRequestNullEmail });
  }
  if (email === '') {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.badRequestEmptyEmail });
  }
  const regex = /\S+@\S+\.\S+/;
  // referência: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  if (!regex.test(email)) {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestInvalidEmail });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestNullPassword });
  }
  if (password === '') {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestEmptyPassword });
  }
  if (password.length !== 6) {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestInvalidPassword });
  }
  next();
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
};
