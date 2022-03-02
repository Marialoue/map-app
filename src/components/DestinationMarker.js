import { Marker } from "react-map-gl";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";

const DestinationMarker = ({ destination }) => {
  return (
    <>
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
