import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import { lightTheme, darkTheme } from "./Themes";
import { GlobalStyles } from "./GlobalStyles";

import { ThemeProvider } from "styled-components";

export default function Home() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const [viewport, setViewport] = useState({
    latitude: 18.0767,
    longitude: -10.9782,
    zoom: 1.3,
    pitch: 30,
  });

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  const [destination, setDestination] = useState({
    lat: null,
    lng: null,
  });

  // polylineCoords to be used in Map for geojson, setPolylineCoords is used in Header when user has searched a destination
  const [polylineCoords, setPolylineCoords] = useState([0, 0]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />

      <main className="main">
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Map
          theme={theme}
          viewport={viewport}
          setViewport={setViewport}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          destination={destination}
          setDestination={setDestination}
          polylineCoords={polylineCoords}
          setPolylineCoords={setPolylineCoords}
        />
      </main>
    </ThemeProvider>
  );
}
