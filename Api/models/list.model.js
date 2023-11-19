const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupList',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
    minlength: [3, 'Title min 3 chars.'],
    maxlength: [20, 'Title max 20 chars.'],
    trim: true,
  },
  description: {
    type: String,
    minlength: [3, 'Description min 3 chars.'],
    maxlength: [100, 'Description max 100 chars.'],
    default: 'N/A',
    trim: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
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
      return ret;
    }
  }
});

listSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'list',
  localField: '_id',
});

const List = mongoose.model('List', listSchema);

module.exports = List;