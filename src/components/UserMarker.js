import { Marker } from "react-map-gl";
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';

const UserMarker = ({ userLocation, theme }) => {
  return (
    <>
      {/* add a marker to map when userLocation is provided */}
      {userLocation.lat ? (
        <Marker
          latitude={userLocation.lat}
          longitude={userLocation.lng}
          offsetLeft={0}
          offsetTop={0}
        >
          <PersonPinCircleRoundedIcon style={{ fill: theme.color }} />
        </Marker>
      ) : null}
    </>
  );
};

export default UserMarker;
