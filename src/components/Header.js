import React from 'react';
import Algolia from 'algolia-places-react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './Header.css';

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;


function Header({ setAddress }) {

    return (
        <div className="header">
            <div className="address-field">
                <Algolia
                    placeholder='Where are you going to?'
                    options={{
                        appId: algoliaId,
                        apiKey: algoliaApi,
                        type: ['city', 'address'],
                        aroundLatLngViaIP: true // view suggestions closest to user via IP, true as default
                    }}

                    onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
                        setAddress({
                            addressLat: suggestion.latlng.lat,
                            addressLong: suggestion.latlng.lng
                        });
                        console.log(`query: ${query}\n value: ${suggestion.value}\n lat: ${suggestion.latlng.lat}\n long: ${suggestion.latlng.lng}\n`);
                    }}

                    onSuggestions={() => {
                        console.log('onSuggestions fired')
                    }}

                    onClear={() => {
                        setAddress({
                            addressLat: '',
                            addressLong: ''
                        });
                        console.log('Search field and setAddress is cleared')
                    }}

                    onLimit={(message) => {
                        console.log('The rate limit has been reached: ', message)
                    }}
                    onError={(message) => {
                        console.log('There was a problem retriving this request: ', message)
                    }}
                />

            </div>

            <div className="nav-btn">
                {/* for later:
                relocate buttons from map.js here */}

                <FormControlLabel
                    value='top'
                    control={<Switch
                        color='secondary'
                    />}
                    label='Dark mode'
                    labelPlacement='top'
                />

            </div>
        </div>
    );
}

export default Header
