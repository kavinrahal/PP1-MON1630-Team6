import React, { useEffect, useState } from 'react';
import './styles/Profile.css';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import { useHistory } from "react-router";

export default function Profile() {
  const [userDetails, setUserDetails] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userAddress, setUserAddress] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [userNewPassword, setUserNewPassword] = useState("")
  const [userNewConfirmPassword, setUserNewConfirmPassword] = useState("")

  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)

  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState(false)
  const [passwordChange, setPasswordChange] = useState(false)
  const [put, setPut] = useState(false)

  const history = useHistory();
  const [errors, setErrors] = useState(new Map);

  useEffect(() => {
    let url = "https://localhost:5001/api/customer/"
    let customerID = sessionStorage.getItem('customerID')
    fetch(url + customerID)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        setUserDetails(data)
        setUserName(data.customerName)
        setUserEmail(data.email)
        setUserAddress(data.address)
        setUserPhone(data.phone)
        setUserPassword(data.password)
      })
      .catch(error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })

  }, [])
  const validate = () => {
    let retVal = true
    let fieldsName = ['userName', 'userEmail', 'userAddress', 'userPhone']
    let fields = [userName, userEmail, userAddress, userPhone]
    let error_sections = new Map()

    for (let k = 0; k < fields.length; k++) {
      if (fields[k] == "") {
        error_sections.set(fieldsName[k], "Cannot change to Empty")
        console.log(fieldsName[k])
        retVal = false
      }
    }

    if (userNewPassword != userNewConfirmPassword) {
      alert("Passwords must be the same")
      retVal = false
    }
    // Check for phone regex to match databse
    const regex = new RegExp('^\\+61 [0-9]{4} [0-9]{4}$');
    if (userPhone != "" && !regex.test(userPhone)) {
      alert("Phone number must in form of '+61 0000 0000'")
      retVal = false
    }
    setErrors(error_sections)
    return retVal
  }

  const onClick = () => {
    if (passwordConfirmation == userDetails.password) {
      setPasswordConfirmationError(false)
      if (validate()) {
        if (userNewPassword != "" && userNewConfirmPassword != "") { // Means Password is being updated
          setPasswordChange(true)
          setUserPassword(userNewPassword)
        }

        setPut(true)
      }
    } else {
      setPasswordConfirmationError(true)
    }

  }
  if (put) {
    setPut(false)
    const updatedCustomer = {
      customerID: sessionStorage.getItem('customerID'),
      customerName: userName,
      email: userEmail,
      address: userAddress,
      phone: userPhone,
      password: userPassword,
    }
    console.log(updatedCustomer)
    let url = "https://localhost:5001/api/customer/"
    let customerID = sessionStorage.getItem('customerID')
    const res = fetch(url + customerID, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setUpdated(true)
          if (passwordChange) {
            alert("Password changed, please login with new password")
            history.push({
              pathname: '/',
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <ViewportProvider>
      <div className="profileWrapper">
        <WhichSideBar className="sideB"></WhichSideBar>
        <div className="profile">
          <div className="rowProfile">
            <div className="profileTitle">My Profile</div>
            <div className="pageTitle">
              <div className="blueT">Car</div>
              <div className="yellowT">Share</div>
              <div className="blueT">Scheme</div>
            </div>
          </div>
          <div className="profilePage">
            <div className="profileQuote">You can check and change any of your details here!</div>
            <div className="profileDetails">
              {loading && <span>Loading</span>}
              {updated && <span style={{ color: 'green' }}>Details Updated</span>}
              <div className="profileNames">

                <div className="profileFirst">

                  <div className="profileLabel">Change Name<span class="errorMessage">  {errors.get("userName")} </span></div>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="profileText"
                    placeholder="  User Name"></input>
                </div>
                <div className="profileLast">
                  <div className="profileLabel">Change Address <span class="errorMessage">  {errors.get("userAddress")} </span></div>
                  <input
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    type="text" className="profileText" placeholder="  User Address"></input>
                </div>
              </div>
              <br></br>
              <div className="profileContact">
                <div className="profileSignUpEmail">
                  <div className="profileLabel">Change Email <span class="errorMessage">  {errors.get("userEmail")} </span></div>
                  <input
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email" className="profileText" placeholder="  User Email"></input>
                </div>
                <div className="profilePhone">
                  <div className="profileLabel">Change Phone Number <span class="errorMessage">  {errors.get("userPhone")} </span></div>
                  <input
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    type="text" className="profileText" placeholder="  User Phone"></input>
                </div>
              </div>
              <br></br>
              <div className="profilePasswords">
                <div className="profileSignUpPassword">
                  <div className="profileLabel">Change Password</div>
                  <input
                    value={userNewPassword}
                    onChange={(e) => setUserNewPassword(e.target.value)}
                    type="password" className="profileText" placeholder="  User Password"></input>
                </div>
                <div className="profileConfirmPassword">
                  <div className="profileLabel">Confirm New Password</div>
                  <input
                    value={userNewConfirmPassword}
                    onChange={(e) => setUserNewConfirmPassword(e.target.value)}
                    type="password" className="profileText" placeholder="  Confirm Password"></input>
                </div>
              </div>
              <span>Leave passwords field blank if no change is desired.</span>
              <div>
                {passwordConfirmationError && <span style={{ color: 'red' }}>Wrong Password!</span>}
                <div style={{ 'font-weight': 'bold' }}>Enter Current Password to Save Changes</div>
                <div className="saveChanges">
                  <input
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="password" className="profileText" placeholder="  Current Password">

                  </input>

                  <div>
                    <button onClick={() => onClick()} className="saveProfile hvr-sweep-to-right">Save Changes</button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </ViewportProvider>
  );

}