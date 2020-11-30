import React from 'react';
import './Counter.css';

function Counter({ counter, restore, initialCounter }) {

    return (
        <div className="counter">
            {
                counter > 1 ? <div className="counterSentence">Showing {counter} Posts</div>
                : counter === 1 ? <div className="counterSentence">Showing {counter} Post</div>
                : counter === 0 ?<div className="counterSentence">No Posts Available</div>
                : null
            }
            {initialCounter > counter &&
                <button id="restoreHidePosts" onClick={restore}>restore</button>
            }
        </div>
    )
}

export default Counter
