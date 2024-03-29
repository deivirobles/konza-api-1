require('dotenv').config('');

const config = {
  server: {
    port: process.env.PORT || 3000,
    origin: (process.env.SERVER_ORIGIN && process.env.SERVER_ORIGIN.split(',')) || '*',
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
  sort: {
    sortBy: {
      default: 'createdAt',
      fields: ['createdAt', 'updatedAt'],
    },
    direction: {
      default: 'desc',
      options: ['asc', 'desc'],
    },
  },
  populate: {
    virtuals: {
      limit: 10,
      sort: 'createdAt',
      direction: 'desc',
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
};

module.exports = config;
