import { Checkbox, ListItem } from "@mui/material";
import { ReactElement } from "react";

const ItemsList = (): ReactElement => {
  return (
    <ListItem dense button>
        <Checkbox />
        <span>Olar</span>
    </ListItem>
  );
}

export default ItemsList;