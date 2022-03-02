import { useContext } from "react";
import { Source, Layer } from "react-map-gl";

import { ThemeContext } from "../context/ThemeContext";

const GeoLineLayer = ({ destination, polylineCoords }) => {
  const { theme, lineColor } = useContext(ThemeContext);

  const geojsonLine = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: polylineCoords,
        },
      },
    ],
  };

  const layerStyle = {
    id: "line",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": `${lineColor[theme]}`,
      "line-width": 5,
    },
  };

  return (
    <>
      {destination.lat ? (
        <Source id="polylineLayer" type="geojson" data={geojsonLine}>
          <Layer {...layerStyle} />
        </Source>
      ) : null}
    </>
  );
};
export default GeoLineLayer;
