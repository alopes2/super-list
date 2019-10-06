import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import classes from './ListCard.module.scss';

export default function ListCard(props) {
    const { list } = props;
  return (
    <Card className={classes.Card} onClick={() => props.onListDetails(props.list.id)}>
      <CardContent>
        <Typography className={classes.Title} color="textSecondary" gutterBottom>
          {list.createdAt.toLocaleDateString()}
        </Typography>
        <Typography variant="h5" component="h2">
            {list.name}
        </Typography>
        <Typography className={classes.Pos} color="textSecondary">
          {list.createdBy}
        </Typography>
      </CardContent> 
    </Card>
  );
}