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
router.get('/post', [verifyToken, BlogPost.getPosts]);
router.get('/post/:id', [verifyToken, BlogPost.getById]);
router.put('/post/:id', [verifyToken, verifyTitle, BlogPost.putPost]);
router.delete('/post/:id', [verifyToken, BlogPost.deletePost]);
router.delete('/user/me', [verifyToken, Users.deleteMe]);

module.exports = router;
