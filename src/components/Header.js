import React from "react";
import Algolia from "algolia-places-react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./Header.css";

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;

function Header({ setAddress, setPolylineCoords }) {
  return (
    <div className="header">
      <div className="address-field-left">
        <Algolia 
        placeholder="From?"
         />
      </div>
      <div className="address-field-right">
        <Algolia
          placeholder="To?"
          options={{
            appId: algoliaId,
            apiKey: algoliaApi,
            type: ["city", "address"],
            aroundLatLngViaIP: true, // view suggestions closest to user via IP, true as default
          }}
          onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
            setAddress({
              addressLat: suggestion.latlng.lat,
              addressLong: suggestion.latlng.lng,
            });
            console.log(
              `query: ${query}\n value: ${suggestion.value}\n lat: ${suggestion.latlng.lat}\n long: ${suggestion.latlng.lng}\n`
            );
          }}
          onClear={() => {
            setAddress({
              addressLat: "",
              addressLong: "",
            });
            setPolylineCoords([0, 0]);
            console.log(
              "Search field, setAddress and setPolylineCoords is cleared"
            );
          }}
          onLimit={(message) => {
            console.log("The rate limit has been reached: ", message);
          }}
          onError={(message) => {
            console.log(
              "There was a problem retriving this request: ",
              message
            );
          }}
        />
      </div>
    </div>
  );
}

export default Header;
