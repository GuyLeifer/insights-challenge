import React, { useState, useEffect } from 'react';
import './Searchbar.css';
import axios from 'axios';

// icons
import searchIcon from './images/searchIcon.png';
import postIcon from './images/postIcon.png';

function Searchbar() {

    const [options, setOptions] = useState([]);

    const changeHandler = async (e) => {
        try {
            const { data } = await axios.get(`/elasticsearch/all?params=${e.target.value}`);
            console.log(data)
            if(data) {
                setOptions(data);
            } else {
                setOptions([])
            }
            }
            catch(err) {
                console.log(err.massage);
            }
    }
    const goToPage = (id) => {
        const link = `/posts/${id}`;
        window.location.href = link;
    }

    return (
        <div className="searchContainer">
            <img className="search-icon" src={searchIcon} alt="search"/>
            <input 
                id="search"
                type="search" 
                onChange={(e) => changeHandler(e)}
            />
            <div className="options">
            {options.length > 0 && (
                options.map(index => 
                    index.length > 0 ?
                        index.map(item => 
                            <div 
                            className={"optionPost"} 
                            key={"post " + item.id}
                            onClick={() => goToPage(item.id)}
                            >
                                <div className="optionName">{item.title}</div>
                                <div className="optionIconDiv">
                                <img className="optionIcon" src={postIcon} alt="postIcon" />
                                </div>
                            </div>
                        )
                    :   <div> </div>  
                )
            )}
            </div>
        </div> 
    )
}

export default Searchbar