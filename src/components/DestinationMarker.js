import { Marker } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import destinationIcon from "../icons/arrow-down.svg";

const DestinationMarker = ({ destination, isDarkMode }) => {
  return (
    <>
      {/* add destination marker when address is provided */}
      {destination.lat ? (
        <Marker
          latitude={destination.lat}
          longitude={destination.lng}
          offsetLeft={-20}
          offsetTop={-20}
        >
          {isDarkMode ? (
            <RoomRoundedIcon style={{ fill: "white" }} />
            // <img src={destinationIcon} alt="destination-icon" />
          ) : (
            <RoomRoundedIcon style={{ fill: "currentColor" }} />
          )}
        </Marker>
      ) : null}
    </>
  );
};

export default DestinationMarker;
