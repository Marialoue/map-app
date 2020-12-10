import { Marker } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const AddressMarker = ({ address }) => {
  return (
    <>
      {/* add destination marker when address is provided */}
      {address.addressLat ? (
        <Marker
          latitude={address.addressLat}
          longitude={address.addressLong}
          offsetLeft={-20}
          offsetTop={-20}
        >
          <RoomRoundedIcon />
        </Marker>
      ) : null}
    </>
  );
};

export default AddressMarker;
