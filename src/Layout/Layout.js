import React from 'react';
import Navigation from './Navigation/Navigation';

const Layout = props => (
    <React.Fragment>
        <Navigation />
        <main>
            {props.children}
        </main>
    </React.Fragment>
);

export default Layout;