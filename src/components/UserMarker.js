import { Marker } from "react-map-gl";
import PersonPinCircleRoundedIcon from "@material-ui/icons/PersonPinCircleRounded";

const UserMarker = ({ userLocation }) => {
  return (
    <>
      {/* add a marker to map when userLocation is provided */}
      {userLocation.userLat ? (
        <Marker
          latitude={userLocation.userLat}
          longitude={userLocation.userLong}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <PersonPinCircleRoundedIcon />
        </Marker>
      ) : null}
    </>
  );
};

export default UserMarker