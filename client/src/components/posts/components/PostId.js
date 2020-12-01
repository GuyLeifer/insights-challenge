import React, { useEffect, useState } from 'react';
import './PostId.css';

import axios from 'axios';
import GenericNotFound from '../../../components/genericNotFound/GenericNotFound'

function PostId({ match}) {
    const [post, setPost] = useState();
    const { id } = match.params;

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/elasticsearch/id/${id}`);
            setPost(data[0])
        })()
    }, [])
    
    return (
        <>
        {post &&
            post.title ?
            <div className="postId">
                <h2>{post.title}</h2>
                <div className="content">{post.content}</div>
                <div className="footer">
                    <div className="info">
                        <div className="author">Author: {post.author}</div>                
                        <div className="date">Date: {post.date}</div>
                    </div>
                </div>
            </div>
            : <GenericNotFound />
        }
        </>
    )
}

export default PostId
