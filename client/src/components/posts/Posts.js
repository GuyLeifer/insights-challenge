import React, {useEffect, useState} from 'react';
import './Posts.css';
import axios from 'axios';

import Post from './components/Post';
import Counter from './components/Counter';

function Posts() {

    const [posts, setPosts] = useState();
    const [counter, setCounter] = useState();
    const [initialCounter, setInitialCounter] = useState();
    const [restore, setRestore] = useState(1);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/posts');
        console.log(data)
        setPosts(data)
        setCounter(data.length)
        setInitialCounter(data.length)
        })()
    }, [])

    const increaseCounter = () => {
        setCounter(prev => prev - 1)
    }

     //restore 
    const restorePosts = () => {
        setCounter(0);
        setRestore(restore => restore * -1);
        setCounter(initialCounter);
    }
        
    return (
        <div className="postsRoute">
            <h2 className="postsH2">Dark - Web Posts</h2>
            {counter >= 0 ? <Counter counter={counter} restore={restorePosts} initialCounter={initialCounter}/> : null}
            {posts ? posts.map(post => <Post post={post} increaseCounter={increaseCounter} restore={restore} />) : null}
        </div>
    )
}

export default Posts
