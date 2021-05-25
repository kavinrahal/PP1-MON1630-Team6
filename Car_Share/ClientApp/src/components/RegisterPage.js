import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './styles/RegisterPage.css';
import Image from '../addons/reglogo.png';
import BackDrop from '../addons/City Backdrop.svg';

function RegisterPage(){
    return(
        <div className = "registerWrapper">
            <div className = "signUpRow">
                <div className = "signUpColumn">
                    <div className = "row1 title">
                        <div className = "whiteT">Car</div>
                        <div className = "yellowT">Share</div>
                        <div className = "whiteT">Scheme</div>
                    </div>
                    <div className = "quote">
                        <div className = "need">Need a ride but just for yourself?</div>
                        <div className = "we">We've got you covered.</div>
                        <img className = "signUpMidlogo" src = {Image}></img>
                    </div>
                    <div className = "low">
                        <img className = "lowlogo" src = {BackDrop}></img>
                    </div>
                </div>
                <div className = "signUplongColumn">
                    <div className = "signUpForm">
                        <div className = "signUpTitle">
                            <div className = 'sign'>Sign Up</div>
                        </div>
                        <br></br>
                        <div className = "description">
                            <div className = "desc">Let’ s get you all set up so you can verify your 
                            personal account and begin setting up your profile.</div>
                        </div>
                        <br></br>
                        <div className = "fields">
                            <div className = "names">
                                <div className = "first">
                                    <div className = "signUpLabel">Name</div>
                                    <input type = "text" className = "signUpText" placeholder = "  First Name" required></input>
                                </div>
                                <div className = "last">
                                    <div className = "signUpLabel">Address</div>
                                    <input type = "text" className = "signUpText" placeholder = "  Last Name" required></input>
                                </div>
                            </div>
                            <br></br>
                            <div className = "contact">
                                <div className = "signUpEmail">
                                    <div className = "signUpLabel">Email</div>
                                    <input type = "email" className = "signUpText" placeholder = "  Email" required></input>
                                </div>
                                <div className = "phone">
                                    <div className = "signUpLabel">Phone Number</div>
                                    <input type = "text" className = "signUpText" placeholder = "  Phone Number" required></input>
                                </div>
                            </div>
                            <br></br>
                            <div className = "passwords">
                                <div className = "signUpPassword">
                                    <div className = "signUpLabel">Password</div>
                                    <input type = "password" className = "signUpText" placeholder = "  Password" required></input>
                                </div>
                                <div className = "confirmPassword">
                                    <div className = "signUpLabel">Confirm Password</div>
                                    <input type = "password" className = "signUpText" placeholder = "  Confirm Password" required></input>
                                </div>
                            </div>
                            <br></br>
                            <button className = "confirmSignUpBtn">Sign Up!</button>
                            <br></br>
                            <br></br>
                            <div className = "already">
                                <div className = "alreadyText">Already Have an Account?</div>
                                <div className = "alreadyLog"><Link to = "/">Log In!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;