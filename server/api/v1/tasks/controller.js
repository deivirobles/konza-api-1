const HTTP_STATUS_CODE = require('http-status-codes');

const {
  Model,
  fields,
  references,
} = require('./model');
const {
  paginationParseParams,
} = require('./../../../utils');
const {
  sortParseParams,
  sortCompactToStr,
} = require('./../../../utils');

/*
 * Obtenemos un Array con los nombres de las llaves
 * de las referencias
 */
const referencesNames = Object.getOwnPropertyNames(references);

exports.id = async (req, res, next, id) => {
  try {
    /*
     * Creamos una cadena con los nombres de las
     * referencias separadas por espacio pues asi
     * lo requiere el metodo populate
     */
    const populate = referencesNames.join(' ');
    const doc = await Model.findById(id).populate(populate).exec();
    if (doc) {
      req.doc = doc;
      next();
    } else {
      next({
        message: 'Resource not found',
        statusCode: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const {
    body = {},
  } = req;

  try {
    const doc = await Model.create(body);

    res.status(HTTP_STATUS_CODE.CREATED);
    res.json({
      data: doc,
      success: true,
      statusCode: HTTP_STATUS_CODE.CREATED,
    });
  } catch (err) {
    next(err);
  }
};

exports.all = async (req, res, next) => {
  const {
    query = {},
  } = req;
  const {
    limit,
    page,
    skip,
  } = paginationParseParams(query);
  const {
    sortBy,
    direction,
  } = sortParseParams(query, fields);
  const sort = sortCompactToStr(sortBy, direction);
  const populate = referencesNames.join(' ');

  try {
    const all = Model.find()
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate)
      .exec();
    const count = Model.countDocuments();

    const [docs, total] = await Promise.all([all, count]);
    const pages = Math.ceil(total / limit);
    res.json({
      data: docs,
      success: true,
      statusCode: HTTP_STATUS_CODE.OK,
      meta: {
        sortBy,
        direction,
        limit,
        skip,
        page,
        pages,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.read = (req, res, next) => {
  const {
    doc,
  } = req;

  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS_CODE.OK,
  });
};

exports.update = async (req, res, next) => {
  try {
    const {
      body = {}, doc,
    } = req;

    Object.assign(doc, body);
    const updated = await doc.save();

    res.json({
      data: updated,
      success: true,
      statusCode: HTTP_STATUS_CODE.OK,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {
      doc,
    } = req;

    const deleted = await doc.remove();
    res.json({
      data: deleted,
      success: true,
      statusCode: HTTP_STATUS_CODE.OK,
    });
  } catch (err) {
    next(err);
  }
};
