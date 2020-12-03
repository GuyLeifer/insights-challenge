const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    _id: String ,
    title: String ,
    content: String ,
    author: String , 
    date: Date,
    tags: [String]
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;