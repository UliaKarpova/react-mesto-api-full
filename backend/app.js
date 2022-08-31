const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
/* const cors = require('cors'); */

const { login, createUser } = require('./src/controllers/usersController');

require('dotenv').config();
const auth = require('./src/middlewares/auth');

const userRoutes = require('./src/routes/usersRoutes');
const cardRoutes = require('./src/routes/cardsRoutes');

const NotFoundError = require('./src/errors/NotFoundError');

const notFoundErrorMessage = 'Роут не найден';
const errorProcessing = require('./src/middlewares/errorProcessing');
const { CORS } = require('./src/middlewares/CORS');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
const { requestLogger, errorLogger } = require('./src/middlewares/logger');

/* const corsOptions = {
  origin: 'https://learn.more.nomoredomains.sbs',
  credentials: true,
  optionsSuccessStatus: 200,
}; */

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

/* app.use(cors(corsOptions)); */

app.use(requestLogger);
app.use(CORS);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\.\w{2,3})(\/|\/([\w#!:.?+=&%!\-/]))?/),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('/', () => {
  throw new NotFoundError(notFoundErrorMessage);
});
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

/* app.use(routes); */

app.use(errorLogger);
app.use(errors());
app.use(errorProcessing);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
