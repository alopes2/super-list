import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
//import db from '../../config/firebase-datastore';

import classes from './NewList.module.scss';

const NewList = props => {
    const [values, setValues] = useState({
      name: '',
    });
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    const onSaveList = event => {
        event.preventDefault();
        console.log(values);
    };

    return (
        <div className={classes.FormContainer}>
            <Typography variant="h2" className={classes.Title}>New list</Typography>
            <form noValidate autoComplete="off" onSubmit={onSaveList}>
                <TextField
                  id="standard-name"
                  label="Name"
                  value={values.name}
                  className={classes.TextField}
                  onChange={handleChange('name')}
                  margin="normal"
                />
                <div className={classes.ButtonGroup}>
                    <Button variant="contained" color="primary" type="submit">save</Button>
                    <NavLink to="/">
                        <Button variant="contained" color="default" type="button">cancel</Button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default NewList;