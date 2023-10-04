// require ODM
const mongoose = require('mongoose')

//schema
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
      },
    category: {
        type: String,
        required: true
    },
    techstack: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }
    ],
    views: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
         default: 0
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

//module exports
const Game = mongoose.model('Game', gameSchema)
module.exports = Game