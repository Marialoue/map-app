import { useState, createContext } from "react";

export const ViewportContext = createContext();
export const UserLocationContext = createContext();
export const DestinationContext = createContext();

export function LocationProvider({ children }) {
  const [viewport, setViewport] = useState({
    latitude: 18.0767,
    longitude: -10.9782,
    zoom: 1.8,
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

  return (
    <ViewportContext.Provider value={{ viewport, setViewport }}>
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            <DestinationContext.Provider value={{ destination, setDestination }}>
                {children}
            </DestinationContext.Provider>
        </UserLocationContext.Provider>
    </ViewportContext.Provider>
  );
}
