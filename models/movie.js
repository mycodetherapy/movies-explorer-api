const mongoose = require('mongoose');
const validator = require('validator');

const muvieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 74,
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
    length: 4,
  },

  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
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
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },

  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

module.exports = mongoose.model('muvie', muvieSchema);
