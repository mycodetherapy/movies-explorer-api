const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthorizedError } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Василий',
    minlength: 2,
    maxlength: 30,
  },
  // about: {
  //   type: String,
  //   default: 'Модифицирую лапки силой мысли.',
  //   minlength: 2,
  //   maxlength: 100,
  // },
  // portfolio: {
  //   default: [{'Веселая котовасия': 'https://www.emsclinic.ru/news/kotovasiya'}],
  // },
  // avatar: {
  //   type: String,
  //   default: 'https://i05.fotocdn.net/s128/7a09d725312ffdf8/public_pin_l/2910241344.jpg',
  //   validate: {
  //     validator(value) {
  //       return validator.isURL(value);
  //     },
  //     message: 'Поле должно содержать ссылку.',
  //   },
  // },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Поле должно содержать адрес электронной почты.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
