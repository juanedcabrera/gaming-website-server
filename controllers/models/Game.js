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
<<<<<<< HEAD
=======
    userId: {
        type: String,
        required: true,
      },
>>>>>>> upload
    category: {
        type: String,
        required: true
    },
    techstack: {
        type: String,
    },
<<<<<<< HEAD
=======
    link: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
>>>>>>> upload
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
         default: 0
    },
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