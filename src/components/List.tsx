import { ReactElement, useEffect, useState } from 'react';
import { Item } from './Item';
import SuperListItem from './SuperListItem/SuperListItem';

const ItemsList = (): ReactElement => {
  const [items, setItems] = useState<Item[]>([]);

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
    const itemIndex = updatedItems.findIndex(i => i.id === item.id);

    updatedItems[itemIndex] = {
      ...items[itemIndex],
      done: !item.done
    };

    setItems(updatedItems);
  };

  const list = items.map((i) => (
    <SuperListItem
      key={i.id}
      done={i.done}
      name={`Item ${i.id}`}
      onItemClick={() => onClickItem(i)}
    />
  ));

  return <>{list}</>;
};

export default ItemsList;
