const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listGroupSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: 'Group name is required',
      minLength: [3, 'Group name needs at least 3 chars'],
      maxLength: [20, 'Group name needs max 20 chars']
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
        return ret
      }
    }
  }
)

listGroupSchema.virtual('lists', {
  ref: 'List',
  foreignField: 'group',
  localField: '_id'

})


const ListGroups = mongoose.model('ListGroups', listGroupSchema);
module.exports = ListGroups;

