import React, { useContext } from "react";

import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <button className="btn">
        {theme === "dark" ? (
          <WbSunnyRoundedIcon onClick={() => toggleTheme("light")} />
        ) : (
          <DarkModeRoundedIcon onClick={() => toggleTheme("dark")} />
        )}
      </button>
    </header>
  );
}

export default Header;
