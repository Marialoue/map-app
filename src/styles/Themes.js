import { lightBlue, blue, grey, deepOrange } from "@mui/material/colors";

export const themes = {
  light: {
    background: grey[50],
    accent: blue[900],
    lightAccent: lightBlue[200],
    color: grey[900],
    bgHeader: `linear-gradient(180deg,  ${grey[400]}, transparent)`,
    boxShadowColor: grey[500],
    marker: grey[900],
  },
  dark: {
    background: grey[900],
    accent: deepOrange[600],
    lightAccent: deepOrange[200],
    color: grey[900],
    bgHeader: `linear-gradient(180deg, ${grey[900]}, transparent)`,
    boxShadowColor: "none",
    marker: grey[200],
  },
};
