import React, { useState, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/LoginPage.css";
import Image from "../addons/loginlogo.png";
import bg from "../addons/circlebg.svg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    executeBasicAuthenticationService(email, password).then((response) => {
      console.log(response.data.name);
    });
  };
  const executeBasicAuthenticationService = async (email, password) => {
    // Authenicates User and passes username and password to backend
    const res = await fetch(`http://localhost:5001/auth/${email}/${password}`, {
      headers: {
        authorization: createBasicAuthToken(email, password),
      },
    });
    const data = await res.json();

    return data;
  };
  const createBasicAuthToken = (email, password) => {
    return "Basic " + window.btoa(email + ":" + password);
  };
  return (
    <div className="LoginWrapper">
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
              <div className="emailLabel">Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="loginInput"
                placeholder="  Email"
              ></input>
            </div>
            <br></br>
            <div className="password">
              <div className="passwordLabel">Password</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="loginInput"
                placeholder="  Password"
              ></input>
            </div>
            <br></br>
            <Link to="/dashboard">
              <button className="loginBtn">Log In</button>
            </Link>
            <div className="or">or</div>
            <div className="join">
              <div className="Join">Join Us Today!</div>
              <div className="joinText">Don't Have an Account Yet?</div>
            </div>
            <br></br>
            <Link to="/register">
              <button className="joinBtn">Sign Me Up!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
