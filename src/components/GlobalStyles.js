// global base styling

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

body {
    margin: 0;
    mapStyle: ${({ theme }) => theme.mapStyle}; 
    lineColor: ${({ theme }) => theme.lineClolor};
    color: ${({ theme }) => theme.color};
    transition: all 0.25s linear;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  svg {
    height: auto;
    width: auto;
    transition: all 0.4s linear;
    fill: ${({ theme }) => theme.fill};
    stroke: ${({ theme }) => theme.svgColor};
  }
  
  .map {
    overflow: hidden;
    position: absolute;
    mapStyle: ${({ theme }) => theme.mapStyle};
  }
  
  .route-btn {
    color: ${({ theme }) => theme.color};
    position: fixed;
    float: right;
    top: 20px;
    right: 12%;
    z-index: 301;
  }

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: ${({ theme }) => theme.background};
    z-index: 201;
  }

// div for algolia search field
  .address-field {
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    position: fixed;
    top: 20px;
  }
  
// div for menu, containing theme toggle and sign up buttons
  .menu {
    color: ${({ theme }) => theme.color};
    position: fixed;
    float: left;
    top: 20px;
    left: 7%;
    z-index: 301;
  }  

// text color for all buttons
  .MuiButton-root{
    color: ${({ theme }) => theme.color};
  }

// background color for navigation control button
  .mapboxgl-ctrl-group{
      background: ${({ theme }) => theme.navColor}
  }

  `;
