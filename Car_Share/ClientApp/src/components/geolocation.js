import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    } from "react-router-dom";
import { render } from "react-dom";
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';
import RegisterPage from "./RegisterPage";

const mapStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%'
};

const carData = [{
    id: 1,
    name: "Car1",
    description: "Mercedes",
    location: {
        lat: 37.8147,
        lng: 144.9517
    },
    city: "Melbourne"
},]

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state= {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    onMarkerClick = (props, userMarker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: userMarker,
            showingInfoWindow: true
        });

    onClose = props => {
        if(this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
                {carData.map(item => {
                    return(
                        <Marker key={item.name} position={item.location} />
                    );
                })}
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Your Current Location'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDIjzYEK-Jozakh-bWq0Qpn1bVKLl4NCzg'
})(MapContainer);
