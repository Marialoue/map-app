import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import "./Home.css";

export default function Home() {
  //  address to be used in Map, and setAddrees in Header
  const [address, setAddress] = useState({
    addressLat: null,
    addressLong: null,
  });

  // polylineCoords to be used in Map for geojson, setPolylineCoords in Header when
  const [polylineCoords, setPolylineCoords] = useState([0, 0]);

  // add a theme to set light or dark theme

  return (
    <div className="home">
      <Header setAddress={setAddress} setPolylineCoords={setPolylineCoords} />
      <Map
        address={address}
        setPolylineCoords={setPolylineCoords}
        polylineCoords={polylineCoords}
      />
    </div>
  );
}
