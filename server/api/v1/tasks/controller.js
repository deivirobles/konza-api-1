const HTTP_STATUS_CODE = require('http-status-codes');

const Model = require('./model');

exports.id = (req, res, next, id) => {
  Model.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        next({
          message: 'Resource not found',
          statusCode: HTTP_STATUS_CODE.NOT_FOUND,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.create = (req, res, next) => {
  const { body = {} } = req;

  Model.create(body)
    .then((doc) => {
      res.status(HTTP_STATUS_CODE.CREATED);
      res.json({
        data: doc,
        success: true,
        statusCode: HTTP_STATUS_CODE.CREATED,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.all = (req, res, next) => {
  Model.find()
    .exec()
    .then((docs) => {
      res.json({
        data: docs,
        success: true,
        statusCode: HTTP_STATUS_CODE.OK,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.read = (req, res, next) => {
  const { doc } = req;

  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS_CODE.OK,
  });
};

exports.update = (req, res, next) => {
  const { body = {}, doc } = req;

  Object.assign(doc, body);

  doc
    .save()
    .then((updated) => {
      res.json({
        data: updated,
        success: true,
        statusCode: HTTP_STATUS_CODE.OK,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete = (req, res, next) => {
  const { doc } = req;

  doc
    .remove()
    .then((deleted) => {
      res.json({
        data: deleted,
        success: true,
        statusCode: HTTP_STATUS_CODE.OK,
      });
    })
    .catch((err) => {
      next(err);
    });
};
