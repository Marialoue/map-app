import Algolia from "algolia-places-react";

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;

const AlgoliaSearch = ({ setCoords, setPolylineCoords }) => {
  return (
    <>
      <Algolia
        options={{
          appId: algoliaId,
          apiKey: algoliaApi,
          type: ["city", "address"],
          aroundLatLngViaIP: true, // view suggestions closest to user via IP, true as default
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
          setPolylineCoords([0,0])
          console.log("Search field, setCoords and polylineCoords is cleared");
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