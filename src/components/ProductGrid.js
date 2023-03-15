import React from "react";
import styles from "./ProductGrid.module.css";
import Product from "./Product";
import { PRESETS, UNITS_OF_MEASUREMENT } from "../data";
function ProductGrid() {
  const [productPreset, setProductPreset] = React.useState('');
  const [productGrid, setProductGrid] = React.useState('');
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
    const baseUnit = selectedItem.baseUnit;
    const sortedByVolume = selectedItem.items.sort((a, b) => {
      return calculateTotalVolume(a, baseUnit) - calculateTotalVolume(b, baseUnit);
    });
    setProductPreset(nextProductPreset);
    setProductGrid(() => (sortedByVolume.map((item) => {
      return (
        <Product key={item.id} product={item} baseUnit={baseUnit} totalVolume={calculateTotalVolume(item, baseUnit)} />
      )
    })))

  }
  return (
    <form>
      <select value={productPreset} onChange={handlePresetChange}>
        <option>--Choose a Collection--</option>
        {presetOptions}
      </select>
      <div className={styles.ProductGrid}>
        {productGrid}
      </div>
    </form>
  )
}

export default ProductGrid;