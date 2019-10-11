import React from 'react';
import Navigation from './Navigation/Navigation';

import classes from './Layout.module.scss';

const Layout = props => (
    <div className={classes.Layout}>
        <Navigation />
        <main className={classes.Main}>
            {props.children}
        </main>
    </div>
);

export default Layout;