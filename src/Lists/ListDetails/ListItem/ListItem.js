import React from 'react';
import { Checkbox } from '@material-ui/core';

const ListItem = props => {
    return (
        <div>
            <Checkbox checked={props.done}/>
            <span>{props.name}</span>
        </div>
    )
};

export default ListItem;