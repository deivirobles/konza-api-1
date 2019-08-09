const HTTP_STATUS_CODE = require('http-status-codes');

const Model = require('./model');
const { paginationParseParams } = require('./../../../utils');

exports.id = async (req, res, next, id) => {
  try {
    const doc = await Model.findById(id).exec();
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
  const { body = {} } = req;

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
  const { query = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);

  try {
    const all = Model.find()
      .skip(skip)
      .limit(limit)
      .exec();
    const count = Model.countDocuments();

    const [docs, total] = await Promise.all([all, count]);
    const pages = Math.ceil(total / limit);
    res.json({
      data: docs,
      success: true,
      statusCode: HTTP_STATUS_CODE.OK,
      meta: {
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
  const { doc } = req;

  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS_CODE.OK,
  });
};

exports.update = async (req, res, next) => {
  try {
    const { body = {}, doc } = req;

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
    const { doc } = req;

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
