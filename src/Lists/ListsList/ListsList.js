import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { firestore } from '../../config/firebase';
import ListCard from './ListCard/ListCard';
import classes from './ListsList.module.scss';
import Loader from '../../shared/components/Loader/Loader';

const ListsList = (props) => {
    const [state, setState] = useState({
        loading: true,
        lists: []
    });

    const onListDetails = (id) => {
        props.history.push(id);
    }

    useEffect(() => {
            firestore.collection("lists")
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

    let render = <Loader />;

    if (!state.loading) {
        render = <h3>No lists were found yet.</h3>;
        if (state.lists.length > 0) {
            render = 
            <ul className={classes.List}>
                {
                    state.lists.map(l => <li key={l.id}>
                        <ListCard  list={l} 
                                onListDetails={(id) => onListDetails(id)}/>
                            </li>)
                }
            </ul>
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
            {render}
        </React.Fragment>
        );
};

export default ListsList;