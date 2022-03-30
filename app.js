const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./limiter');
const errorsHandler = require('./middlewares/error-handler');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// npx eslint . --fix
