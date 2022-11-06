import { ReactElement } from 'react';
import { Container, Typography } from '@mui/material';
import ItemsList from './components/ItemsLIst';
import classes from './App.module.scss';

function App(): ReactElement {
  console.log(process.env.REACT_APP_TEST);
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
