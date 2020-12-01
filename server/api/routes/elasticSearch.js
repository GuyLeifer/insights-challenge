const { Router } = require('express');
const router = Router();

const Post = require('../models/mongoSchema');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const updateElasticData = async (index, dataArray) => {
    try {
        await client.indices.create(
            {
                index: index,
            }
        );
            const body = dataArray.flatMap((doc) => [
            { index: { _index: index } },
            doc,
        ]);
        const { body: bulkResponse } = await client.bulk({ refresh: true, body });
        if (bulkResponse.errors) {
            console.log("ERROR");
            return bulkResponse.errors;
        } else {
            const { body: count } = await client.count({ index: index });
            console.log(count);
            return bulkResponse;      
        } 
    } catch (err) {
        return(err.massage)
    }
}

const deleteElasticData = async ()=>{
    await client.indices.delete(
        {
            index: '*',
        }
    );
}

router.post('/all', async (req, res) => {
    try {
        const posts = await Post.find();
        const updatePosts = updateElasticData('posts', posts);
        res.send(updatePosts)
    } catch (err) {
        res.send(err.massage)
    }
})

router.delete('/all', async (req, res) => {
    try {
        deleteElasticData()
        res.send('all data deleted');
    } catch (err) {
        res.send(err.massage);
    }
})

async function existsIndex(ind) {
    return await client.indices.exists({index: ind}).then(res => res.body)
}
router.post('/posts', async (req, res) => {
    const { id, title, content, author, date } = req.body;
    if(await existsIndex("posts")) {
        const postsSearchIdResults = await client.search({ 
            index: 'posts',
            body: { 
                query: {
                    prefix: {
                        id: id
                    }
                }
            }
        })
        const postIdList = postsSearchIdResults.body.hits.hits;
        console.log(postIdList)
        if (postIdList.length > 0) {
            res.status(301).send("post already in elastic data")
        } 
        else {
            try {
                const post = await client.index({
                    index: 'posts',
                    body: {
                        id: id,
                        title: title,
                        content: content,
                        author: author, 
                        date: date
                    }
                })
                res.send(post)
            } catch (err) {
                res.send(err.massage)
            }
        }
    } else {
        try {
            await client.indices.create(
                {
                    index: "posts",
                }
            );
            const post = await client.index({
                index: 'posts',
                body: {
                    id: id,
                    title: title,
                    content: content,
                    author: author, 
                    date: date
                }
            })
            res.send(post)
        } catch (err) {
            res.send(err.massage)
        }
    }
})

router.get("/all", async (req, res) => {
    const name = req.query.params;
    if (name === "") res.send([])
    else {
        try {
            const postsSearchTitleResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            title: name
                        }
                    }
                }
            })
    
            const postsSearchContentResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            content: name
                        }
                    }
                }
            })
    
            const postsSearchAuthorResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {
                            author: name
                        }
                    }
                }
            })
    
            const postsSearchDateResults = await client.search({ 
                index: 'posts',
                size: 3,
                body: { 
                    query: {
                        prefix: {               
                            date: name
                        }
                    }
                }
            })
            
            res.send([postsSearchTitleResults.body.hits.hits, postsSearchContentResults.body.hits.hits, postsSearchAuthorResults.body.hits.hits, postsSearchDateResults.body.hits.hits])
        } catch (e) {
            res.send(e.message);
        }
    };
});

module.exports = router;