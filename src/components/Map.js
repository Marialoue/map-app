import React, { useState } from 'react';
import ReactMapGL, { Marker, Layer } from 'react-map-gl';
import PersonPinCircleRoundedIcon from '@material-ui/icons/PersonPinCircleRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Map.css';

export default function Map({ address }) {

    // adding state for user location, where marker will show location
    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null
    })

    // for mapbox
    const mapToken = process.env.REACT_APP_TOKEN;


    /* mapbox api info:
        * returns coords in lng, lat format
        * geometries parameter added to reqeust geojson data
        * for even more detailed directions you may add 'steps=true' parameter
        * duration is estimated travel time in seconds
        * distance returns float in meters 
        * profiles: driving-traffic, driving, walking, cycling
     */

    const options = {
        profile: 'driving',
        origin: {
            lat: userLocation.userLat,
            lng: userLocation.userLong
        },
        destination: {
            lat: address.addressLat,
            lng: address.addressLong
        },
    };

    const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/${options.profile}/${options.origin.lng},${options.origin.lat};${options.destination.lng},${options.destination.lat}?geometries=geojson&access_token=${mapToken}`

    const lineLayer = {
        id: 'travel-line',
        type: 'line',
        source: '',
        'source-layer': ''
    };

    // defines an initial viewpoint - lat and long will change when user is changing map view
    const [viewport, setViewport] = useState({
        height: '84.5vh',
        width: '100vw',
        latitude: 18.0767,
        longitude: -10.9782,
        zoom: 1.3
    });

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setViewport({
                ...viewport,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 14
            });
            setUserLocation({
                userLat: position.coords.latitude,
                userLong: position.coords.longitude
            });
        })
    };

    const getUrlResponse = () => {
        fetch(mapboxUrl)
            .then(response => response.json())
            .then(response => {
                const coordsArr = response.routes[0].geometry.coordinates;
                coordsArr.map((coordinates) => {
                    const lng = coordinates[0];
                    const lat = coordinates[1];
                    return console.log(lat, lng);
                });
            });
    };

    const handleSearch = () => {
        address &&
            address.addressLat ? (getUrlResponse()
            ) : (
                alert('oh no, you forgot to enter a destination')
            );
    };

    return (
        <div>
            <ButtonGroup variant="text" color="default" size="small" aria-label="text primary button group">
                <Button onClick={handleClick}>Find my location</Button>
                <Button onClick={handleSearch}>Find route</Button>
            </ButtonGroup>

            <div className="map">
                <ReactMapGL
                    {...viewport}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={mapToken}
                >
                    <Layer {...lineLayer} />

                    {/* put these markers in separate layer */}
                    {userLocation.userLat ? (
                        <Marker
                            latitude={userLocation.userLat}
                            longitude={userLocation.userLong}
                        >
                            <PersonPinCircleRoundedIcon />
                        </Marker>) : (null)
                    }

                    {address.addressLat ? (
                        <Marker
                            latitude={address.addressLat}
                            longitude={address.addressLong}
                        >
                            <RoomRoundedIcon />
                        </Marker>
                    ) : (null)
                    }

                </ReactMapGL>
            </div>
        </div>
    );
}
