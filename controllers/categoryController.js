const Categories = require('../services/categoryService');
const { statusCode } = require('../utils/statusCode');
const { errorMessages } = require('../utils/errorMessages');

const createCategory = async (req, res) => {
  const { name } = req.body;
  console.log(`estou no controller testando o name: ${name}`);
  if (!name) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.badRequestNullName });
  }
    const { status, info } = await Categories.createCategory(name);
  return res.status(status).json(info);
};

module.exports = {
  createCategory,
};