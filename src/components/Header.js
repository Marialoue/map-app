import './Header.css';
import React, { useState } from 'react';
import Algolia from 'algolia-places-react';

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;


function Header({ setAddress }) {

    return (
        <div className="header">
            <div>
                <Algolia
                    placeholder='Where are you going?'
                    options={{
                        appId: algoliaId,
                        apiKey: algoliaApi,
                        type: ['city', 'address'],
                        style: true, // change to false for customized style - not implemented
                        aroundLatLngViaIP: true // view suggestions closest to user via IP, true as default
                    }}

                    onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
                        setAddress({
                            addressLat: suggestion.latlng.lat,
                            addressLong: suggestion.latlng.lng
                        });
                        console.log(`query: ${query}\n sugg value: ${suggestion.value}\n lat: ${suggestion.latlng.lat}\n long: ${suggestion.latlng.lng}\n`);
                    }}

                    onSuggestions={() => {
                        console.log('onSuggestions fired')
                    }}

                    onClear={() => { 
                        setAddress({
                            addressLat: '',
                            addressLong: ''
                        });
                        console.log('Search field and setAddress is cleared') }}

                    onLimit={(message) => {
                        console.log('The rate limit has been reached: ', message)
                    }}
                    onError={(message) => {
                        console.log('There was a problem retriving this request: ', message)
                    }}
                />
            </div>
        </div>
    );
}

export default Header
