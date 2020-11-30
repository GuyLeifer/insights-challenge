const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => console.log(err.reason));

const Post = require('../models/mongoSchema');

router.post('/', (req, res) => {
    try {
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: req.body.date
        })
        post.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));
        res.status(201).send(post)
    } catch (err) {
        console.log(err.massage)
    }
})

module.exports = router;