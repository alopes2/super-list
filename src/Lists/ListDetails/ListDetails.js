import React, { useState, useEffect } from 'react';
import { Container, List, makeStyles, Divider, Typography, Button, TextField } from '@material-ui/core';
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
        items: [],
        newItem: ''
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
                            const items = [];
                            for(let docs of querySnapshot.docs) {
                                const data = docs.data();
                                items.push({
                                        id: docs.id,
                                        name: data.name,
                                        done: data.done
                                    });
                            }
                            setState(prevState => ({
                                ...prevState,
                                name: listData.name,
                                id: doc.id,
                                items: [
                                    ...items
                                ],
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
        firestore.collection('items')
            .doc(item.id)
            .update({done: !item.done})
            .then(result => {
                console.log(result);
            });

        const items = [...state.items];
        const itemIndex = items.findIndex(i => i.id === item.id);
        const listItem = {...items[itemIndex], done: !item.done};

        items[itemIndex] = {...listItem};

        setState(prevState => ({
            ...prevState, 
            items: [...items]
        }));
    }

    const onUpdateNewItem = (event) => {
        const value = event.target.value;

        setState(prevState => ({
            ...prevState,
            newItem: value
        }));
    }

    const onAddItem = (event) => {
        event.preventDefault();
        
        const itemToBeAdded = {
            name: state.newItem, 
            done: false,
            listId: props.match.params['id']
        };

        firestore.collection('items')
            .add(itemToBeAdded)
            .then(result => {
                console.log(result);
            });
        
        const updatedItems = [...state.items, itemToBeAdded];

        setState(prevState => ({
            ...prevState,
            items: updatedItems,
            newItem: ''
        }));
    }

    let render = <Loader />;

    if (!state.loading) {
        const ready = state.items.filter(i => !i.done).map((item) => (
            <ListItem 
                key={item.id}
                name={item.name}
                done={item.done}
                onItemClick={() => onItemClick(item)}
                />
        ));
        const done = state.items.filter(i => i.done).map((item) => (
            <ListItem 
                key={item.id}
                name={item.name}
                done={item.done}
                onItemClick={() => onItemClick(item)}
                />));
        
        const renderReady = ready.length > 0 ? ready : <Typography style={{margin: '15px'}}>No items here.</Typography>;
        const renderDone = done.length > 0 ? done : <Typography style={{margin: '15px'}}>No items here.</Typography>;

        render = (
            <React.Fragment>
                <h1>{state.name}</h1>
                <form onSubmit={onAddItem} style={{display: 'flex', alignItems: 'flex-end'}}>
                    <TextField
                      required
                      name="newItem"
                      id="standard-required"
                      label="new item name"
                      value={state.newItem}
                      margin="normal"
                      onChange={onUpdateNewItem}
                    />
                    <Button style={{margin: '5px'}} size="small" type="submit" variant="contained" color="primary">Add</Button>
                </form>
                <h3 className={classes.sectionTitle}>Items</h3>
                <Divider />
                <List className={classes.root}>
                    {renderReady}
                </List>
                <h3 className={classes.sectionTitle}>Done</h3>
                <Divider />
                <List className={classes.root}>
                    {renderDone}
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