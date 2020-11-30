import React from 'react';
import './Header.css';


// icons
import eighteenIcon from './images/eighteenIcon.jpg';

function Header() {
    return (
        <div>
            <header className="header">
                <h1>This is A Scraping Dark Web App</h1>            
                <img className="eighteenIcon" src ={eighteenIcon} alt="18+"/>
            </header>
        </div>
    )
}

export default Header
