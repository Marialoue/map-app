import React, { useState } from 'react';
import ReactMapGL, { Marker, Source, Layer, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import PersonPinCircleRoundedIcon from '@material-ui/icons/PersonPinCircleRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import Button from '@material-ui/core/Button';
import './Map.css';

export default function Map({ address }) {

    // adding state for user location, where marker will show location
    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null
    })

    const [polylineCoords, setPolylineCoords] = useState();

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

    // defines an initial viewpoint - lat and long will change when user is changing map view
    const [viewport, setViewport] = useState({
        height: '82vh',
        width: '100vw',
        latitude: 18.0767,
        longitude: -10.9782,
        zoom: 1.3,
        pitch: 30
    });

    const gotoSearchedLocation = () => {
        setViewport({
            ...viewport,
            latitude: address.addressLat,
            longitude: address.addressLong,
            zoom: 14,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
        })
    };

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
        // if user has selected a suggestion /
        fetch(mapboxUrl)
            .then(response => response.json())
            .then(response => {
                const coordsArr = response.routes[0].geometry.coordinates;
                coordsArr.map((coordinates) => {
                    const lng = coordinates[0];
                    const lat = coordinates[1];
                    return console.log('lat: ', lat, 'lng: ', lng);
                });
                setPolylineCoords(coordsArr);
            });
    };

    const handleSearch = () => {
        address &&
            address.addressLat ? (getAllSearchData()
            ) : (
                alert('oh no, you forgot to enter a destination')
            );
    };

    // istead of using two functions in ternary for handleSearch - this is what happend - fix it better ?
    const getAllSearchData = () => {
        getUrlResponse();
        gotoSearchedLocation();
    }

    const geojsonLine = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: polylineCoords
            }
        }]
    };

    const geojsonPoint = {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [userLocation.userLong, userLocation.userLat] } }
        ]
    };


    return (
        <div>
            {/* <ButtonGroup variant="text" color="default" size="large" aria-label="text primary button group"> */}
            <Button onClick={handleClick}>Find my location</Button>
            <Button onClick={handleSearch}>Find route</Button>

            <div className="map">
                <ReactMapGL
                    {...viewport}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={mapToken}
                    mapStyle={'mapbox://styles/mapbox/light-v8'}
                >
                    <div style={{ position: 'absolute', right: 0 }}>
                        <NavigationControl />
                    </div>

                    {/* showing pointLayer with circle if userLocation is set */}
                    {userLocation.userLat ? (
                        <Source id="pointLayer" type="geojson" data={geojsonPoint}>
                            <Layer
                                id="point"
                                type="circle"
                                paint={{
                                    'circle-radius': 5,
                                    'circle-color': 'rgba(3, 170, 238, 0.5)',
                                }} />
                        </Source>
                    ) : (null)
                    }

                    {/* showing polylineLayer when address is validated and btn (handleSearch) is clicked */}
                    {address.addressLat ? (
                        <Source id='polylineLayer' type='geojson' data={geojsonLine}>
                            <Layer
                                id='line'
                                type='line'
                                layout={{
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                }}
                                paint={{
                                    'line-color': 'rgba(3, 170, 238, 0.5)',
                                    'line-width': 5,
                                }}
                            />
                        </Source>) : (null)
                    }

                    {/* add a marker to map when userLocation is provided */}
                    {userLocation.userLat ? (
                        <Marker
                            latitude={userLocation.userLat}
                            longitude={userLocation.userLong}
                            offsetLeft={-20}
                            offsetTop={-20}
                        >
                            <PersonPinCircleRoundedIcon />
                        </Marker>) : (null)
                    }

                    {/* add destination marker when address is provided */}
                    {address.addressLat ? (
                        <Marker
                            latitude={address.addressLat}
                            longitude={address.addressLong}
                            offsetLeft={-20}
                            offsetTop={-20}
                        >
                            <RoomRoundedIcon />
                        </Marker>) : (null)
                    }

                </ReactMapGL>
            </div>
        </div >
    );
}
