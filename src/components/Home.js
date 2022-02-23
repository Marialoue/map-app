import React, { useState } from "react";
import Header from "./Header";
import Map from "./Map";
import { lightTheme, darkTheme } from "./Themes";
import { GlobalStyles } from "./GlobalStyles";

import { LocationProvider } from "../context/LocationContext";

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


  // polylineCoords to be used in Map for geojson, setPolylineCoords is used in Header when user has searched a destination
  const [polylineCoords, setPolylineCoords] = useState([0, 0]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />

      <main className="main">
        <Header toggleTheme={toggleTheme} theme={theme} />
        <LocationProvider>
          <Map
            theme={theme}
            polylineCoords={polylineCoords}
            setPolylineCoords={setPolylineCoords}
          />
        </LocationProvider>
      </main>
    </ThemeProvider>
  );
}
