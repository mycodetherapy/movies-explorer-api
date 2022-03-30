const router = require('express').Router();
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const { validationUpdateUser } = require('../validation');

router.get('/users/me', getUserInfo);
router.patch('/users/me', validationUpdateUser, updateUser);

module.exports = router;
