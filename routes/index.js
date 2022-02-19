const express = require('express');
const Users = require('../controllers/userController');
const validations = require('../middlewares/validationUser');
const Category = require('../controllers/categoryController');

const { verifyDisplayName, verifyEmail, verifyPassword, verifyToken } = validations;

const router = express.Router();

router.post('/user', [verifyDisplayName, verifyEmail, verifyPassword, Users.createUser]);
router.post('/login', [verifyEmail, verifyPassword, Users.login]);
router.get('/user', [verifyToken, Users.getAll]);
router.get('/user/:id', [verifyToken, Users.getById]);
router.post('/categories', [verifyToken, Category.createCategory]);
router.get('/categories', [verifyToken, Category.getCategories]);
// router.post('/post', ...);
// router.get('/post', ...);
// router.get('/post/:id', ...);
// router.put('/post/:id', ...);
// router.delete('/post/:id', ...);
// router.delete('/user/me', ...);

module.exports = router;
