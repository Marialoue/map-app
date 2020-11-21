// header with search bar
import './header.css';
import React from 'react';

export default function Header() {

    return (
        <div className="header">
            <h2>map map map map</h2>
            <input
                type="text"
                placeholder="search location" />
            <button>go</button>
            <button>find my location</button>
        </div>
    );
}