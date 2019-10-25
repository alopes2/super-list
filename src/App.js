import React, { useState } from 'react';
import { Container, List } from '@material-ui/core';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import classes from './App.module.scss';

import Lists from './Lists/Lists';
import Layout from './Layout/Layout';
import Auth from './Auth/Auth';

import firebase, { auth } from './config/firebase';



function App() {

  const [user, setUser]= useState(null);
  const provider = new firebase.auth.FacebookAuthProvider();

  const onLogIn = () => {
    auth.signInWithRedirect(provider)
      .then((value) => {
        console.log(value);
      }).catch((reason) => {
        console.error(reason);
    });
  }

  auth.getRedirectResult()
    .then(result => {
      console.log(result.user);
    })
    .catch(err =>{
      console.error(err);
    });

  let render = <List />

  if (user == null)
  {
    render = <Auth onLogIn={onLogIn}/>;
  }

  return (
    <Layout>
      <Container maxWidth="md" className={classes.Container}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Lists} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </Layout>
  );
}

export default withRouter(App);
