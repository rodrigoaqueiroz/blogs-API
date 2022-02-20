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
const putPost = async (info, id, email) => {
  const { userId, published } = await BlogPosts.findByPk(id);
  const getUser = await User.findOne({ where: { email } });
  if (getUser.id !== userId) {
    return { status: statusCode.UNAUTHORIZED, message: errorMessages.unauthorizedUser };
  }
  const { title, content, categoryIds } = info;
  if (categoryIds) {
    return { status: statusCode.BAD_REQUEST, message: errorMessages.badRequestPutCategory };
  }
  // Limite de 20 linhas por função
  await BlogPosts.update(
  { title, content, userId, published, updated: new Date() }, { where: { id } },
  );
  // referência: https://medium.com/@sarahdherr/sequelizes-update-method-example-included-39dfed6821d
  const getUpdated = await BlogPosts.findByPk(id, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { status: statusCode.OK, getUpdated };
};

const delPost = async (id, email) => {
  const getById = await BlogPosts.findByPk(id);
  if (!getById) {
    return { status: statusCode.NOT_FOUND, message: errorMessages.notFoundPost };
  }
  const user = await User.findOne({ where: { email } });
  if (user.id !== getById.userId) {
    return { status: statusCode.UNAUTHORIZED, message: errorMessages.unauthorizedUser };
  }
  await BlogPosts.destroy({ where: { id } });
  return { status: statusCode.NO_CONTENT };
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  putPost,
  delPost,
};
