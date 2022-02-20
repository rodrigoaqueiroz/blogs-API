const { BlogPosts, User, Category } = require('../models');
const { statusCode } = require('../utils/statusCode');
const { errorMessages } = require('../utils/errorMessages');

const createPost = async (post, email) => {
  const { id } = await User.findOne({ where: { email } });
  const { title, content } = post;
  const addPost = await BlogPosts.create({
    title,
    content,
    userId: id,
    published: new Date(),
    updated: new Date(),
  });
  return { status: statusCode.CREATED, info: addPost };
};

// referência: https://sequelize.org/master/manual/model-querying-basics.html

const getPost = async () => {
  const info = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: statusCode.OK, info };
};

// referência: Revisão do Matheus Gaspar, aos 1:08:29 - me lembrar - é importante para transact!

const getPostById = async (id) => {
  const getById = await BlogPosts.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!getById) return { status: statusCode.NOT_FOUND, message: errorMessages.notFoundPost };
  return { status: statusCode.OK, info: getById };
};

module.exports = {
  createPost,
  getPost,
  getPostById,
};
