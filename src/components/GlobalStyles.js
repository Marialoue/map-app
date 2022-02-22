import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow: hidden;
  lineColor: ${({ theme }) => theme.lineClolor};
  color: ${({ theme }) => theme.color};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  transition: color 400ms linear;
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  z-index: 1;
}

  .map {
    overflow: hidden;
    position: absolute;
    mapStyle: ${({ theme }) => theme.mapStyle};
  }
  
.nav-ctrl {
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 40px;
  color:  ${({ theme }) => theme.color};
}

.btn-group {
  position: fixed;
  display: flex;
  float: right;
  padding: 1rem;
  right: 5%;
  z-index: 2;
  }

.mapboxgl-ctrl-geocoder {
  position: fixed;
  z-index: 3;
  top: 0.5rem;
  width: calc(100vw/3);
  left: calc(100vw/3);
  color:  ${({ theme }) => theme.color};
}

.MuiButton-root{
  color: ${({ theme }) => theme.svgColor};
  svg {
    fill: ${({ theme }) => theme.svgColor};
  }
}
`;
