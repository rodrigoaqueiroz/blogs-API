const express = require('express');
const Users = require('../controllers/userController');
const validations = require('../middlewares/validationUser');

const { verifyDisplayName, verifyEmail, verifyPassword, verifyToken } = validations;

const router = express.Router();

router.post('/user', [verifyDisplayName, verifyEmail, verifyPassword, Users.createUser]);
router.post('/login', [verifyEmail, verifyPassword, Users.login]);
router.get('/user', [verifyToken, Users.get]);

module.exports = router;