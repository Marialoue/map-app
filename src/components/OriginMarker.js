import { Marker } from "react-map-gl";
import PersonPinCircleRoundedIcon from "@material-ui/icons/PersonPinCircleRounded";

const OriginMarker = ({ origin }) => {
  return (
    <>
      {origin.lat ? (
        <Marker
          latitude={origin.lat}
          longitude={origin.lng}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <PersonPinCircleRoundedIcon />
        </Marker>
      ) : null}
    </>
  );
};

export default OriginMarker;
