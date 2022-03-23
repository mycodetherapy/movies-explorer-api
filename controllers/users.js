const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, BadRequestError, DuplicateEmailError } = require('../errors');

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.status(200).send({
      data: {
        name, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new DuplicateEmailError('Пользователь с таким эмейлом уже существует.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      // const id = user._id;
      res.send({ token });
    }).catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  // console.log(req.body._id);
  User.findById(req.user._id)
  // User.findById(req.body._id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  console.log(req.body);
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
