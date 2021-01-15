import React, { useState } from "react";
import { AlgoliaSearch } from "./AlgoliaSearch";
import Button from "@material-ui/core/Button";
import Signup from "./Signup";
import "./Header.css";
import "./Signup.css";

function Header({
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
        <div className="address-field">
          <AlgoliaSearch
            setUserLocation={setUserLocation}
            viewport={viewport}
            setViewport={setViewport}
            setCoords={setDestination}
            setPolylineCoords={setPolylineCoords}
          />
        </div>
        <div className="menu">
          <Button style={{ color: "white" }} onClick={openModal}>
            Sign up
          </Button>
          <Signup showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
}

export default Header;
