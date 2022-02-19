const Users = require('../services/userService');

const createUser = async (req, res) => {
  const info = req.body;
  const { status, message, token } = await Users.createUser(info);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(token);
};

const login = async (req, res, _next) => {
  const info = req.body;
  const { status, message, token } = await Users.login(info);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

module.exports = {
  createUser,
  login,
};
