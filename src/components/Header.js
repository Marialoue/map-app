import React from "react";
import { AlgoliaSearch } from "./AlgoliaSearch";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Header.css";

function Header({ setDestination, setPolylineCoords }) {
  return (
    <>
      <div className="header">

        <div className="address-field">
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
