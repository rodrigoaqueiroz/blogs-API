const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { statusCode } = require('../utils/statusCode');
const { errorMessages } = require('../utils/errorMessages');

const createUser = async (info) => {
  const { email } = info;
  const getEmail = await User.findOne({ where: { email } });
  const secret = 'superSecretPassword';
  if (getEmail) return { status: statusCode.CONFLICT, message: errorMessages.conflictEmail };
  await User.create(info);
  const jwtConfig = {
    expiresIn: '14d',
    algorithm: 'HS256',
  };
  const payload = { email };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { status: statusCode.CREATED, token };
};

module.exports = {
  createUser,
};
