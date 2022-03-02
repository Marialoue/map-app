import { Marker } from "react-map-gl";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";

const UserMarker = ({ userLocation }) => {
  return (
    <>
      {userLocation.lat ? (
        <Marker
          latitude={userLocation.lat}
          longitude={userLocation.lng}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <PersonPinCircleRoundedIcon />
        </Marker>
      ) : null}
    </>
  );
};

export default UserMarker;
