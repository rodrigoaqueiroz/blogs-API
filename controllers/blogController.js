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

module.exports = {
  createPost,
  getPosts,
};
