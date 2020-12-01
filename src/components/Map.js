import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import './Map.css';

export default function Map({ address }) {

    // for mapbox
    const mapToken = process.env.REACT_APP_TOKEN;

    // for here api
    const hereKey = process.env.REACT_APP_HERE_KEY;
    const hereId = process.env.REACT_APP_HERE_APPID;

    /* TODO
        add routing to map
        lat and lng coords from current position to destination / searched address (origin, departure, transport mode)
        also add polygon layer to map to demonstrate route
    */

    // options to be used in hereUrl - origin should maybe be {userLocation}, destination should be {address}
    const options = {
        transport: 'car',
        origin: {
            lat: '',
            lng: ''
        },
        destination: {
            lat: '',
            lng: ''
        },
    };

    const hereUrl = `https://router.hereapi.com/v8/routes?transportMode=${options.transport}&origin=${options.origin.lat},${options.origin.lng}&destination=${options.destination.lat},${options.destination.lng}&apiKey=${hereKey}&return=summary`

    /*
        &return=summary (optinally attribute showing duration, lenght, and baseDuration - returns summary of entire travel section incl pre- and post actions)
        &return=travelSummary (returns summary only of travel portion i.e no pre- or post action)
        &return=polyline (https://github.com/heremaps/flexible-polyline)
        &apiKey=REACT_APP_HERE_KEY
    */

    // defines an initial viewpoint - lat and long will change when user is changing map view
    const [viewport, setViewport] = useState({
        width: 1000,
        height: 450,
        latitude: 51.5085,
        longitude: -0.12574,
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

                    {address.addressLat ? (
                        <Marker
                            latitude={address.addressLat}
                            longitude={address.addressLong}
                        >
                            <PersonPinIcon />
                        </Marker>
                    ) : (null)
                    }

                </ReactMapGL>
            </div>
        </div>
    );
}
