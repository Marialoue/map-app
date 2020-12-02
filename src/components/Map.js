import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
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

    // for here api
    const hereKey = process.env.REACT_APP_HERE_KEY;

    /* TODO
        add routing to map
        also add polygon layer to map to demonstrate route
    */

    // options to be used in hereUrl
    const options = {
        transport: 'car',
        origin: {
            lat: userLocation.userLat,
            lng: userLocation.userLong
        },
        destination: {
            lat: address.addressLat,
            lng: address.addressLong
        },
    };

    const hereUrl = `https://router.hereapi.com/v8/routes?transportMode=${options.transport}&origin=${options.origin.lat},${options.origin.lng}&destination=${options.destination.lat},${options.destination.lng}&apiKey=${hereKey}&return=summary,polyline,actions,instructions`

    /*
        &return=summary (optinally attribute showing duration, lenght, and baseDuration - returns summary of entire travel section incl pre- and post actions)
        &return=travelSummary (returns summary only of travel portion i.e no pre- or post action)
        &return=polyline (https://github.com/heremaps/flexible-polyline)
        &apiKey=REACT_APP_HERE_KEY
    */

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
                zoom: 15
            });
            setUserLocation({
                userLat: position.coords.latitude,
                userLong: position.coords.longitude
            });
        })
    };

    const handleSearch = () => {
        address &&
            address.addressLat ? (fetch(hereUrl)
                .then(response => response.json())
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
                    // mapStyle='mapbox://styles/mapbox/light-v9'
                >
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
