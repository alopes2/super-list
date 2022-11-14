import { Button, FormControl, TextField, TextFieldProps } from "@mui/material";
import { FormEvent, ReactElement, useRef } from "react";

const NewItemForm = (props: {onAddItem(newItem: string): void}): ReactElement => {
  const newItem = useRef<TextFieldProps>();

  const onAddItem = (event: FormEvent) => {
    event.preventDefault();
    
    const value: string | null = newItem.current?.value as string ?? null;
    
    props.onAddItem(value);

    newItem.current!.value = '';
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
          inputRef={newItem}
          margin="normal"
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