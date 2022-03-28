const { celebrate, Joi } = require('celebrate');

const validateLoginBody = celebrate({
  body: {
    password: Joi.string().min(4).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля 4 символа.',
        'string.max': 'Максимальная длина поля 30 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    email: Joi.string().required().email()
      .message({
        'any.required': 'Поле обязательно для заполнения.',
        'string.email': 'Поле должно содержать адрес электронной почты.',
      }),
  },
});

module.exports = validateLoginBody;
