import React, { useState } from 'react';
import Header from './Header';
import Map from './Map';
import './Home.css';

export default function Home() {

    //  address to be used in Map, and setaddrees in Header
    const [address, setAddress] = useState({
        addressLat: null,
        addressLong: null
    });

    // add a theme to set light or dark theme 

    return (
        <div className="home">
            <Header
                setAddress={setAddress}
            />
            <Map
                address={address}
            />
        </div>
    );
}
