
const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
