import { useState, useEffect } from 'react';

import { getFbItems, addFbItem, updateFbItem, deleteFbItem } from "../lib/firebase";

function useFireStore() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const items = await getFbItems();
    setItems(items);
  };

  const addItem = async item => {
    const newItem = { text: item.text, done: item.done };
    await addFbItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async checked => {
    const newItem = { ...checked, done: !checked.done };
    await updateFbItem(newItem, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item.done = !checked.done;
      }
      return item;
    })
    setItems(newItems);
  }

  const deleteItems = () => {
    items.map(item => {
      deleteFbItem(item);
    })
    setItems([]);
  };

  return [items, addItem, updateItem, deleteItems];
}

export default useFireStore;