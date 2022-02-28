import React, { useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import Theme from "./styles/GlobalStyles";

import { LocationProvider } from "./context/LocationContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function Home() {
  // polylineCoords to be used in Map for geojson, setPolylineCoords is used in Header when user has searched a destination
  const [polylineCoords, setPolylineCoords] = useState([0, 0]);

  return (
    <ThemeProvider>
      <Theme>
        <Header />
        <LocationProvider>
          <Map
            polylineCoords={polylineCoords}
            setPolylineCoords={setPolylineCoords}
          />
        </LocationProvider>
      </Theme>
    </ThemeProvider>
  );
}
