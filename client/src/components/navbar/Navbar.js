import React from 'react';
import './Navbar.css';

import { Link, Router } from "react-router-dom";

// icons
import homeIcon from './images/homeIcon.png';
import postsIcon from './images/postsIcon.png';
import aboutIcon from './images/aboutIcon.jpg';

function Navbar() {
    return (
        <div className="navbar">
            <div className="postsLink">
                <Link to="/posts">
                    <img className="navIcon" src={postsIcon} alt="Posts" />
                </Link>
            </div>
            <div className="homeLink">
                <Link to="/">
                    <img className="navIcon" src={homeIcon} alt="Home" />
                </Link>
            </div>
            <div className="aboutLink">
                <Link to="/about">
                    <img className="navIcon" src={aboutIcon} alt="About" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
