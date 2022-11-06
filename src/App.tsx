import { ReactElement } from 'react';
import { Container, Typography } from '@mui/material';
import ItemsList from './components/List';
import classes from './App.module.scss';

function App(): ReactElement {
  return (
    <Container maxWidth="md">
      <div className={classes.Title}>
        <Typography variant="h2" component="h2">
          Super List
        </Typography>
      </div>
      <ItemsList />
    </Container>
  );
}

export default App;
