import React, { useContext } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import { themes } from "../styles/Themes";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  transition: color 400ms linear;
  background: ${(props) => props.theme.background};
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  z-index: 1;
}

.btn {
  border: none;
  background: white;
  border-radius: 5px;
  padding: 0.3rem;
  margin: 0.3rem;
  svg {
    fill: ${(props) => props.theme.svgColor};
  }
}

.map {
  overflow: hidden;
  position: absolute;
  mapStyle: ${(props) => props.theme.mapStyle};
}

.btn-group {
  position: fixed;
  z-index: 2;
  display: flex;
  float: right;
  padding: 1rem;
  right: 5%;
}

.btn-group-btn {
  border: none;
  background: white;
  border-radius: 20%;
  padding: 0.3rem;
  svg {
    fill: ${(props) => props.theme.svgColor};
  }
}

.nav-ctrl {
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 40px;
  color: ${(props) => props.theme.color};
}

.mapboxgl-ctrl-geocoder {
  position: fixed;
  z-index: 3;
  top: 0.5rem;
  width: calc(100vw/3);
  left: calc(100vw/3);
  color:  ${(props) => props.theme.color};
}


`;

const Theme = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
