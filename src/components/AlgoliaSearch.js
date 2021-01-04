import Algolia from "algolia-places-react";

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;

const AlgoliaSearch = ({
  viewport,
  setViewport,
  setUserLocation,
  setCoords,
  setPolylineCoords,
}) => {
  return (
    <>
      <Algolia
        placeholder="Where would you like to go?"
        options={{
          appId: algoliaId,
          apiKey: algoliaApi,
          type: ["city", "address"],
          useDeviceLocation: false,
        }}
        onLocate={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            setViewport({
              ...viewport,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              zoom: 14,
            });
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }}
        onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
          setCoords({
            lat: suggestion.latlng.lat,
            lng: suggestion.latlng.lng,
          });
        }}
        onClear={() => {
          setCoords({
            lat: "",
            lng: "",
          });
          setPolylineCoords([0, 0]);
        }}
        // error handling
        onLimit={(message) => {
          console.log("The rate limit has been reached: ", message);
        }}
        onError={(message) => {
          console.log("There was a problem retriving this request: ", message);
        }}
      />
    </>
  );
};
export { AlgoliaSearch };
