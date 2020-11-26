// header with search bar
import './Header.css';
import React from 'react';
import Algolia from 'algolia-places-react';


// autocomplete function
const algoliaId = process.env.REACT_APP_ALGOLIA_ID;
const algoliaApi = process.env.REACT_APP_ALGOLIA_API;


function Header() {

    return (
        <div className="header">
            <h2>route finder</h2>
            <Algolia
                options={{
                    appId: algoliaId,
                    apiKey: algoliaApi,
                    type: ['city', 'address']
                }}
            />
        </div>
    );
}

export default Header
