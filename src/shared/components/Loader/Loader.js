import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Loader.module.scss';

const Loader = () => (
    <CircularProgress className={classes.Loader}/>
);

export default Loader;