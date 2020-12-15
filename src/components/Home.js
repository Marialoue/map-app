import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import "./Home.css";

export default function Home() {
  // initialize starting viewport for map
  const [viewport, setViewport] = useState({
    latitude: 18.0767,
    longitude: -10.9782,
    zoom: 1.3,
    pitch: 30,
  });

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  //  destination to be used in Map, and setAddrees in Header
  const [destination, setDestination] = useState({
    lat: null,
    lng: null,
    placeholder: "destination",
  });

  // polylineCoords to be used in Map for geojson, setPolylineCoords in Header when
  const [polylineCoords, setPolylineCoords] = useState([0, 0]);

  // add a theme to set light or dark theme

  return (
    <div className="home">
      <Header
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        viewport={viewport}
        setViewport={setViewport}
        setDestination={setDestination}
        setPolylineCoords={setPolylineCoords}
      />
      <Map
        userLocation={userLocation}
        viewport={viewport}
        setViewport={setViewport}
        destination={destination}
        setPolylineCoords={setPolylineCoords}
        polylineCoords={polylineCoords}
      />
    </div>
  );
}
