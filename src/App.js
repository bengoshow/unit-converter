import React from 'react'
import styles from "./App.module.css";
import ProductGrid from './components/ProductGrid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { PRESETS, UNITS_OF_MEASUREMENT } from "./data";

library.add(fas)

function App() {
  // get localStorage collections data if set, grab PRESETS otherwise
  const [collections, setCollections] = React.useState(() => sortCollections(JSON.parse(localStorage.getItem('collections')) || PRESETS));

  // the active collection ID ('beer','wine','soup')
  const [currentCollectionId, setCurrentCollectionId] = React.useState('');

  // calculate total volume per item with common base unit of measurement from collection
  function calculateTotalVolume(product, baseUnit) {
    const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;
    const productUnits = product.units ?? 1;
    const convertedUnitsOfMeasurement = UNITS_OF_MEASUREMENT[baseUnit][unitsOfMeasurement] ?? 1;
    return convertedUnitsOfMeasurement * productUnits * product.volume;
  }

  // sort collection items by total volume
  function sortCollectionItems(collection) {
    const sortedItems = collection.items.sort((a, b) => {
      return calculateTotalVolume(a, collection.baseUnit) - calculateTotalVolume(b, collection.baseUnit);
    });
    return sortedItems;
  }

  // map over and sort all collections
  function sortCollections(collectionsObject) {
    const sortedCollections = collectionsObject;
    Object.keys(collectionsObject).forEach((collection) => {
      sortedCollections[collection].items = sortCollectionItems(sortedCollections[collection]);
    });
    return sortedCollections;
  }

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
    setCollections(nextCollections);
  }


  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Cost Comparison Calculator</h1>
      <form>
        <select value={currentCollectionId} onChange={handleCollectionChange}>
          <option>--Choose a Collection--</option>
          {collectionOptions}
        </select>
      </form>
      {currentCollectionId ? <ProductGrid {...{ collections, currentCollectionId, calculateTotalVolume, updateItemPrice }} /> : ''}
      {/* {productGrid ? <AddProductForm productCollectionId={productCollectionId} productGrid={productGrid} setProductGrid={setProductGrid} baseUnit={baseUnit} calculateTotalVolume={calculateTotalVolume} collections={collections} setCollections={setCollections} /> : ''} */}
    </div>
  );
}

export default App;
