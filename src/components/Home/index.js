import React from 'react';

import {  withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';


import Dashboard from '../Dashboard';




const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Dashboard />
    </div>
);



const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);