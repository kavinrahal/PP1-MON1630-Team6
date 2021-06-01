import React, {useEffect, useState, useRef } from 'react';
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import carData from "./carData.json";

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

    function RenderMap() {
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: "AIzaSyDIjzYEK-Jozakh-bWq0Qpn1bVKLl4NCzg"
        })

        const onLoad = React.useCallback(function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();

            setMap(map)
        }, [])
        
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
                    carData.map(item => {
                        return (
                            <Marker key={item.name} position={item.location} onClick={() => onSelect(item)}/>
                        )
                    })
                }
                
                {
                    selected.location && 
                    (
                    <InfoWindow
                        position={selected.location}
                        clickable={true}
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
        </div>  
        )  : <></>
    }
}
 
export default MapContainer;

