import React from 'react';
import './Post.css';

function Post({ post }) {
    return (
        <div className="post">
            <h2>{post.title}</h2>
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
