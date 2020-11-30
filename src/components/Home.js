import React, { useState } from 'react';
import Header from './Header';
import Map from './Map';
import './Home.css';

export default function Home() {

    //  send address to map and setaddrees to header
    const [address, setAddress] = useState({
        addressLat: 51.5085,
        addressLong: -0.12574
    });

    return (
        <div className="home">
                <Header setAddress={setAddress}/>
                <Map address={address}/>
        </div>
    );
}
