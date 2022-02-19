const express = require('express');
const Users = require('../controllers/userController');
const validationsUser = require('../middlewares/validationUser');
const validationsBlog = require('../middlewares/validationBlog');
const Category = require('../controllers/categoryController');
const BlogPost = require('../controllers/blogController');

const { verifyDisplayName, verifyEmail, verifyPassword, verifyToken } = validationsUser;
const { verifyTitle, verifyCategories } = validationsBlog;

const router = express.Router();

router.post('/user', [verifyDisplayName, verifyEmail, verifyPassword, Users.createUser]);
router.post('/login', [verifyEmail, verifyPassword, Users.login]);
router.get('/user', [verifyToken, Users.getAll]);
router.get('/user/:id', [verifyToken, Users.getById]);
router.post('/categories', [verifyToken, Category.createCategory]);
router.get('/categories', [verifyToken, Category.getCategories]);
router.post('/post', [verifyToken, verifyTitle, verifyCategories, BlogPost.createPost]);
// router.get('/post', ...);
// router.get('/post/:id', ...);
// router.put('/post/:id', ...);
// router.delete('/post/:id', ...);
// router.delete('/user/me', ...);

module.exports = router;
