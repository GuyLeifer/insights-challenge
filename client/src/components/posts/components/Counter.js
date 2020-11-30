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
                <div id="restoreHidePosts" onClick={restore}>Restore All</div>
            }
            {initialCounter > counter &&
                <div className="counterSentence">Hiding {initialCounter - counter} Posts</div>
            }
        </div>
    )
}

export default Counter
