// require ODM
const mongoose = require('mongoose')


//schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true,
    },
    imageLink: {
        type: String,
    },
    videoLink: {
        type: String,
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
const Post = mongoose.model('Post', postSchema)
module.exports = Post