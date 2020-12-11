import { Marker } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const DestinationMarker = ({ destination }) => {
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
          <RoomRoundedIcon />
        </Marker>
      ) : null}
    </>
  );
};

export default DestinationMarker;
