const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateRegisterBody } = require('../validation');

router.post('/signup', validateRegisterBody, createUser);

module.exports = router;