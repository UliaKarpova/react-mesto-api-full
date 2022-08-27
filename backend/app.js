const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./src/routes/index');
require('dotenv').config();

const { CORS } = require('./src/middlewares/CORS');
const errorProcessing = require('./src/middlewares/errorProcessing');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
const { requestLogger, errorLogger } = require('./src/middlewares/logger');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(CORS);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorProcessing);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
