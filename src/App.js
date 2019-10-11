import React from 'react';
import { Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Lists from './Lists/Lists';
import Layout from './Layout/Layout';

function App() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Lists />
      </Container>
    </Layout>
  );
}

export default withRouter(App);
