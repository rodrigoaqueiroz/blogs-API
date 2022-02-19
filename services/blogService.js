const { BlogPosts, User } = require('../models');
const { statusCode } = require('../utils/statusCode');

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

module.exports = {
  createPost,
};
