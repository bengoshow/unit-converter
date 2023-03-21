import React from "react";
import styles from "./ProductGrid.module.css";
import Product from "./Product";
import AddProductForm from "./AddProduct";
import { PRESETS, UNITS_OF_MEASUREMENT } from "../data";
function ProductGrid() {
  const [productPreset, setProductPreset] = React.useState('');
  const [productGrid, setProductGrid] = React.useState('');
  const [baseUnit, setBaseUnit] = React.useState('');
  const presetOptions = Object.keys(PRESETS).map((key) => {
    return (
      <option key={key} value={key}>
        {PRESETS[key].icon} {PRESETS[key].label}
      </option>
    );
  });

  function calculateTotalVolume(product, baseUnit) {
    const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;
    const productUnits = product.units ?? 1;
    const convertedUnitsOfMeasurement = UNITS_OF_MEASUREMENT[baseUnit][unitsOfMeasurement] ?? 1;
    return convertedUnitsOfMeasurement * productUnits * product.volume;
  }
  function handlePresetChange(event) {
    const nextProductPreset = event.target.value;
    const selectedItem = PRESETS[nextProductPreset];
    setBaseUnit(selectedItem.baseUnit);
    const sortedByVolume = selectedItem.items.sort((a, b) => {
      return calculateTotalVolume(a, selectedItem.baseUnit) - calculateTotalVolume(b, selectedItem.baseUnit);
    });
    setProductPreset(nextProductPreset);
    setProductGrid(() => (sortedByVolume.map((item) => {
      return (
        <Product key={item.id} product={item} baseUnit={selectedItem.baseUnit} totalVolume={calculateTotalVolume(item, selectedItem.baseUnit)} />
      )
    })))

  }
  return (
    <>
      <form>
        <select value={productPreset} onChange={handlePresetChange}>
          <option>--Choose a Collection--</option>
          {presetOptions}
        </select>
      </form>
      <div className={styles.ProductGrid}>
        {productGrid}
      </div>
      {productGrid ? <AddProductForm productGrid={productGrid} setProductGrid={setProductGrid} baseUnit={baseUnit} calculateTotalVolume={calculateTotalVolume} /> : ''}
    </>
  )
}

export default ProductGrid;