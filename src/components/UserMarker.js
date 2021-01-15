import { Marker } from "react-map-gl";
import PersonPinCircleRoundedIcon from "@material-ui/icons/PersonPinCircleRounded";

const UserMarker = ({ userLocation, isDarkMode }) => {
    
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
          {isDarkMode ? (
            <PersonPinCircleRoundedIcon style={{ fill: "white" }} />
          ) : (
            <PersonPinCircleRoundedIcon style={{ fill: "currentColor" }} />
          )}
        </Marker>
      ) : null}
    </>
  );
};

export default UserMarker;
