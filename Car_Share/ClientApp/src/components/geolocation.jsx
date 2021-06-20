import React, {useEffect, useState} from 'react';
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader} from '@react-google-maps/api';
import { ViewportProvider, WhichSideBar } from './ViewPort_Helper';
import './styles/GeoLocation.css';
import { useHistory } from "react-router-dom";

var directionsDisplay = new window.google.maps.DirectionsRenderer();
var directionsService = new window.google.maps.DirectionsService();

export default function MapContainer(){

    const [carDetails, setCarDetails] = useState([])
    const history = useHistory();

    useEffect(() => {
        fetch("/api/car")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setCarDetails(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const [currentPos, setCurrentPos] = useState({});
    const [selected, setSelected] = useState({});   
    const [map, setMap] = React.useState(null);
    const uniqueType = getUnique(carDetails, 'bodyType'); 
    const [DDselected, setDDSelected] = useState(carDetails);

    

    const getCurrentPos = position => {
        const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPos(currentPos);
    };

    const onSelect = item => {
        setSelected(item);
    }

    const onClick = () => {
        history.push({
            pathname: '/make_booking',
            state: {  // location state
                car: selected,
            },
        });

    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getCurrentPos);
    });
    
    function getUnique(arr, comp) {
        const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);

        return unique;
    }

    function handleChange(e) {
        const val = e.target.value
        setDDSelected(carDetails.find((item) => item.bodyType === val));
    }

    const filterByType = e => {
        const filtered = carDetails.filter(item => {
            if(e.target.value === item.bodyType) {
                return(
                    <Marker />
                )
            }
        })
        console.log(filtered)
    }

    return RenderMap()

    function haversine_distance() {
        var R = 6371; // Radius of the Earth in km
        var rlat1 = currentPos.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = selected.location.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (currentPos.lng-selected.location.lng) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }

    function calcRoute(start, finish) {
        var request = {
            origin: start,
            destination: finish,
            travelMode: window.google.maps.TravelMode.WALKING,
        };
        directionsService.route(request, function (response, status) {
            if (status == window.google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }            

    function RenderMap() {
        
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: "AIzaSyDIjzYEK-Jozakh-bWq0Qpn1bVKLl4NCzg"
        })

        const onLoad = React.useCallback(function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            setMap(map)
        }, [])

        directionsDisplay.setMap(map);
        
        const onUnmount = React.useCallback(function callback(map) {
            setMap(null)
        }, [])

            return isLoaded ? (
            <div>
                <ViewportProvider>
                    <div className = "locateWrapper">
                    <WhichSideBar className = "sideB"/>
                        <div className = "locate">
                            <div className="rowProfile">
                                <div className="profileTitle">Locate Parking</div>
                                <div className="pageTitleL">
                                    <div className="blueT">Car</div>
                                    <div className="yellowT">Share</div>
                                    <div className="blueT">Scheme</div>
                                </div>
                            </div>
                            <div className = "locatePage">
                                <div className = "selectType">
                                    <div className = "selectZeCar">
                                    <div className = "typeSelectTitle">Select Car Type</div>
                                        <select className="filterLocation filterType" value={DDselected.bodyType} onChange={handleChange} onClick={filterByType}>
                                            {
                                                uniqueType.map(item => ( 
                                                <option value={item.bodyType}>
                                                {item.bodyType}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className = "mapContainer">
                                    <GoogleMap
                                        mapContainerStyle={mapStyles}
                                        zoom={15}
                                        center={currentPos}
                                        onLoad={onLoad}
                                        onUnmount={onUnmount}
                                    >
                                    
                                        
                                    {
                                        currentPos.lat && (
                                            <Marker position={currentPos}/>
                                        )
                                        
                                    }
                                    {   
                                        selected.location &&
                                        (
                                        <InfoWindow
                                            position={currentPos}
                                            clickable={true}
                                            onCloseClick={() => setSelected({})}
                                        >
                                        <>
                                        <p>Current Position</p>
                                        
                                        </>
                                        </InfoWindow>
                                        )
                                    }

                                    { 
                                        carDetails.map(item => {
                                            if (DDselected.bodyType == item.bodyType){
                                                return (
                                                    <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
                                                )
                                            }

                                            if(DDselected.bodyType == null){
                                                return (
                                                    <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
                                                )
                                            }
                                        })
                                    }
                                    
                                    {   
                                        selected.location && 
                                        (
                                        <InfoWindow
                                            position={selected.location}
                                            clickable={true}
                                            onClick = {calcRoute(currentPos, selected.location)}
                                            onCloseClick={() => setSelected({})}
                                        >
                                        <>
                                        <p>{selected.name}</p>
                                        <p>{"Type: " + selected.bodyType}</p>
                                        <p>{"Make: " + selected.make}</p>
                                        <p>{"Model: " + selected.model}</p>
                                        
                                        </>
                                        </InfoWindow>
                                        )
                                    }
                                    </GoogleMap>
                                </div>
                                
                                <div className = "mapResults">
                                {
                                    selected.location && 
                                    <div className = "selectedCar">
                                        <div className = "cardeets">
                                                <h2>{selected.rego}</h2>
                                                <p>{selected.name}</p>
                                                <p>Distance: {haversine_distance().toFixed(2)} km</p>
                                                <p>{"Type: " + selected.bodyType}</p>
                                                <p>{"Make: " + selected.make}</p>
                                                <p>{"Model: " + selected.model}</p>
                                                <button className = "bookFoundCar hvr-sweep-to-right-white" onClick={() => onClick()}>Book Car</button>
                                        </div>
                                    </div>
                                }
                                </div>
                        </div>
                    </div>
                </div>
            </ViewportProvider>
        </div>  
        )  : <></>
    }

    
}

