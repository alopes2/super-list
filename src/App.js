import React from 'react';
import { Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import classes from './App.module.scss';

import Lists from './Lists/Lists';
import Layout from './Layout/Layout';

function App() {
  return (
    <Layout>
      <Container maxWidth="md" className={classes.Container}>
        <Lists />
      </Container>
    </Layout>
  );
}

export default withRouter(App);
