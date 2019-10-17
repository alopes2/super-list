import React, { useState, useEffect } from 'react';
import { Container, List, makeStyles, Divider } from '@material-ui/core';
import ListItem from './ListItem/ListItem';
import Loader from '../../shared/components/Loader/Loader.js';
import { firestore } from '../../config/firebase';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    sectionTitle: {
        marginTop: '30px',
        marginBottom: 2
    }
  }));

const ListDetails = props => {
    const classes = useStyles();
    const [state, setState] = useState({ 
        name: null, 
        id: null,
        loading: true,
        items: {
            ready: [],
            done: []
        }
    });

    useEffect(() => {
        firestore.collection('lists')
            .doc(props.match.params['id'])
            .get()
            .then(doc => {
                if (doc.exists) {
                    const listData = doc.data();
                    firestore.collection('items')
                        .where('listId', '==', doc.id)
                        .get()
                        .then((querySnapshot) => {
                            const readyItems = [];
                            const doneItems = [];
                            for(let docs of querySnapshot.docs) {
                                const data = docs.data();
                                if (data.done) {
                                    doneItems.push({
                                        id: docs.id,
                                        name: data.name,
                                        done: data.done
                                    });
                                } else {
                                    readyItems.push({
                                        id: docs.id,
                                        name: data.name,
                                        done: data.done
                                    });
                                }
                            }
                            setState(prevState => ({
                                ...prevState,
                                name: listData.name,
                                id: doc.id,
                                items: {
                                    ready: [...readyItems],
                                    done: [...doneItems]
                                },
                                loading: false
                            }));
                        });
                } else {
                    setState(prevState => ({
                        ...prevState,
                        loading: false
                    }));
                }
            });
    }, [props.match.params]);

    const onItemClick = (item) => {
        
    }

    let render = <Loader />;

    if (!state.loading) {
        const ready = state.items.ready.map(item => (
            <ListItem 
                key={item.id}
                name={item.name}
                done={item.done}
                />
        ));
        const done = state.items.done.map(item => (
            <ListItem 
                key={item.id}
                name={item.name}
                done={item.done}
                />));

        render = (
            <React.Fragment>
                <h1>{state.name}</h1>
                <h3 className={classes.sectionTitle}>Items</h3>
                <Divider />
                <List className={classes.root}>
                    {ready}
                </List>
                <h3 className={classes.sectionTitle}>Done</h3>
                <Divider />
                <List className={classes.root}>
                    {done}
                </List>
            </React.Fragment>
        );
    }

    return (
        <Container maxWidth='sm'>
                {render}
        </Container>
    );
}

export default ListDetails;