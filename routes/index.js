const express = require('express');
const Users = require('../controllers/userController');
const validations = require('../middlewares/validationUser');
const Categories = require('../controllers/categoryController');

const { verifyDisplayName, verifyEmail, verifyPassword, verifyToken } = validations;

const router = express.Router();

router.post('/user', [verifyDisplayName, verifyEmail, verifyPassword, Users.createUser]);
router.post('/login', [verifyEmail, verifyPassword, Users.login]);
router.get('/user', [verifyToken, Users.getAll]);
router.get('/user/:id', [verifyToken, Users.getById]);
router.post('/categories', verifyToken, Categories.createCategory);

module.exports = router;
