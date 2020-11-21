import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';


const mapToken = process.env.REACT_APP_TOKEN;

export default function Map() {
    // define a initial viewpoint
    const [viewport, setViewport] = useState({
        width: 1000,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 10
    });

    return(
        <div className="map">
            <ReactMapGL
            {...viewport} 
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={mapToken}/>
        </div>
    );
}
