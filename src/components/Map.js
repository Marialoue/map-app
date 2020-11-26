import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import './Map.css';

export default function Map() {

    const mapToken = process.env.REACT_APP_TOKEN;

    // defines an initial viewpoint
    // lat and long will change when user is changing map view
    const [viewport, setViewport] = useState({
        width: 1000,
        height: 450,
        latitude: 59.330,
        longitude: 18.075,
        zoom: 12
    });

    // adding state for user location, where marker will show location
    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null
    })

    const handleClick = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            setViewport({
                ...viewport,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 15
            });
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        })
    };

    return (
        <div>
            <button onClick={handleClick}>Click to see your location</button>
            <div className="map">
                <ReactMapGL
                    {...viewport}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={mapToken}
                >
                    {userLocation.latitude ? (
                        <Marker
                            latitude={userLocation.latitude}
                            longitude={userLocation.longitude}
                        >
                            <PersonPinIcon />
                        </Marker>) : (null)
                    }


                </ReactMapGL>
            </div>
        </div>
    );
}
