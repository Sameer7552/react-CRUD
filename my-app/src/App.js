import React, { useState } from "react";
import CreateItem from "./components/create";
import DisplayItems from "./components/read";
import SearchItems from "./components/search";

function App() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // Define allItems state

  const handleItemCreated = (itemName) => {
    setItems([...items, itemName]);
    setAllItems([...items, itemName]); // Update allItems whenever a new item is added
  };

  const handleSearch = (searchTerm) => {
    // If searchTerm is null or empty, show all items
    if (!searchTerm) {
      return setItems(allItems); // Restore all items
    }
    // Filter the items based on the search term
    const filteredItems = allItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update the state with the filtered items
    setItems(filteredItems);
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    setAllItems(newItems);
  };

  const handleUpdate = (updatedItem) => {
    const newItems = items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(newItems);
    setAllItems(newItems);
  };

  return (
    <>
      <h1 className="font-semibold text-gray-900 text-center text-4xl py-10 font-bold">
        Task Management Dashboard
      </h1>
      <div className="flex flex-wrap justify-around">
        <div className="p-4 w-full lg:w-4/12"><CreateItem onItemCreated={handleItemCreated} /></div>
        <div className="p-4 w-full lg:w-7/12">
          <div className=""><SearchItems onSearch={handleSearch} allItems={allItems} /></div>
          <div className="mt-8"><DisplayItems items={items} onDelete={handleDelete} onUpdate={handleUpdate} /></div>
        </div>
      </div>
    </>
  );
}

export default App;