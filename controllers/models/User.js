<<<<<<< HEAD
// require mongoose ODM
const mongoose = require('mongoose');

// schema
=======
const mongoose = require('mongoose');

>>>>>>> upload
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true
=======
    unique: true,
>>>>>>> upload
  },
  userName: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// module.exports
=======
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
  ],
});

>>>>>>> upload
module.exports = mongoose.model('User', UserSchema);
