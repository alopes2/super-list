import React from 'react';
import { Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import classes from './App.module.scss';

import Lists from './Lists/Lists';
import Layout from './Layout/Layout';

import firebase, { auth } from './config/firebase';



function App() {

  const provider = new firebase.auth.FacebookAuthProvider();

  console.log(provider);

  auth.signInWithPopup(provider)
    .then((value) => {
      console.log(value);
    }).catch((reason) => {
      console.error(reason);
  });

  return (
    <Layout>
      <Container maxWidth="md" className={classes.Container}>
        <Lists />
      </Container>
    </Layout>
  );
}

export default withRouter(App);
