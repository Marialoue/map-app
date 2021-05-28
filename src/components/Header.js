import React, { useState } from "react";
import { AlgoliaSearch } from "./AlgoliaSearch";
import Button from "@material-ui/core/Button";
import Signup from "./Signup";
import "./Signup.css";
import { ReactComponent as Sun } from "../icons/sun.svg";
import { ReactComponent as Moon } from "../icons/moon.svg";

function Header({
  toggleTheme,
  theme,
  viewport,
  setViewport,
  setUserLocation,
  setDestination,
  setPolylineCoords,
}) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div className="header">
        <div className="menu">
          <Button onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon onClick={toggleTheme} />
            ) : (
              <Sun onClick={toggleTheme} />
            )}
          </Button>
          <Button onClick={openModal}>Sign up</Button>
          <Signup showModal={showModal} setShowModal={setShowModal} />
        </div>
        <div className="address-field">
          <AlgoliaSearch
            setUserLocation={setUserLocation}
            viewport={viewport}
            setViewport={setViewport}
            setCoords={setDestination}
            setPolylineCoords={setPolylineCoords}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
