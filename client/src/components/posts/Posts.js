import React, {useEffect, useState} from 'react';
import './Posts.css'
import axios from 'axios';

import Post from './Post';

function Posts() {

    const [posts, setPosts] = useState();
    const [counter, setCounter] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/posts');
        console.log(data)
        setPosts(data)
        setCounter(data.length)
        })()
    }, [])


    return (
        <div>
            {counter && (
                counter > 1 ? <div className="counter">Showing {counter} Posts</div>
                : counter === 1 ? <div className="counter">Showing {counter} Post</div>
                : <div className="counter">No Posts Available</div>
            )}
            {posts ? posts.map(post => <Post post={post} />) : null}
        </div>
    )
}

export default Posts
