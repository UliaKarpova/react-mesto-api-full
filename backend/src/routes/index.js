const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./usersRoutes');
const cardsRouter = require('./cardsRoutes');
const auth = require('../middlewares/auth');
const {
  login, createUser,
} = require('../controllers/usersController');

const regex = require('../utils/regex');

const notFoundErrorMessage = 'Роут не найден';
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/', () => {
  throw new NotFoundError(notFoundErrorMessage);
});

module.exports = router;
