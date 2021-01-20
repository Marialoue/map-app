import React, { useState } from "react";
import ReactMapGL, {
  //   WebMercatorViewport,
  //   LinearInterpolator,
  FlyToInterpolator,
  NavigationControl,
} from "react-map-gl";
import Button from "@material-ui/core/Button";
import UserMarker from "./UserMarker";
import DestinationMarker from "./DestinationMarker";
import GeoLayer from "./GeoLayer";
import "./Map.css";

export default function Map({
  toggleTheme,
  theme,
  viewport,
  setViewport,
  userLocation,
  destination,
  polylineCoords,
  setPolylineCoords,
}) {
  // for mapbox
  const mapToken = process.env.REACT_APP_TOKEN;

  const [travelTime, setTravelTime] = useState();
  const options = {
    profile: "driving",
    origin: {
      lat: userLocation.lat,
      lng: userLocation.lng,
    },
    destination: {
      lat: destination.lat,
      lng: destination.lng,
    },
  };

  const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/${options.profile}/${options.origin.lng},${options.origin.lat};${options.destination.lng},${options.destination.lat}?alternatives=true&geometries=geojson&access_token=${mapToken}`;

  const gotoSearchedLocation = () => {
    setViewport({
      ...viewport,
      latitude: destination.lat,
      longitude: destination.lng,
      zoom: 14,
      transitionDuration: 3000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const getUrlResponse = () => {
    // fetch url and save coords from first route in array
    fetch(mapboxUrl)
      .then((response) => response.json())
      .then((response) => {
        const coordsArr = response.routes[0].geometry.coordinates;
        setPolylineCoords(coordsArr);
      });
  };

  // get duration and distance
  // duration is response in seconds, convert to hours and min response / 3,600
  const getDuration = () => {
    fetch(mapboxUrl)
      .then((response) => response.json())
      .then((response) => {
        const hours = response.routes[0].duration / 3600;
        // const min = hours * 60;
        setTravelTime(hours);
        console.log(`traveltime: ${hours}`);
      });
  };

  const handleSearch = () => {
    destination && userLocation.lat && destination.lat
      ? getAllSearchData()
      : alert(
          "Oh no, you for got to enter " +
            (userLocation.lat ? "a destination" : "your location")
        );
  };

  const getAllSearchData = () => {
    getUrlResponse();
    gotoSearchedLocation();
    getDuration();
  };

  return (
    <div>
      <div className="route-btn">
        <Button style={{ color: theme.color }} onClick={handleSearch}>
          Find route
        </Button>
      </div>

      <div className="map">
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={mapToken}
          mapStyle={theme.mapStyle}
        >
          <div className="nav-ctrl" theme={theme}
            style={{
              position: "absolute",
              zIndex: 301,
              top: 10,
              right: 10,
              color: theme.color
            }}
          >
            <NavigationControl showCompass={true} />
          </div>

          <GeoLayer
            destination={destination}
            polylineCoords={polylineCoords}
            theme={theme}
          />
          <UserMarker theme={theme} userLocation={userLocation} />
          <DestinationMarker theme={theme} destination={destination} />
        </ReactMapGL>
      </div>
    </div>
  );
}
