import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ReactElement } from 'react';
import classes from './SuperListItem.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';

type ItemProps = {
  onItemClick(): void;
  onDeleteIconClick(): void;
  id: string;
  done: boolean;
  name: string;
};

const SuperListItem = (props: ItemProps): ReactElement => {
  const styles = props.done ? classes.Done : '';
  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={props.onDeleteIconClick}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={props.onItemClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.done}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': props.id }}
          />
        </ListItemIcon>
        <ListItemText className={styles} id={props.id} primary={props.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default SuperListItem;
