const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    author: { type: String }, 
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('posts', postSchema)