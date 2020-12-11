import React from "react";
import { AlgoliaOrigin, AlgoliaDestination } from "./AlgoliaSearch";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Header.css";

function Header({ setDestination, setOrigin, setPolylineCoords }) {
  return (
    <div className="header">
      <div className="address-field-left">
        <AlgoliaOrigin setOrigin={setOrigin} />
      </div>
      <div className="address-field-right">
        <AlgoliaDestination
          setDestination={setDestination}
          setPolylineCoords={setPolylineCoords}
        />
      </div>
    </div>
  );
}

export default Header;
