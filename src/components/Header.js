import React from "react";
import { AlgoliaSearch } from "./AlgoliaSearch";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Header.css";

function Header({ setDestination, setOrigin, setPolylineCoords }) {
  return (
    <>
      <div className="header">
        <div className="address-field-left">
          <AlgoliaSearch setCoords={setOrigin} />
        </div>
        <div className="address-field-right">
          <AlgoliaSearch
            setCoords={setDestination}
            setPolylineCoords={setPolylineCoords}
          />
        </div>
        <div className="theme">
          <Switch></Switch>
        </div>
      </div>
    </>
  );
}

export default Header;
