import React from 'react';
import './Navbar.css';

// icons
import homeIcon from './images/homeIcon.png';
import postsIcon from './images/postsIcon.png';
import aboutIcon from './images/aboutIcon.jpg';

function Navbar() {
    return (
        <div className="navbar">
            <div className="posts">
                <img className="navIcon" src={postsIcon} alt="Posts" />
            </div>
            <div className="home">
                <img className="navIcon" src={homeIcon} alt="Home" />
            </div>
            <div className="about">
                <img className="navIcon" src={aboutIcon} alt="About" />
            </div>
        </div>
    )
}

export default Navbar
