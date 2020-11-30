import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import './Map.css';

export default function Map({ address }) {

    const mapToken = process.env.REACT_APP_TOKEN;

    console.log('this is map.js\n address: ', address);

    /* TODO
        show searched location on map with coords from address
    */

    // defines an initial viewpoint - lat and long will change when user is changing map view
    const [viewport, setViewport] = useState({
        width: 1000,
        height: 450,
        latitude: address.addressLat,
        longitude: address.addressLong,
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
                userLat: position.coords.latitude,
                userLong: position.coords.longitude
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
                    {userLocation.userLat ? (
                        <Marker
                            latitude={userLocation.userLat}
                            longitude={userLocation.userLong}
                        >
                            <PersonPinIcon />
                        </Marker>) : (null)
                    }
                </ReactMapGL>
            </div>
        </div>
    );
}
