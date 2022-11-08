import { List } from '@mui/material';
import {
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
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import NewItemForm from './NewItemForm';

const ItemsList = (): ReactElement => {
  const [items, setItems] = useState<Item[]>([]);

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

  const onDeleteItem = async (item: Item) => {
    await deleteDoc(
      doc(firestore, 'items', item.id)
    );
  };

  const onAddItem = async (newItemName: string) => {
    const newItem: NewItem = {
      done: false,
      name: newItemName,
    };

    await addDoc(collection(firestore, 'items'), newItem);
  };

  const list: ReactElement[] = items.map((item) => (
    <SuperListItem
      key={item.id}
      id={item.id}
      done={item.done}
      name={item.name}
      onItemClick={() => onClickItem(item)}
      onDeleteIconClick={() => onDeleteItem(item)}
    />
  ));

  return (
    <>
      <NewItemForm
        onAddItem={onAddItem}
      />
      <hr />
      <List>{list}</List>
    </>
  );
};

export default ItemsList;
