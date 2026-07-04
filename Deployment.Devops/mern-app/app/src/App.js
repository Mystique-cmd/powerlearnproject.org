import React, { useEffect, useState } from 'react';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setName('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🚀 MERN Demo App</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="New item" />
      <button onClick={addItem}>Add</button>
      <ItemList items={items} />
    </div>
  );
}

export default App;
