const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  lastname: {
    type: String,
    default: '',
    trim: true,
    maxlength: 128,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  profilePhoto: {
    type: String,
    trim: true,
    default: '',
  },
};

const user = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

user
  .virtual('fullname')
  .get(
    // prettier-ignore
    function getName() {
      return `${this.firstname} ${this.lastname}`;
    },
  )
  .set(
    // prettier-ignore
    function setName(fullname) {
      const [firstname = '', lastname = ''] = fullname.split(' ');
      this.firstname = firstname;
      this.lastname = lastname;
    },
  );

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
