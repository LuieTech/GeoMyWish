const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    minlength: [3, 'Title min 3 chars.'],
    maxlength: [20, 'Title max 20 chars.'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: 'N/A',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
}
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
