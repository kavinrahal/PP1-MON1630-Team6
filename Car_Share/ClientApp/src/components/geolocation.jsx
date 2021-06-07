import React, {useEffect, useState, useRef } from 'react';
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader, useGoogleMap } from '@react-google-maps/api';
import carData from "./carData.json";

var directionsDisplay = new window.google.maps.DirectionsRenderer();

export const MapContainer = () => {

    const mapStyles = {
        width: '400px',
        height: '400px'
    };

    const [currentPos, setCurrentPos] = useState({});
    const [selected, setSelected] = useState({});   
    const [map, setMap] = React.useState(null);
    const uniqueType = getUnique(carData, 'type'); 
    const [DDselected, setDDSelected] = useState(carData);

    var directionsService = new window.google.maps.DirectionsService();

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
        setDDSelected(carData.find((item) => item.type === val));
    }

    const filterByType = e => {
        const filtered = carData.filter(item => {
            if(e.target.value === item.type) {
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
                     carData.map(item => {
                        if (DDselected.type == item.type){
                            return (
                                <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
                            )
                        }

                        if(DDselected.type == null){
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
                    <p>{"Type: " + selected.type}</p>
                    <p>{"Make: " + selected.make}</p>
                    <p>{"Model: " + selected.model}</p>
                    
                    </>
                    </InfoWindow>
                    )
                }

                
                </GoogleMap>
            <div style={{width:200}}>
            <select value={DDselected.type} onChange={handleChange} onClick={filterByType}>
                    {
                        uniqueType.map(item => ( 
                        <option value={item.type}>
                        {item.type}
                        </option>
                    ))}
                </select>
            </div>
            {
                selected.location && 
                <div className = "selectedCar">
                    <div className = "cardeets">
                            <h2>Car Details</h2>
                            <p>{selected.name}</p>
                            <p>Distance: {haversine_distance().toFixed(2)} km</p>
                            <p>{"Type: " + selected.type}</p>
                            <p>{"Make: " + selected.make}</p>
                            <p>{"Model: " + selected.model}</p>
                    </div>
                </div>
            }
            
        </div>  
        )  : <></>
    }

    
}
 
export default MapContainer;

