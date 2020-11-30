import React from 'react';
import './About.css';

import darkWeb from './images/darkWeb.jpg'

function About() {
    return (
        <div className="about">
            <h3 className="aboutH3">Dark web definition</h3> 
            <p>
                The dark web is a part of the internet that isn't indexed by search engines. You've no doubt heard talk of the “dark web” as a hotbed of criminal activity — and it is. Researchers Daniel Moore and Thomas Rid of King's College in London classified the contents of 2,723 live dark web sites over a five-week period in 2015 and found that 57% host illicit material. 

                A 2019 study, Into the Web of Profit, conducted by Dr. Michael McGuires at the University of Surrey, shows that things have become worse. The number of dark web listings that could harm an enterprise has risen by 20% since 2016. Of all listings (excluding those selling drugs), 60% could potentially harm enterprises.
            </p>
            <img className="darkWebImg" src={darkWeb} alt=" dark web"/>
            <p>

                You can buy credit card numbers, all manner of drugs, guns, counterfeit money, stolen subscription credentials, hacked Netflix accounts and software that helps you break into other people’s computers. Buy login credentials to a $50,000 Bank of America account for $500. Get $3,000 in counterfeit $20 bills for $600. Buy seven prepaid debit cards, each with a $2,500 balance, for $500 (express shipping included). A “lifetime” Netflix premium account goes for $6. You can hire hackers to attack computers for you. You can buy usernames and passwords.

                But not everything is illegal, the dark web also has a legitimate side. For example, you can join a chess club or BlackBook, a social network described as the “the Facebook of Tor.”
            </p>  
        </div>
    )
}

export default About
