import Algolia from "algolia-places-react";

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;

const AlgoliaSearch = ({ viewport, setViewport, setUserLocation, setCoords, setPolylineCoords }) => {
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
                userLat: position.coords.latitude,
                userLong: position.coords.longitude,
              });
            });
          }}
        
        onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
          setCoords({
            lat: suggestion.latlng.lat,
            lng: suggestion.latlng.lng,
          });
          console.log(
            `value: ${suggestion.value}\n lat: ${suggestion.latlng.lat}\n long: ${suggestion.latlng.lng}\n`
          );
        }}
        onClear={() => {
          setCoords({
            lat: "",
            lng: "",
          });
          setPolylineCoords([0, 0]);
          console.log(`Search field, setCoords and polylineCoords is cleared`);
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
