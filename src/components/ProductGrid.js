import React from "react";
import styles from "./ProductGrid.module.css";
import Product from "./Product";
import AddProductForm from "./AddProduct";
import { PRESETS, UNITS_OF_MEASUREMENT } from "../data";
function ProductGrid() {

  if (!localStorage.getItem('collections')) {
    localStorage.setItem('collections', JSON.stringify(PRESETS))
  }

  const [productCollectionId, setProductCollectionId] = React.useState('');
  const [collections, setCollections] = React.useState(JSON.parse(localStorage.getItem('collections')));
  const [productGrid, setProductGrid] = React.useState('');
  const [baseUnit, setBaseUnit] = React.useState('');
  const collectionOptions = Object.keys(collections).map((key) => {
    return (
      <option key={key} value={key}>
        {collections[key].icon} {collections[key].label}
      </option>
    );
  });

  function calculateTotalVolume(product, baseUnit) {
    const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;
    const productUnits = product.units ?? 1;
    const convertedUnitsOfMeasurement = UNITS_OF_MEASUREMENT[baseUnit][unitsOfMeasurement] ?? 1;
    return convertedUnitsOfMeasurement * productUnits * product.volume;
  }
  function handleCollectionChange(event) {
    const nextProductCollectionId = event.target.value;
    const selectedItem = collections[nextProductCollectionId];
    setBaseUnit(selectedItem.baseUnit);
    const sortedByVolume = selectedItem.items.sort((a, b) => {
      return calculateTotalVolume(a, selectedItem.baseUnit) - calculateTotalVolume(b, selectedItem.baseUnit);
    });
    setProductCollectionId(nextProductCollectionId);
    setProductGrid(() => (sortedByVolume.map((item) => {
      return (
        <Product key={item.id} product={item} baseUnit={selectedItem.baseUnit} totalVolume={calculateTotalVolume(item, selectedItem.baseUnit)} />
      )
    })))

  }
  return (
    <>
      <form>
        <select value={productCollectionId} onChange={handleCollectionChange}>
          <option>--Choose a Collection--</option>
          {collectionOptions}
        </select>
      </form>
      <div className={styles.ProductGrid}>
        {productGrid}
      </div>
      {productGrid ? <AddProductForm productCollectionId={productCollectionId} productGrid={productGrid} setProductGrid={setProductGrid} baseUnit={baseUnit} calculateTotalVolume={calculateTotalVolume} collections={collections} setCollections={setCollections} /> : ''}
    </>
  )
}

export default ProductGrid;