const express = require('express');
const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateCreateMovie, validationMovieId } = require('../validation');

router.get('/movies', getMovies);
router.post('/movies', express.json(), validateCreateMovie, createMovie);
router.delete('/movies/:movieId', validationMovieId, deleteMovie);

module.exports = router;
