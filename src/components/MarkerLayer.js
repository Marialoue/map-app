import { Marker } from 'react-map-gl';

const MarkerLayer = ({ userLocation, address }) => {

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
                </Marker>) : (null)
            }

            {/* add destination marker when address is provided */}
            {address.addressLat ? (
                <Marker
                    latitude={address.addressLat}
                    longitude={address.addressLong}
                    offsetLeft={-20}
                    offsetTop={-20}
                >
                    <RoomRoundedIcon />
                </Marker>) : (null)
            }
        </>
    );
}

export default MarkerLayer