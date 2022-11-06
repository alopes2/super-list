import { Button, FormControl, List, TextField } from '@mui/material';
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Item, NewItem } from './Item';
import SuperListItem from './SuperListItem/SuperListItem';
import { firestore } from '../config/firebase';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

const ItemsList = (): ReactElement => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItem] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'items'),
      (querySnapshot) => {
        const dbItems = querySnapshot.docs.map<Item>((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            done: data.done,
            name: data.name,
          };
        });

        setItems(dbItems);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const onClickItem = async (item: Item) => {
    await setDoc(
      doc(firestore, 'items', item.id),
      {
        done: !item.done,
      },
      { merge: true }
    );
  };

  const onUpdateNewItem = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewItem(value);
  };

  const onAddItem = async (event: FormEvent) => {
    event.preventDefault();

    const newItem: NewItem = {
      done: false,
      name: newItemName,
    };

    await addDoc(collection(firestore, 'items'), {
      name: newItem.name,
      state: newItem.done,
    });
  };

  const list: ReactElement[] = items.map((i) => (
    <SuperListItem
      key={i.id}
      id={i.id}
      done={i.done}
      name={i.name}
      onItemClick={() => onClickItem(i)}
      onDeleteIconClick={() => {}}
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
      <List>{list}</List>
    </>
  );
};

export default ItemsList;
