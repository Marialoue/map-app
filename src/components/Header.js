import './Header.css';
import React, { useState } from 'react';
import Algolia from 'algolia-places-react';

const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;

/* todo:
    * add state to save address in 
    * on search - save address to state
    * show address on map
*/

function Header() {

    const [address, setAddress] = useState('');

    return (
        <div className="header">
            <h2>route finder</h2>
            <div>
                <Algolia
                    placeholder=''
                    options={{
                        appId: algoliaId,
                        apiKey: algoliaApi,
                        type: ['city', 'address'],
                        style: true // change to false for customized style - not implemented
                    }}
                    onChange={({ suggestion }) => {
                        setAddress(suggestion.value);
                    }}
                />
            </div>
        </div>
    );
}

export default Header
