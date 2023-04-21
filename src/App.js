import React from 'react'
import styles from "./App.module.css";
import ProductGrid from './components/ProductGrid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { PRESETS } from "./data";
import useLocalStorageState from './hooks/useLocalStorageState';
import sortCollections from './utils/sortCollections';

library.add(fas)

function App() {
  // get localStorage collections data if set, grab PRESETS otherwise
  const [collections, setCollections] = useLocalStorageState('collections', sortCollections(PRESETS))

  // the active collection ID ('beer','wine','soup')
  const [currentCollectionId, setCurrentCollectionId] = React.useState('');

  // build dropdown options from available collections
  const collectionOptions = Object.keys(collections).map((key) => {
    return (
      <option key={key} value={key}>
        {collections[key].icon} Calculate cost per {collections[key].baseUnit} of {key}
      </option>
    );
  });

  // handle collection selector
  function handleCollectionChange(event) {
    setCurrentCollectionId(event.target.value);
  }

  // capture current collection prices and update collections in state
  function updateItemPrice(collectionId, itemId, price) {
    const nextItems = collections[collectionId].items.map((item) => {
      if (!price) {
        return item;
      }
      return item.id === itemId ? { ...item, price: parseFloat(price) } : item;
    });
    const nextCollection = { ...collections[collectionId], items: nextItems }
    const nextCollections = { ...collections, [collectionId]: nextCollection }
    setCollections(sortCollections(nextCollections));
  }


  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Cost Comparison Calculator</h1>
      {currentCollectionId && <h2 className={styles.subheader}>{collections[currentCollectionId].label}</h2>}
      <form>
        <select className={styles.collectionSelector} value={currentCollectionId} onChange={handleCollectionChange}>
          <option value=''>--Choose a Collection--</option>
          {collectionOptions}
        </select>
      </form>
      {currentCollectionId && <ProductGrid {...{ collections, currentCollectionId, updateItemPrice }} />}
    </div>
  );
}

export default App;
