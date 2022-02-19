const { Categories } = require('../models/categoryModel');
const { statusCode } = require('../utils/statusCode');
// const { errorMessages } = require('../utils/errorMessages');

const createCategory = async (name) => {
  const postCategory = await Categories.create({ name });
  return { status: statusCode.CREATED, info: postCategory };
};

module.exports = {
  createCategory,
};