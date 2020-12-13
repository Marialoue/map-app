import React, { useState } from "react";
import ReactMapGL, { FlyToInterpolator, NavigationControl } from "react-map-gl";
import Button from "@material-ui/core/Button";
import UserMarker from "./UserMarker";
import DestinationMarker from "./DestinationMarker";
import GeoLayer from "./GeoLayer";
import "./Map.css";

export default function Map({
  destination,
  polylineCoords,
  setPolylineCoords,
}) {
  // adding state for user location, where marker will show location
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // for mapbox
  const mapToken = process.env.REACT_APP_TOKEN;

  const options = {
    profile: "driving",
    origin: {
      lat: userLocation.userLat,
      lng: userLocation.userLong,
    },
    destination: {
      lat: destination.lat,
      lng: destination.lng,
    },
  };

  const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/${options.profile}/${options.origin.lng},${options.origin.lat};${options.destination.lng},${options.destination.lat}?alternatives=true&geometries=geojson&access_token=${mapToken}`;

  // defines an initial viewpoint - lat and long will change when user is changing map view
  const [viewport, setViewport] = useState({
    latitude: 18.0767,
    longitude: -10.9782,
    zoom: 1.3,
    pitch: 30,
  });

  const gotoSearchedLocation = () => {
    setViewport({
      ...viewport,
      latitude: destination.lat,
      longitude: destination.lng,
      zoom: 14,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 14,
      });
      setUserLocation({
        userLat: position.coords.latitude,
        userLong: position.coords.longitude,
      });
    });
  };

  const getUrlResponse = () => {
    // fetch url and save coords from first route in array
    fetch(mapboxUrl)
      .then((response) => response.json())
      .then((response) => {
        const coordsArr = response.routes[0].geometry.coordinates;
        setPolylineCoords(coordsArr);
        console.log(
          "getUrlRes \nsetting coords: ",
          coordsArr,
          "\naddress: ",
          destination
        );
      });
  };

  const handleSearch = () => {
    destination && userLocation.userLat && destination.lat
      ? getAllSearchData()
      : alert("oh no, you forgot to enter a destination");
    console.log(
      "handleSearch \naddress lat: ",
      destination.lat,
      "\npolycoords: ",
      polylineCoords
    );
  };

  const getAllSearchData = () => {
    getUrlResponse();
    gotoSearchedLocation();
  };

  return (
    <div>
      <Button onClick={handleClick}>Find my location</Button>
      <Button onClick={handleSearch}>Find route</Button>

      <div className="map">
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={mapToken}
          mapStyle={"mapbox://styles/mapbox/light-v8"}
        >
          <div style={{ position: "absolute", right: 0 }}>
            <NavigationControl />
          </div>

          <GeoLayer
            destination={destination}
            polylineCoords={polylineCoords}
          />

          <UserMarker userLocation={userLocation} />
          <DestinationMarker destination={destination} />
        </ReactMapGL>
      </div>
    </div>
  );
}
