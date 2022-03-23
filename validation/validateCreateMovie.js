const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateCreateMovie = celebrate({
  body: {
    country: Joi.string().min(2).max(74).required()
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 74 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    director: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 30 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    duration: Joi.number().integer().min(1).max(10000)
      .positive()
      .required()
      .messages({
        'number.min': 'Минимальная продолжительность 1 минута.',
        'number.max': 'Максимальная продолжительность 10000 минут.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    year: Joi.string().length(4).required()
      .messages({
        'string.length': 'Поле должно содержать 4 символа.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    description: Joi.string().min(2).max(300).required()
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 300 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле должно содержать ссылку.');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения.',
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле должно содержать ссылку.');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения.',
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле должно содержать ссылку.');
      })
      .messages({
        'any.required': 'Поле обязательно для заполнения.',
      }),
    nameRU: Joi.string().min(2).max(300).required()
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 50 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
    nameEN: Joi.string().min(2).max(300).required()
      .messages({
        'string.min': 'Минимальная длина поля 2 символа.',
        'string.max': 'Максимальная длина поля 50 символов.',
        'any.required': 'Поле обязательно для заполнения.',
      }),
  },
});

module.exports = validateCreateMovie;
