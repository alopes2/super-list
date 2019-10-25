import React from 'react';
import classes from './Auth.module.scss';

import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';

const Auth = (props) => (
    <div className={classes.LogInContainer}>
        <div className={classes.FacebookButton}>
            <FacebookBoxIcon />
            <span> Connect with facebook</span>
        </div>
    </div>
    );

export default Auth;