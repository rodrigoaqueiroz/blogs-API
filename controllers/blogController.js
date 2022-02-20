const Blog = require('../services/blogService');

const createPost = async (req, res) => {
  const data = req.body;
  const { email } = req.user;
  const { status, info } = await Blog.createPost(data, email);
  return res.status(status).json(info);
};

const getPosts = async (_req, res) => {
  const { status, info } = await Blog.getPost();
  return res.status(status).json(info);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { message, status, info } = await Blog.getPostById(id);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(info);
};

const putPost = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { email } = req.user;
  const { status, getUpdated, message } = await Blog.putPost(data, id, email);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(getUpdated);
};

module.exports = {
  createPost,
  getPosts,
  getById,
  putPost,
};
