import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import "./Home.css";

export default function Home() {
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
        setDestination={setDestination}
        setPolylineCoords={setPolylineCoords}
      />
      <Map
        destination={destination}
        setPolylineCoords={setPolylineCoords}
        polylineCoords={polylineCoords}
      />
    </div>
  );
}
