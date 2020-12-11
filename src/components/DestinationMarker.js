import { Marker } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const DestinationMarker = ({ destination }) => {
  return (
    <>
      {/* add destination marker when address is provided */}
      {destination.destLat ? (
        <Marker
          latitude={destination.destLat}
          longitude={destination.destLng}
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