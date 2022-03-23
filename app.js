const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./limiter');
const auth = require('./middlewares/auth');
const { validateRegisterBody } = require('./validation');
const { login, createUser } = require('./controllers/users');
const errorsHandler = require('./middlewares/error-handler');
const { NotFoundError } = require('./errors');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.post('/signin', validateRegisterBody, login);
app.post('/signup', validateRegisterBody, createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не существует.'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// npx eslint . --fix
