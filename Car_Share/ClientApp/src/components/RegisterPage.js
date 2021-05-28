import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./styles/RegisterPage.css";
import Image from "../addons/reglogo.png";
import BackDrop from "../addons/City Backdrop.svg";


function RegisterPage() {
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [hasRegisterFailed, setHasRegisteredFailed] = useState(false);
    const history = useHistory();

    const [errors, setErrors] = useState(new Map);
    // Form Validation 
    const validate = () => {
        let retVal = true
        // Checking for empty form values
        let fieldsName = ['customerName', 'email', 'address', 'phone', 'password', 'confirmPassword']
        let fields = [customerName, email, address, phone, password, confirmPassword]
        let error_sections = new Map()


        for (let k = 0; k < fields.length; k++) {
            if (fields[k] == "") {
                error_sections.set(fieldsName[k], "Required")
                retVal = false
            }
        }

        // Check for Password Mismatch
        if (password != "" && confirmPassword != "" && password != confirmPassword) {
            error_sections.set('formError', "Password Mismatch!")
            retVal = false
        }
        // Check for phone regex to match databse

        const regex = new RegExp('^\\+61 [0-9]{4} [0-9]{4}$');
        if (phone != "" && !regex.test(phone)) {
            error_sections.set('phone', "Phone number must in form of '+61 0000 0000'")
            retVal = false
        }

        setErrors(error_sections)
        return retVal
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (validate()) {
            const customer = {
                customerName: customerName,
                email: email,
                address: address,
                phone: phone,
                password: password,
            };
            console.log(JSON.stringify(customer));

            const res = await fetch("https://localhost:5001/api/customer", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(customer),
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Successfully Registered ! \n\nPlease Login to continue.");
                        // Reset data
                        setCustomerName("");
                        setEmail("");
                        setAddress("");
                        setPhone("");
                        setPassword("");
                        setConfirmPassword("");

                        // Redirect to Login page
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                                    <div className="signUpLabel">
                                        Name <span class="errorMessage"> {errors.get("customerName")} </span>
                                    </div>
                                    < input
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        type="text"
                                        className="signUpText"
                                        placeholder="  First Name"
                                        required
                                    ></input>
                                </div>
                                <div className="last">
                                    <div className="signUpLabel">
                                        Address <span class="errorMessage">  {errors.get("address")} </span>
                                    </div>
                                    <input
                                        value={address}
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
                                    <div className="signUpLabel">
                                        Email <span class="errorMessage"> {errors.get("email")} </span>
                                    </div>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="signUpText"
                                        placeholder="  Email"
                                    ></input>
                                </div>
                                <div className="phone">
                                    <div className="signUpLabel">
                                        Phone Number <span class="errorMessage"> {errors.get("phone")} </span>
                                    </div>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text"
                                        className="signUpText"
                                        placeholder="  Phone Number"
                                    ></input>
                                </div>
                            </div>
                            <br></br>
                            <div className="passwords">
                                <div className="signUpPassword">
                                    <div className="signUpLabel">
                                        Password <span class="errorMessage"> {errors.get("password")} </span>
                                    </div>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        className="signUpText"
                                        placeholder="  Password"
                                    ></input>
                                </div>
                                <div className="confirmPassword">
                                    <div className="signUpLabel">
                                        Confirm Password <span class="errorMessage"> {errors.get("confirmPassword")} </span>
                                    </div>
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        className="signUpText"
                                        placeholder="  Confirm Password"
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <span class="errorMessage"> {errors.get("formError")} </span>
                                <br></br>
                                <button className="confirmSignUpBtn" onClick={() => handleSubmit()}>
                                    Sign Up </button>
                                <br></br>
                                <br></br>
                            </div>

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
        </div >
    );
}

export default RegisterPage;

