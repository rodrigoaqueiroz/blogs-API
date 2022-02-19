const { errorMessages } = require('../utils/errorMessages');
const { statusCode } = require('../utils/statusCode');
const { Category } = require('../models');

const verifyTitle = (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestNullTitle, 
    });
  }
  if (!content) {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestNullContent, 
    });
  }
  next();
};

const verifyCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestNullCategoryIDs, 
    });
  }
  const getId = await Category.findOne({ where: { id: categoryIds[0] } });
  if (!getId) {
    console.log(`ERRO EM VER A CATEGORIA INEXISTENTE, TESTE DA CATEGORYID: ${categoryIds}`);
    return res.status(statusCode.BAD_REQUEST).json({ 
      message: errorMessages.badRequestInvalidCategoryIDs, 
    });
  }
  next();
};

module.exports = {
  verifyTitle,
  verifyCategories,
};
