import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './styles/AboutUs.css';

function AboutUs(){
    return(
        <div className = "AboutUsWrapper">
            <div className="rowAbout">
                <div className = "aboutUsTitle">About Us</div>
                <div className="pageTitle">
                    <div className="whiteT">Car</div>
                    <div className="yellowT">Share</div>
                    <div className="whiteT">Scheme</div>
                </div>
            </div>
            
            <div className = "aboutDesc">
                <div>We are a group of Undergraduates currently enrolled in the Royal Melbourne Institute of Technology, who have a 
                passion for all things tech! This product was made as part of our Programming Project. The team is as follows.</div>

                <div className = "team">
                    <div>Daniel Jakrzewski</div>
                    <div>Kavin Abeysinghe</div>
                    <div>Daniel Wei-Yang Ong</div>
                    <div>Mitchell Dennis</div>
                    <div>Hon Khuin Jonathan Cheong</div>
                </div>

                <div className = "thankYou"> Thank you for Using our Product!</div>
                <br></br>
                <Link to = "/">Go Back</Link>

            </div>
        </div>
    );
}

export default AboutUs;