const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { statusCode } = require('../utils/statusCode');
const { errorMessages } = require('../utils/errorMessages');

const secret = 'superSecretPassword';

const createUser = async (info) => {
  const { email } = info;
  const getEmail = await User.findOne({ where: { email } });
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

const login = async (info) => {
  const { email } = info;
  const getEmail = await User.findOne({ where: { email } });
  if (!getEmail) return { status: statusCode.BAD_REQUEST, message: errorMessages.badRequestData };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const payload = { email };
  const token = jwt.sign(payload, secret, jwtConfig);
  return { status: statusCode.OK, token };
};

const get = async () => {
  const users = await User.findAll();
  return { status: statusCode.OK, info: users };
};

module.exports = {
  createUser,
  login,
  get,
  secret,
};
