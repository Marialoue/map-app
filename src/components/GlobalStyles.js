// global base styling

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

  .home{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  
  .map {
    overflow: hidden;
    position: absolute;
    mapStyle: ${({ theme }) => theme.mapStyle};
  }
  
  // .route-btn {
  //   color: ${({ theme }) => theme.color};
  //   position: fixed;
  //   float: right;
  //   top: 20px;
  //   right: 12%;
  //   z-index: 301;
  // }

.header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: ${({ theme }) => theme.background};
    z-index: 201;
    height: 13vh;
    padding: 1rem;
    
  }

  // div for menu, containing theme toggle and sign up buttons
  .menu {

  }  

// div for algolia search field
  .address-field {
    position: relative;
    z-index: inherit;
    float: left;
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
