const HTTP_STATUS_CODE = require('http-status-codes');

const Model = require('./model');

/*
 * Utilizamos todo el codigo que teniamos en el
 * middleware de read con un solo cambio: en vez
 * de dar respuesta al usuario, adjuntamos al
 * objeto request (req) una llave llamada doc y
 * alli guardamos todo el documento, puesto que
 * el objeto request va a estar disponible en
 * todos los middlewares de esta peticion,
 * finalmente para seguir al siguiente middleware
 * invocamos la funcion next
 */
exports.id = (req, res, next, id) => {
  Model.findById(id).exec((err, doc) => {
    if (err) {
      next(err);
    } else if (doc) {
      req.doc = doc;
      next();
    } else {
      next({
        message: 'Resource not found',
        statusCode: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }
  });
};

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

/*
 * El codigo de read se ha simplificado mucho
 * pues el middleware de id se ha encargado
 * de todo y podemos confiar que el documento
 * se encuentra en el objeto request en la llave
 * req, de lo contrario ni si quiera hubiera
 * llegado aqui, pues el middleware de id lo
 * hubiera redireccionado al middleware de error
 */
exports.read = (req, res, next) => {
  const { doc } = req;

  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS_CODE.OK,
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
