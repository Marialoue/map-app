import { Marker } from "react-map-gl";
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
// import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';

const DestinationMarker = ({ destination, theme }) => {
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
          <RoomRoundedIcon style={{ fill: theme.color }} />

        </Marker>
      ) : null}
    </>
  );
};

export default DestinationMarker;
