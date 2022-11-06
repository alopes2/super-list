import { Button, FormControl, TextField } from '@mui/material';
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Item } from './Item';
import SuperListItem from './SuperListItem/SuperListItem';

const ItemsList = (): ReactElement => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItem] = useState<string>('');

  useEffect(() => {
    const myItems: Item[] = [1, 2, 3, 4].map((i) => {
      return {
        done: false,
        id: i.toString(),
        name: `Item ${i}`,
      };
    });

    setItems(myItems);
  }, []);

  const onClickItem = (item: Item) => {
    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((i) => i.id === item.id);

    updatedItems[itemIndex] = {
      ...items[itemIndex],
      done: !item.done,
    };

    setItems(updatedItems);
  };

  const onUpdateNewItem = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewItem(value);
  };

  const onAddItem = (event: FormEvent) => {
    event.preventDefault();

    const updatedItems = [...items];
    const newItem: Item = {
      done: false,
      name: newItemName,
      id: (Math.random() * 1000000).toString(),
    };

    updatedItems.push(newItem);

    setItems(updatedItems);
  };

  const list: ReactElement[] = items.map((i) => (
    <SuperListItem
      key={i.id}
      done={i.done}
      name={i.name}
      onItemClick={() => onClickItem(i)}
    />
  ));

  return (
    <>
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
            value={newItemName}
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
      </form>
      <hr />
      {list}
    </>
  );
};

export default ItemsList;
