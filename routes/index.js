const express = require('express');
const Users = require('../controllers/userController');
const validations = require('../middlewares/validationUser');

const { verifyDisplayName, verifyEmail, verifyPassword } = validations;

const router = express.Router();

router.post('/user', [verifyDisplayName, verifyEmail, verifyPassword, Users.createUser]);
router.post('/login', [verifyEmail, verifyPassword, Users.login]);

module.exports = router;