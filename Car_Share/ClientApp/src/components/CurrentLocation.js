import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
};

export class CurrentLocation extends Component {

    constructor(props) {
        super(props);
        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        
        if(map) {
            let center = new google.maps.LatLng(current.lat, current.lng);       
            map.panTo(center);
        }
    }

    loadMap() {
        if(this.props && this.props.google) {
            const {google} = this.props;
            const mapRef=this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            
            let {zoom} = this.props;
            const {lat,lng} = this.state.currentLocation;
            const center = new google.maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            this.map = new google.maps.Map(node, mapConfig, document.getElementById("map"));
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if(previousProps.google !== this.props.google) {
            this.loadMap();
        }
        if(previousState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const coords = position.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    }); 
                });
            }
        }
        this.loadMap();
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;
        return React.Children.map(children, child => {
            if (!child) return;
            return React.cloneElement(child, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return(
            <div>
                <div style = {style} ref = {"map"}>
                    Loading Map!
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}

CurrentLocation.defaultProps = {
    zoom: 20,
    initialCenter: {
        lat: -37.840935,
        lng: 144.946457
    },
    centerAroundCurrentLocation: false,
    visible: true
};

export default CurrentLocation;

