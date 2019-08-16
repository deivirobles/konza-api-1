const mongoose = require('mongoose');
const { body } = require('express-validator');

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
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

/*
 * En la configuracion del Schema indicamos que
 * cada vez que vayamos a dar una respuesta en
 * formato JSON incluya los campos virtuales
 */

const project = new Schema(
  {
    ...fields,
    ...references,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

/*
 * Creamos un objeto virtuals que va a tener
 * todos los campos virtuales donde se referencia
 * el modelo, la llave local y la llave foranea
 * que se utilizara para hacer populate de este campo
 */

const virtuals = {
  tasks: {
    ref: 'task',
    localField: '_id',
    foreignField: 'projectId',
  },
};

/*
 * Añadimos este campo con la referencia tasks
 */

project.virtual('tasks', virtuals.tasks);

const sanitizers = [body('title').escape(), body('description').escape()];

module.exports = {
  Model: mongoose.model('project', project),
  fields,
  references,
  virtuals,
  sanitizers,
};
