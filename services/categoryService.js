const { Category } = require('../models');
const { statusCode } = require('../utils/statusCode');

const createCategory = async (name) => {
  console.log(`estou no service testando o name: ${name}`);
  const postCategory = await Category.create({ name });
  return { status: statusCode.CREATED, info: postCategory };
};

const getAll = async () => {
  const caregories = await Category.findAll();
  return { status: statusCode.OK, info: caregories };
};

module.exports = {
  createCategory,
  getAll,
};
