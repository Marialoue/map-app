import React, { useState, useRef, useContext } from "react";
import ReactMapGL, { FlyToInterpolator, NavigationControl } from "react-map-gl";

import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import GeoLayer from "./GeoLayer";
import UserMarker from "./UserMarker";
import DestinationMarker from "./DestinationMarker";
import {
  UserLocationContext,
  DestinationContext,
  ViewportContext,
} from "../context/LocationContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Map({ polylineCoords, setPolylineCoords }) {
  const mapToken = process.env.REACT_APP_TOKEN;
  const mapRef = useRef();

  const { theme, mapTiles } = useContext(ThemeContext);
  const { viewport, setViewport } = useContext(ViewportContext);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [travelTime, setTravelTime] = useState({ hours: null, minutes: null });
  const options = {
    profile: "driving",
    origin: {
      lat: userLocation.lat,
      lng: userLocation.lng,
    },
    destination: {
      lat: destination.lat,
      lng: destination.lng,
    },
  };

  // const mapboxSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/toronto.json?types=place%2Cpostcode%2Caddress&autocomplete=true&routing=true&access_token=${mapToken}`;
  const mapboxDirections = `https://api.mapbox.com/directions/v5/mapbox/${options.profile}/${options.destination.lng},${options.destination.lat};${options.origin.lng},${options.origin.lat}?alternatives=true&geometries=geojson&access_token=${mapToken}`;

  const getUrlResponse = () => {
    fetch(mapboxDirections)
      .then((response) => response.json())
      .then((response) => {
        const coordsArr = response.routes[0].geometry.coordinates;
        setPolylineCoords(coordsArr);
      });
  };

  const getDuration = () => {
    fetch(mapboxDirections)
      .then((response) => response.json())
      .then((response) => {
        const hours = response.routes[0].duration / 3600;
        const min = hours * 60;
        setTravelTime({
          ...travelTime,
          hours: hours,
          minutes: min,
        });
        // if (hours <= 1) {
        //   console.log(`traveltime: ${min} mins`);
        // } else {
        //   console.log(`traveltime: ${hours} hrs, ${min} mins`);
        // }
      });
  };

  const gotoSearchedLocation = () => {
    setViewport({
      ...viewport,
      latitude: destination.lat,
      longitude: destination.lng,
      zoom: 12,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const getAllSearchData = () => {
    getUrlResponse();
    gotoSearchedLocation();
    getDuration();
  };

  const handleSearch = () => {
    destination && userLocation.lat && destination.lat
      ? getAllSearchData()
      : alert(
          "Oh no, you for got to enter " +
            (userLocation.lat ? "a destination" : "your location")
        );
  };

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 12,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator(),
          });
        },
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
  };

  const handleResult = (result) => {
    setDestination({
      lat: result.result.center[1],
      lng: result.result.center[0],
    });
    setViewport({
      ...viewport,
      latitude: result.result.center[1],
      longitude: result.result.center[0],
      zoom: 12,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  return (
    <main className="map">
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        width="100vw"
        height="100vh"
        reuseMaps={true}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={mapToken}
        mapStyle={mapTiles[theme]}
      >
        <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={mapToken}
          placeholder="Where would you like to go?"
          onResult={handleResult}
          clearAndBlurOnEsc={true}
          trackProximity={true}
          onError={(message) => {
            console.log(
              "There was a problem retriving this request: ",
              message
            );
          }}
        />
        <span className="btn-group">
          <button className="btn" onClick={handleSearch}>
            Find route
          </button>
          <button className="btn" onClick={getUserLocation}>
            Find user
          </button>
        </span>
        <span className="nav-ctrl">
          <NavigationControl showCompass={true} />
        </span>

        <GeoLayer destination={destination} polylineCoords={polylineCoords} />
        <UserMarker userLocation={userLocation} />
        <DestinationMarker destination={destination} />
      </ReactMapGL>
    </main>
  );
}
