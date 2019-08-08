const HTTP_STATUS_CODE = require('http-status-codes');

const Model = require('./model');

exports.create = (req, res, next) => {
  const { body = {} } = req;

  Model.create(body, (err, doc) => {
    if (err) {
      next(err);
    } else {
      res.status(HTTP_STATUS_CODE.CREATED);
      res.json({
        data: doc,
        success: true,
        statusCode: HTTP_STATUS_CODE.CREATED,
      });
    }
  });
};

exports.all = (req, res, next) => {
  Model.find().exec((err, docs) => {
    if (err) {
      next(err);
    } else {
      res.json({
        data: docs,
        success: true,
        statusCode: HTTP_STATUS_CODE.OK,
      });
    }
  });
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  /*
   * Aqui hacemos algo muy parecido a lo que
   * hicimos en el middleware all y es hacer
   * un Query a la base de datos, lo unico
   * diferente es que estamos utilizando una
   * función especifica llamada findById,
   * adicionalmente puede que la operacion
   * sea exitosa, pero puede pasar que el
   * documento no se encuentre por lo tanto
   * debemos preguntar si el doc no es vacio
   * para garantizar que si se encontro
   */

  Model.findById(id).exec((err, doc) => {
    if (err) {
      next(err);
    } else if (doc) {
      res.json({
        data: doc,
        success: true,
        statusCode: HTTP_STATUS_CODE.OK,
      });
    } else {
      next({
        message: 'Resource not found',
        statusCode: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }
  });
};

exports.update = (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  const doc = {
    ...body,
    id,
  };

  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS_CODE.OK,
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  const doc = {
    id,
  };

  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS_CODE.OK,
  });
};
