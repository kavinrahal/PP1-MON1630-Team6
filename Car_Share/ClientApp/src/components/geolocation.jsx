import React, {useEffect, useState } from 'react';
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import DropdownBar from './dropdownBar';
import carData from "./carData.json";

export const MapContainer = () => {


    const mapStyles = {
        width: '400px',
        height: '400px'
    };

    const [currentPos, setCurrentPos] = useState({});
    const [selected, setSelected] = useState({});
    const [showMarker, setShowMarker] = useState(false);

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

    return RenderMap()

    function RenderMap() {
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: "AIzaSyDIjzYEK-Jozakh-bWq0Qpn1bVKLl4NCzg"
        })
    
        const [map, setMap] = React.useState(null)

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
                    onUnmount={onUnmount}>
                    
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
                <DropdownBar/>
            </div>
        </div>  
        )  : <></>
    }
}
 
export default MapContainer;

