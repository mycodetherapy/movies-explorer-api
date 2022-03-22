const mongoose = require('mongoose');
const validator = require('validator');

const muvieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },

  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Поле должно содержать ссылку.',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Поле должно содержать ссылку.',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Поле должно содержать ссылку.',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('muvie', muvieSchema);
