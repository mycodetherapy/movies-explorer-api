const { celebrate, Joi } = require('celebrate');

const validationUpdateUser = celebrate({
  body: {
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 30 символов.',
      }),
    email: Joi.string().email()
      .message({
        'string.email': 'Поле должно содержать адрес электронной почты.',
      }),
  },
});

module.exports = validationUpdateUser;
