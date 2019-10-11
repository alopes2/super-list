import React, { useState, useEffect } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import db from '../../config/firebase-datastore';
import ListCard from './ListCard/ListCard';
import classes from './ListsList.module.scss';

const ListsList = (props) => {
    const [state, setState] = useState({
        loading: true,
        lists: []
    });

    const onListDetails = (id) => {
        props.history.push(id);
    }

    useEffect(() => {
        db.collection("lists")
            .get()
            .then((querySnapshot) => {
                var tempLists = [];
                for (var doc of querySnapshot.docs) {
                    var data = doc.data();
                    tempLists.push({
                        id: doc.id,
                        createdAt: new Date(data.createdAt.seconds * 1000),
                        createdBy: data.createdBy,
                        name: data.name
                    });
                }

                setState({
                    loading: false,
                    lists: [...tempLists]
                });
            });
    }, []);

    let render = <CircularProgress className={classes.Loader}/>;

    if (!state.loading) {
        render = <h3>No lists were found yet.</h3>;
        if (state.lists.length > 0) {
            render = state.lists.map(l => <li key={l.id}>
                <ListCard  list={l} 
                    onListDetails={(id) => onListDetails(id)}/>
                </li>);
        }
    }

    return (
        <React.Fragment>
            <NavLink 
                to="new"
                className={classes.AddListButton}>
                <Button 
                    variant="contained" 
                    color="primary">Add list</Button>
            </NavLink>
            <ul className={classes.List}>
                {render}
            </ul>
        </React.Fragment>
        );
};

export default ListsList;