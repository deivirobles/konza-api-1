const HTTP_STATUS_CODES = require('http-status-codes');
const { sign, verify } = require('jsonwebtoken');
// const { promisify } = require('util');

// const verifyAsync = promisify(verify);

const config = require('./../../config');

const { secret, expires } = config.token;

const signToken = (payload, expiresIn = expires) => sign(payload, secret, {
  algorithm: 'HS256',
  expiresIn,
});

const auth = (req, res, next) => {
  const { headers = {} } = req;
  const { authorization = {} } = headers;

  if (authorization) {
    const [, token] = authorization.split(' ');
    verify(token, secret, (err, decoded) => {
      if (err) {
        next({
          success: false,
          message: 'Unauthorized',
          statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next({
      success: false,
      message: 'Unauthorized',
      statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
    });
  }
};

module.exports = {
  signToken,
  auth,
};
