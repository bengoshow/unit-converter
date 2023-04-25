import React from "react";
import { PRESETS } from "../data";
import styles from "../App.module.css";
import useLocalStorageState from '../hooks/useLocalStorageState'
import sortCollections from '../utils/sortCollections';
import ProductGrid from './ProductGrid';

export const CollectionsContext = React.createContext();

function CollectionsProvider() {

  // get localStorage collections data if set, grab PRESETS otherwise
  const [collections, setCollections] = useLocalStorageState('collections', sortCollections(PRESETS));

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
      if (!price || (item.id === itemId && item.price === price)) {
        return item;
      }
      return item.id === itemId ? { ...item, price: parseFloat(price) } : item;
    });
    const nextCollection = { ...collections[collectionId], items: nextItems }
    const nextCollections = { ...collections, [collectionId]: nextCollection }
    setCollections(sortCollections(nextCollections));
  }

  function updateCollection(collectionId, item) {
    const nextItems = collections[collectionId].items;
    nextItems.push(item);
    console.log(nextItems)
    const nextCollection = { ...collections[collectionId], items: nextItems }
    const nextCollections = { ...collections, [collectionId]: nextCollection }
    setCollections(sortCollections(nextCollections));
  }

  return (
    <CollectionsContext.Provider value={{ collections, setCollections, currentCollectionId, setCurrentCollectionId, updateItemPrice, updateCollection }}>
      {currentCollectionId && <h2 className={styles.subheader}>{collections[currentCollectionId].label}</h2>}
      <form>
        <select className={styles.collectionSelector} value={currentCollectionId} onChange={handleCollectionChange}>
          <option value=''>--Choose a Collection--</option>
          {collectionOptions}
        </select>
      </form>
      {currentCollectionId && <ProductGrid />}
    </CollectionsContext.Provider>
  )
}

export default CollectionsProvider;