const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
