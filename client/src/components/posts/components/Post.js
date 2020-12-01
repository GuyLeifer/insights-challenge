import React, { useEffect, useState} from 'react';
import './Post.css';

import { Link } from "react-router-dom";

function Post({ post, increaseCounter, restore }) {
    
    const [klass, setKlass] = useState('post');
    
    // restore
    useEffect(() => setKlass('post'), [restore]);
    

      // counter + class change
    const isHide = () => {
        setKlass('hiddenPost');
        increaseCounter();
    };


    return (
        <div className={klass}>
            <button className="hideTicketButton" onClick={isHide}>Hide</button>
            <Link to={`/posts/${post._id}`} post={post}>
                <h2>{post.title}</h2>
            </Link>
            <div className="content">{post.content}</div>
            <div className="footer">
                <div className="info">
                    <div className="author">Author: {post.author}</div>                
                    <div className="date">Date: {post.date}</div>
                </div>
            </div>
        </div>
    )   
}

export default Post
