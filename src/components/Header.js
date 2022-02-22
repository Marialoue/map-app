import React, { useState } from "react";
import Button from "@mui/material/Button";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import Signup from "./Signup";
import "./Signup.css";

function Header({ toggleTheme, theme }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <header className="header">
      <Button onClick={toggleTheme}>
        {theme === "light" ? (
          <DarkModeRoundedIcon onClick={toggleTheme} />
        ) : (
          <WbSunnyRoundedIcon onClick={toggleTheme} />
        )}
      </Button>
      <Button onClick={openModal}>Sign up</Button>
      <Signup showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
}

export default Header;
