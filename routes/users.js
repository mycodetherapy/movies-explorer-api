const router = require('express').Router();
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const { validationUpdateUser } = require('../validation');

router.get('/me', getUserInfo);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
