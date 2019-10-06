import React, { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import ListItem from './ListItem/ListItem';
import db from '../../config/firebase-datastore';

const ListDetails = props => {
    const [state, setState] = useState({ 
        name: null, 
        id: null,
        loading: true,
        items: []
    });

    useEffect(() => {
        db.collection('lists')
            .doc(props.match.params['id'])
            .get()
            .then(doc => {
                if (doc.exists) {
                    const listData = doc.data();
                    db.collection('items')
                        .where('listId', '==', doc.id)
                        .get()
                        .then((querySnapshot) => {
                            const tempItems = [];
                            for(let docs of querySnapshot.docs) {
                                const data = docs.data();
                                tempItems.push({
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
                                    ...tempItems
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

    let render = <CircularProgress />;

    if (!state.loading) {
        const items = state.items.map(item => (
            <ListItem 
                key={item.id}
                name={item.name}
                done={item.done}
                />
        ));

        render = (
            <React.Fragment>
                <h1>{state.name}</h1>
                {items}
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