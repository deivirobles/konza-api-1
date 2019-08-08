const mongoose = require('mongoose');

/*
 * Definimos los nombres y el tipo de los campos
 * del modelo y finalmente utilizamos el metodo
 * model de mongoose para declarar este modelo
 * es importante nombrar que este se crea una
 * sola vez en la aplicación no importa el numero
 * de veces que se importe este modulo. Es un
 * Singleton
 */
const task = {
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
};

module.exports = mongoose.model('task', task);
