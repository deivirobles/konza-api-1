const mongoose = require('mongoose');
const { body, sanitizeBody } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: 256,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: null,
  },
};

/*
 * Creamos un nuevo objeto con todos los campos
 * que seran referencias en este modelo, con el
 * objetivo de acceder a ellas posteriormente
 * para poder obtener sus datos correspondientes
 */

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project',
  },
};

/*
 * Utilizamos Object Spread Operator para
 * fusionar los fields y los references
 * en un solo Objeto que finalmente es lo
 * que recibira Schema
 */

const task = new Schema(
  {
    ...fields,
    ...references,
  },
  {
    timestamps: true,
  },
);

const sanitizers = [
  body('title').escape(),
  body('description').escape(),
  sanitizeBody('completed').toBoolean(),
  body('dueDate').toDate(),
];

/*
 * Finalmente exportamos el nuevo objeto
 * para poder referenciarlo en el controlador
 */

module.exports = {
  Model: mongoose.model('task', task),
  fields,
  references,
  sanitizers,
};
