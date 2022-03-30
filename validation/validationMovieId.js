const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

module.exports = validationMovieId;
