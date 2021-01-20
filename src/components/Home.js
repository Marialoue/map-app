import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Themes";
import { GlobalStyles } from "./GlobalStyles";

export default function Home() {
  // add a theme to toggle between light or dark theme
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // initialize starting viewport for map
  const [viewport, setViewport] = useState({
    latitude: 18.0767,
    longitude: -10.9782,
    zoom: 1.3,
    pitch: 30,
  });

  // initialize user location with null
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  //  destination to be used in Map, and setAddrees in Header
  const [destination, setDestination] = useState({
    lat: null,
    lng: null,
  });

  // polylineCoords to be used in Map for geojson, setPolylineCoords is used in Header when user has searched a destination
  const [polylineCoords, setPolylineCoords] = useState([0, 0]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />

      <div className="home">
        <Header
          toggleTheme={toggleTheme}
          theme={theme}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          viewport={viewport}
          setViewport={setViewport}
          setDestination={setDestination}
          setPolylineCoords={setPolylineCoords}
        />
        <Map
          theme={theme}
          userLocation={userLocation}
          viewport={viewport}
          setViewport={setViewport}
          destination={destination}
          setPolylineCoords={setPolylineCoords}
          polylineCoords={polylineCoords}
        />
      </div>
    </ThemeProvider>
  );
}
