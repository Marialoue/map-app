// component for home

import React from 'react';
import Header from './header';
import Map from './map';
import './home.css';

export default function Home() {

    return (
        <div className="home">
            <Header />
            <Map />
        </div>
    );
}