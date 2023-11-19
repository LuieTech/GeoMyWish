const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Store name is required.'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required.'],
    trim: true,
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
 
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});


storeSchema.index({ location: '2dsphere' });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
