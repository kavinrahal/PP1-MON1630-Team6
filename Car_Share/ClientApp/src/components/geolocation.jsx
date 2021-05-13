import React, {useEffect, useState } from 'react';
import { GoogleMap,  Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import carData from "./carData.json";
import DropdownSearch from './searchBar';

export const MapContainer = () => {

    const mapStyles = {
        width: '400px',
        height: '400px'
    };

    const [currentPos, setCurrentPos] = useState({});
    const [selected, setSelected] = useState({});
    const [value, setValue] = useState(null);

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
                    <p>{selected.name}</p>
                    </InfoWindow>
                    )
                }
            </GoogleMap>
            <div style={{width:200}}>
                <DropdownSearch options={carData} id='id' label='type' prompt='Select Vehicle Type...' value={value} onChange={val => setValue(val)}/>
            </div>
        </div>  
        )  : <></>
    }
}

export default MapContainer;

