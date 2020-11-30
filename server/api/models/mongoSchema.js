const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    author: { type: String }, 
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;