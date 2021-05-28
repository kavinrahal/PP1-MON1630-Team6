import React, { useState } from 'react';
import { useHistory } from "react-router";
import './styles/LoginPage.css'
import Image from '../addons/loginlogo.png';
import Link from 'react-router-dom/Link'
import Popup from './Popup'


function LoginPage() {
    const history = useHistory();
    const [customerList, setCustomerList] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(new Map);
    const [loginFailed, setLoginFailed] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);


    const validate = () => {
        let retVal = true

        // Checking for empty form values
        let fieldsName = ['email', 'password']
        let fields = [email, password]
        let error_sections = new Map()
        for (let k = 0; k < fields.length; k++) {
            if (fields[k] == "") {
                error_sections.set(fieldsName[k], "Required")
                retVal = false
            }
        }
        setErrors(error_sections)
        return retVal
    }


    const handleLogin = async () => {
        setIsLoggingIn(true)
        if (validate()) {
            let found = false;
            const res = await fetch("https://localhost:5001/api/customer")
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw response
                }).catch(error => {
                    console.log(error)
                })


            for (let index = 0; index < res.length; index++) {
                if (email == res[index].email && password == res[index].email) {
                    //Login successful
                    found = true;
                    // reset fields
                    setEmail("")
                    setPassword("")
                    setIsLoggingIn(false)
                    // Set Session Variable
                    sessionStorage.setItem("username", res[index].customerName)
                    sessionStorage.setItem("isLoggedIn", true)
                    // redirect 
                    history.push({
                        pathname: '/dashboard',
                    });
                }
            }
            if (!found) {
                // set error message
                console.log('failed')
                setIsLoggingIn(false)
                setLoginFailed(true)
            }
        }
    }

    return (
        <div className="LoginWrapper">
            {isLoggingIn && <Popup
                content={<>
                    <b>Design your Popup</b>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button>Test button</button>
                </>}
            // handleClose={ }
            />}
            <div className="row">
                <div className="longColumn">
                    <div className="row1 title">
                        <div className="whiteT">Car</div>
                        <div className="yellowT">Share</div>
                        <div className="whiteT">Scheme</div>
                    </div>
                    <div className="quote">
                        <div className="drive">Drive Anywhere You Want,</div>
                        <div className="with">With Just a Few Clicks.</div>
                        <img className="midlogo" src={Image}></img>
                    </div>
                    <div className="about">Get to know more about us!</div>
                </div>
                <div className="column">
                    <div className="loginSignup">
                        <div className="loginTitle">
                            <div className="Log">Log In</div>
                        </div>
                        <div className="email">
                            <div className="emailLabel">Email <span class="errorMessage"> {errors.get("password")} </span> </div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className="loginInput"
                                placeholder="  Email"
                                required></input>
                        </div>
                        <br></br>
                        <div className="password">
                            <div className="passwordLabel">Password <span class="errorMessage"> {errors.get("password")} </span> </div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="loginInput"
                                placeholder="  Password"
                                required></input>
                        </div>
                        <br></br>
                        {loginFailed && <div class="errorMessage" > sdsds </div>}
                        <button className="loginBtn" onClick={() => handleLogin()}>Log In</button>
                        <div className="or">or</div>
                        <div className="join">
                            <div className="Join">Join Us Today!</div>
                            <div className="joinText">Don't Have an Account Yet?</div>
                        </div>
                        <br></br>
                        <Link to="/dashboard"><button className="joinBtn">Sign Me Up!</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;