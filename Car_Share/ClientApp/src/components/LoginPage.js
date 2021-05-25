import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './styles/LoginPage.css'
import Image from '../addons/loginlogo.png';
import bg from '../addons/circlebg.svg';

function LoginPage(){

    return(
        <div className = "LoginWrapper">
            <div className = "row">
                <div className = "longColumn">
                    <div className = "row1 title">
                        <div className = "whiteT">Car</div>
                        <div className = "yellowT">Share</div>
                        <div className = "whiteT">Scheme</div>
                    </div>
                    <div className = "quote">
                        <div className = "drive">Drive Anywhere You Want,</div>
                        <div className = "with">With Just a Few Clicks.</div>
                        <img className = "midlogo" src = {Image}></img>
                    </div>
                    <div className = "about">Get to know more about us!</div>
                </div>
                <div className = "column">
                    <div className = "loginSignup">
                        <div className = "loginTitle">
                            <div className = "Log">Log In</div>
                        </div>
                        <div className = "email">
                            <div className = "emailLabel">Email</div>
                            <input type = "text" className = "loginInput" placeholder = "  Email" required></input>
                        </div>
                        <br></br>
                        <div className = "password">
                            <div className = "passwordLabel">Password</div>
                            <input type = "password" className = "loginInput" placeholder = "  Password" required></input>
                        </div>
                        <br></br>
                        <Link to = "/dashboard"><button className = "loginBtn">Log In</button></Link>
                        <div className = "or">or</div>
                        <div className = "join">
                            <div className = "Join">Join Us Today!</div>
                            <div className = "joinText">Don't Have an Account Yet?</div>
                        </div>
                        <br></br>
                        <Link to = "/register"><button className = "joinBtn">Sign Me Up!</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;