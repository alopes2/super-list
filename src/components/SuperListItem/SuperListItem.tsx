import { Checkbox, ListItem } from "@mui/material";
import { ReactElement } from "react";
import classes from './SuperListItem.module.scss';

type ItemProps = {
  onItemClick(): void;
  done: boolean;
  name: string;
};

const SuperListItem = (props: ItemProps): ReactElement => {
  const styles = props.done ? classes.Done : '';
  return(
    <ListItem dense button onClick={props.onItemClick}>
        <Checkbox checked={props.done}/>
        <span className={styles}>{props.name}</span>
    </ListItem>
    );
}

export default SuperListItem;