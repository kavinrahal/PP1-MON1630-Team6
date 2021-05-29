import React from "react";
import './styles/PopUp.css';
import Image from '../addons/loading.gif';
import loadingBg from '../addons/citybggradient.svg';

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className = "loggingIn">Logging In</div>
                <img src = {Image} className = "loadingImg"></img>
            </div>
        </div>
    );
};

export default Popup;