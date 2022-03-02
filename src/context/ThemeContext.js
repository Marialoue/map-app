import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mapTiles, setMapTiles] = useState({
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
  });
  const [lineColor, setLineColor] = useState({
    light: "rgba(3, 170, 238, 0.5)",
    dark: "rgba(255, 125, 69, 0.6)",
  });
  const [theme, setTheme] = useState("light");
  const toggleTheme = (theme) => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, mapTiles, lineColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
