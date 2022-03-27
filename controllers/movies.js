const Movie = require('../models/movie');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ userId })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const idMovie = req.params.movieId;
  const userId = req.user._id;
  Movie.findById(idMovie)
    .then((cardData) => {
      if (cardData) {
        if (String(cardData.owner).includes(userId)) {
          return Movie.findByIdAndRemove(idMovie)
            .then(() => {
              res.send({ message: 'Фильм удален.' });
            })
            .catch(next);
        }
        return next(new ForbiddenError('Вы не можете удалять чужие фильмы.'));
      }
      return next(new NotFoundError('Фильм не найден.'));
    })
    .catch(next);
};
