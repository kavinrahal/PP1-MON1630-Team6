import React, { useState, Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./styles/RegisterPage.css";
import Image from "../addons/reglogo.png";
import BackDrop from "../addons/City Backdrop.svg";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasRegisterFailed, setHasRegisteredFailed] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (password != confirmPassword) {
      alert("Password Mismatch!");
      history.push({
        pathname: "/",
        state: {
          response: "messageFromServer",
        },
      });
      return;
    }

    const customer = {
      name: name,
      email: email,
      address: address,
      mobile: mobile,
      password: password,
    };
    console.log(customer);

    const res = await fetch("https://localhost:5001/api/Customer/1", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: customer,
    })
      .then((response) => {
        const d = res.json();
        console.log(d);
        if (response.data != null) {
          // Reset data
          setName("");
          setEmail("");
          setAddress("");
          setMobile("");
          setPassword("");
          setConfirmPassword("");

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        // setHasRegisteredFailed(true);
      });
  };

  return (
    <div className="registerWrapper">
      <div className="signUpRow">
        <div className="signUpColumn">
          <div className="row1 title">
            <div className="whiteT">Car</div>
            <div className="yellowT">Share</div>
            <div className="whiteT">Scheme</div>
          </div>
          <div className="quote">
            <div className="need">Need a ride but just for yourself?</div>
            <div className="we">We've got you covered.</div>
            <img className="signUpMidlogo" src={Image}></img>
          </div>
          <div className="low">
            <img className="lowlogo" src={BackDrop}></img>
          </div>
        </div>
        <div className="signUplongColumn">
          <div className="signUpForm">
            <div className="signUpTitle">
              <div className="sign">Sign Up</div>
            </div>
            <br></br>
            <div className="description">
              <div className="desc">
                Let’ s get you all set up so you can verify your personal
                account and begin setting up your profile.
              </div>
            </div>
            <br></br>
            <div className="fields">
              <div className="names">
                <div className="first">
                  <div className="signUpLabel">Name</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="signUpText"
                    placeholder="  First Name"
                  ></input>
                </div>
                <div className="last">
                  <div className="signUpLabel">Address</div>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="signUpText"
                    placeholder="  Address"
                  ></input>
                </div>
              </div>
              <br></br>
              <div className="contact">
                <div className="signUpEmail">
                  <div className="signUpLabel">Email</div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="signUpText"
                    placeholder="  Email"
                  ></input>
                </div>
                <div className="phone">
                  <div className="signUpLabel">Phone Number</div>
                  <input
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    className="signUpText"
                    placeholder="  Phone Number"
                  ></input>
                </div>
              </div>
              <br></br>
              <div className="passwords">
                <div className="signUpPassword">
                  <div className="signUpLabel">Password</div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="signUpText"
                    placeholder="  Password"
                  ></input>
                </div>
                <div className="confirmPassword">
                  <div className="signUpLabel">Confirm Password</div>
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="signUpText"
                    placeholder="  Confirm Password"
                  ></input>
                </div>
                {hasRegisterFailed && (
                  <div className="alert alert-danger">
                    {" "}
                    Invalid Credentials{" "}
                  </div>
                )}
              </div>
              <br></br>
              <button
                className="confirmSignUpBtn"
                onClick={() => handleSubmit()}
              >
                Sign Up Post
              </button>
              <button className="confirmSignUpBtn">Sign Up!</button>
              <br></br>
              <br></br>
              <div className="already">
                <div className="alreadyText">Already Have an Account?</div>
                <div className="alreadyLog">
                  <Link to="/">Log In!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
