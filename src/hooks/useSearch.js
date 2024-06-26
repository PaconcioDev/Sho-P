import { useEffect, useState } from 'react';

function useSearch ({ items, inputValue }) {
  const [filteredItems, setFilteredItems] = useState([]);

  const filter = (items, searchValue) => {
    return items.filter(item => item.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim()));
  };

  useEffect(() => {
    if (inputValue) {
      setFilteredItems(filter(items, inputValue));
    }
  }, [items, inputValue]);

  const itemsToRender = inputValue ? filteredItems : items;

  return itemsToRender;
}

export { useSearch };
