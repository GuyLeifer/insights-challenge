const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const Post = require('../models/mongoSchema');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err.reason));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

router.post('/', (req, res) => {
    try {
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: req.body.date,
            tags: req.body.tags
        })
        post.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        res.status(201).send(post)
    } catch (err) {
        console.log(err.massage)
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        const sortedPostsByDate = posts.sort((a, b) => b.date - a.date)
        res.send(sortedPostsByDate)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;