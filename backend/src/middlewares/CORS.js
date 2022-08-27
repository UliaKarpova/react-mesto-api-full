const allowedCors = [
  'http://learn.more.nomoredomains.sbs/',
  'https://learn.more.nomoredomains.sbs/',
  'localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function CORS(req, res, next) {
  const { method } = req;
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  next();
}

module.exports = CORS;
