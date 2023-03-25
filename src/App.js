import React from 'react'
import styles from "./App.module.css";
import ProductGrid from './components/ProductGrid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { PRESETS, UNITS_OF_MEASUREMENT } from "./data";

library.add(fas)

function App() {
  // get local storage collections if it exists, set it if it doesn't
  if (!localStorage.getItem('collections')) {
    localStorage.setItem('collections', JSON.stringify(PRESETS))
  }
  const collections = JSON.parse(localStorage.getItem('collections'));
  const [currentCollection, setCurrentCollection] = React.useState('');

  // calculate total volume per product with common base unit of measurement
  function calculateTotalVolume(product, baseUnit) {
    const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;
    const productUnits = product.units ?? 1;
    const convertedUnitsOfMeasurement = UNITS_OF_MEASUREMENT[baseUnit][unitsOfMeasurement] ?? 1;
    return convertedUnitsOfMeasurement * productUnits * product.volume;
  }

  // sort all collections and pass all to product grid
  function sortedByVolume(collection) {
    const sortedItems = collection.items.sort((a, b) => {
      return calculateTotalVolume(a, collection.baseUnit) - calculateTotalVolume(b, collection.baseUnit);
    });
    return sortedItems;
  }

  // sort collection items by total volume
  const sortedCollections = collections;
  Object.keys(sortedCollections).forEach((collection) => {
    sortedCollections[collection].items = sortedByVolume(sortedCollections[collection]);
  });

  // available collections to select from
  const collectionOptions = Object.keys(collections).map((key) => {
    return (
      <option key={key} value={key}>
        {collections[key].icon} {collections[key].label}
      </option>
    );
  });

  // handle collection selector
  function handleCollectionChange(event) {
    const selectedCollection = sortedCollections[event.target.value];
    setCurrentCollection(selectedCollection);
  }

  // function updateItemPrice() {
  //   // update item price
  // }

  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Price Per Unit Comparison Calculator</h1>
      <form>
        <select value="" onChange={handleCollectionChange}>
          <option>--Choose a Collection--</option>
          {collectionOptions}
        </select>
      </form>
      {currentCollection ? <ProductGrid {...{ currentCollection, calculateTotalVolume }} /> : ''}
      {/* {productGrid ? <AddProductForm productCollectionId={productCollectionId} productGrid={productGrid} setProductGrid={setProductGrid} baseUnit={baseUnit} calculateTotalVolume={calculateTotalVolume} collections={collections} setCollections={setCollections} /> : ''} */}
    </div>
  );
}

export default App;
