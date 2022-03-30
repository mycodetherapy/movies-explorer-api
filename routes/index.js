const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateRegisterBody, validateLoginBody } = require('../validation');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors');

router.post('/signin', validateLoginBody, login);
router.post('/signup', validateRegisterBody, createUser);
router.use(auth);
router.use(require('./users'));
router.use(require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не существует.'));
});

module.exports = router;
