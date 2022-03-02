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
  --box-shadow: 0 1px 1px ${(props) => props.theme.boxShadowColor}, 
  0 2px 2px ${(props) => props.theme.boxShadowColor}, 
  0 4px 4px ${(props) => props.theme.boxShadowColor}, 
  0 8px 8px ${(props) => props.theme.boxShadowColor};
  
  --box-shadow-soft: 0px 4px 6px -1px ${(props) => props.theme.boxShadowColor}, 
  0px 2px 4px -1px ${(props) => props.theme.boxShadowColor};
  transition: all 500ms linear;
}

.btn {
  position: relative;
  transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
  text-transform: uppercase;
  background: transparent;
  color: ${(props) => props.theme.accent};
  border: solid 1px ${(props) => props.theme.lightAccent};
  border-radius: 5px;
  box-shadow: var(--box-shadow-soft);
  padding: 0.6rem;
  margin: 0 0.5rem;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.accent};
  }
}

.btn:hover {
  transform: scale(1.1,1.1);
  background: ${(props) => props.theme.background};
}

.btn:hover::after {
  opacity: 1;
}

.btn::after {
  content: "";
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: var(--box-shadow);
  transition: all .6s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0;
  z-index: -1;
}

.btn-group {
  position: fixed;
  z-index: 2;
  display: flex;
  float: right;
  padding: 1rem;
  right: 5%;
}

.header {
  background: ${(props) => props.theme.bgHeader};
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  z-index: 1;
}

.map {
  overflow: hidden;
  position: absolute;
}

.nav-ctrl {
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 40px;
}

.mapboxgl-ctrl-geocoder {
  position: fixed;
  z-index: 3;
  margin: 0;
  top: 1%;
  width: calc(100vw/3);
  left: calc(100vw/3);
}

.mapboxgl-marker {
  svg {
    fill: ${(props) => props.theme.accent};
  }
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
