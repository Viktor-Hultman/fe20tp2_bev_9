import React from 'react';

import {  withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';

import HomeSearch from '../FetchSearch';



const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <HomeSearch />

    </div>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);