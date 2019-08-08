const HTTP_STATUS_CODE = require('http-status-codes');

// Importamos el modelo
const Model = require('./model');

exports.create = (req, res, next) => {
  const { body = {} } = req;

  /*
   * Utilizamos la función estatica del modelo
   * create para crear un nuevo documento
   * enviandole los campos que recibimos en el
   * objeto body del request (req), una vez el
   * documento es guardado en la base de datos
   * se ejecuta el callback que fue declarada
   * como segundo parametro, esta contiene el
   * objeto error si hubo alguno durante la
   * operacion y el documento que fue guardado
   * en la base de datos con todos sus campos
   * incluyendo los generados por la base de
   * datos
   */
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
  /*
   * Esta vez para consultar los campos utilizamos
   * la funcion estatica find que acepta como
   * parametros los criterios de busqueda pero
   * esta retorno un obejto especial de Mongoose
   * llamado Query que para ejecutarlo se debe
   * llamar la función exec que recibe como
   * parametro nuevamente el callback que se
   * ejecutara una vez finalice la operacion
   */
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

  const doc = {
    id,
  };

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
