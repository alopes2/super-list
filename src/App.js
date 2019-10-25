import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import classes from './App.module.scss';

import Lists from './Lists/Lists';
import Layout from './Layout/Layout';
import Auth from './Auth/Auth';



function App(props) {
  useEffect( () => {
    props.onTryAutoLogin();
  }, [props]);

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

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.auth())
  }
}

export default withRouter( connect(null, mapDispatchToProps)(App) );
