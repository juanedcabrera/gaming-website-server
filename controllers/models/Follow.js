// require odm
const mongoose = require('mongoose')

// schema
const followSchema = new mongoose.Schema({
    follower_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

// module exports
const Follow = mongoose.model('Follow', followSchema)
module_exports = Follow