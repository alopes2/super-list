import React from 'react';
import classes from './Auth.module.scss';

import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';

import firebase, { auth } from '../config/firebase';

const Auth = (props) => {
    
  const provider = new firebase.auth.FacebookAuthProvider();

  const onLogIn = () => {
    auth.signInWithRedirect(provider)
      .then((value) => {
        console.log(value);
      }).catch((reason) => {
        console.error(reason);
    });
  }

    return (
        <div className={classes.LogInContainer}>
            <div className={classes.FacebookButton} onClick={onLogIn}>
                <FacebookBoxIcon />
                <span> Connect with facebook</span>
            </div>
        </div>);
};

export default Auth;