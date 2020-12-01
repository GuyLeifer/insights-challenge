import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom'
// icons
import eighteenIcon from './images/eighteenIcon.jpg';

function Header() {
    return (
        <div>
            <header className="header">
                <h1>This is A Scraping Dark Web App</h1> 
                <Link to="/about">          
                    <img className="eighteenIcon" src ={eighteenIcon} alt="18+"/>
                </Link> 
            </header>
        </div>
    )
}

export default Header
