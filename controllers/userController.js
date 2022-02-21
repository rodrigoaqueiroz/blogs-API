const Users = require('../services/userService');

const createUser = async (req, res) => {
  const info = req.body;
  const { status, message, token } = await Users.createUser(info);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

const login = async (req, res, _next) => {
  const info = req.body;
  const { status, message, token } = await Users.login(info);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

const getAll = async (_req, res, _next) => {
  const { status, info } = await Users.getAll();
  return res.status(status).json(info);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, info } = await Users.getById(id);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(info);
};

const deleteMe = async (req, res) => {
  const { email } = req.user;
  const { status } = await Users.delMe(email);
  return res.status(status).send();
};

module.exports = {
  createUser,
  login,
  getAll,
  getById,
  deleteMe,
};
