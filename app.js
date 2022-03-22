const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  // useUnifiedTopology: true
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// npx eslint . --fix
