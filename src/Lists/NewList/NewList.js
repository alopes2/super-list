import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Typography } from '@material-ui/core';
import { NavLink, withRouter } from 'react-router-dom';
import { firestore } from '../../config/firebase';

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
        const newList = {
            name: values.name,
            createdAt: new Date(),
            createdBy: props.user
        }
        firestore.collection('lists')
            .add(newList)
            .then(result => {
                props.history.push('/');
            });
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

const mapStateToProps = (state) => ({
    user: state.auth.name
});

export default withRouter(connect(mapStateToProps)(NewList));