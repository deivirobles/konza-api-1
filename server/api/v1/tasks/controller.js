/*
 * En cada uno de los middleware creamos las
 * variables respectivas dependiendo de la
 * informacion que esta establecida para esa
 * ruta asociada (id) o enviada por el usuario
 * (body) estas extraidas de la peticion y
 * asinandoles un valor por defecto en el caso
 * que no existan en el objeto req.
 */
exports.create = (req, res, next) => {
  const { body = {} } = req;
  res.json(body);
};

exports.all = (req, res, next) => {
  res.json([]);
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};

exports.update = (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  res.json({
    id,
    body,
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};
