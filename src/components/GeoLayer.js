import { Source, Layer } from 'react-map-gl';

const GeoLineLayer = ({ destination, polylineCoords }) => {
    const geojsonLine = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: polylineCoords
            }
        }]
    };
    return (
        <>
            {/* showing polylineLayer when destination is validated and btn (handleSearch) is clicked */}
            {destination.lat ? (
                <Source id='polylineLayer' type='geojson' data={geojsonLine}>
                    <Layer
                        id='line'
                        type='line'
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color': 'rgba(3, 170, 238, 0.5)',
                            'line-width': 5,
                        }}
                    />
                </Source>) : (null)}
        </>
    );
}
export default GeoLineLayer