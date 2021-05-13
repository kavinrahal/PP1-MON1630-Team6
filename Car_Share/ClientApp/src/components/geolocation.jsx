import React, {useEffect, useState } from 'react';
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';


export const MapContainer = () => {

    const mapStyles = {
        width: '1000px',
        height: '1000px'
    };

    const carData = [{
        id: 1,
        name: "Car 1",
        location: {
            lat: -37.8147,
            lng: 144.9517
        },
        city: "Melbourne"
        },
        {
            id: 2,
            name: "Car 2",
            location: {
                lat: -37.8184,
                lng: 144.9525
            },
            city: "Melbourne"
        }
    ]

    const [currentPos, setCurrentPos] = useState({});
    const [selected, setSelected] = useState({});

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

    return renderMap()

    function renderMap() {
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
                    <p>{selected.name}</p>
                    </InfoWindow>
                    )
                }
            </GoogleMap>  
        )  : <></>
    }
}

export default MapContainer;

