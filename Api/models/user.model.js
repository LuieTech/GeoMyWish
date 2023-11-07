const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
    minlength: [3, 'Username min 3 chars.'],
    maxlength: [20, 'Username max 20 chars.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
}
);

schema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'user'
});

schema.pre("save", function (next) {
  
  if (this.isModified("password")) {
    
    bcrypt.hash(this.password, 10).then((hash) => {

      this.password = hash;
      next();
    }).catch(err => next(err));
  } else {
    next();
  }
});


schema.methods.checkPassword = function (passwordToCheck) {

  return bcrypt.compare(passwordToCheck, this.password)

}

const User = mongoose.model('User', schema);

module.exports = User;