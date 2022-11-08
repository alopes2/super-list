import { Button, FormControl, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

const NewItemForm = (props: {onAddItem(newItem: string): void}): ReactElement => {
  const [newItem, setNewItem ] = useState<string>('');


  const onUpdateNewItem = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewItem(value);
  };

  const onAddItem = (event: FormEvent) => {
    event.preventDefault();
    
    props.onAddItem(newItem);

    setNewItem('');
  }

  return (
    <form onSubmit={onAddItem}>
      <FormControl
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <TextField
          required
          name="newItem"
          id="standard-required"
          label="new item"
          value={newItem}
          margin="normal"
          onChange={onUpdateNewItem}
        />
        <Button
          style={{ margin: '5px', height: '100%' }}
          size="small"
          type="submit"
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </FormControl>
    </form>)
};

export default NewItemForm;