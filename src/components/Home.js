import React from 'react';
import Header from './Header';
import Map from './Map';
import './Home.css';

export default function Home() {

    return (
        <div className="home">
            <Header />
            <Map />
        </div>
    );
}
