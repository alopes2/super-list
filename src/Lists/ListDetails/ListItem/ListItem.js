import React from 'react';
import { Checkbox, ListItem } from '@material-ui/core';

const OwnListItem = props => {
    return (
        <ListItem dense button>
            <Checkbox checked={props.done}/>
            <span>{props.name}</span>
        </ListItem>
    )
};

export default OwnListItem;