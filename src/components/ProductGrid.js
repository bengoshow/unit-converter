import React from "react";
import styles from "./ProductGrid.module.css";
import Product from "./Product";
import { PRESETS } from "../data";
function ProductGrid() {
  const [productPreset, setProductPreset] = React.useState('');
  const [productGrid, setProductGrid] = React.useState('');
  const presetOptions = PRESETS.map(
    ({ id, label, icon }, key) => {
      return (
        <option key={id} value={key}>
          {icon} {label}
        </option>
      );
    }
  );
  function handlePresetChange(event) {
    const nextProductPreset = event.target.value;
    setProductPreset(nextProductPreset);
    const selectedItem = PRESETS[nextProductPreset];
    const baseUnit = selectedItem.baseUnit;
    const sortedByVolume = selectedItem.items.sort((a, b) => {
      a = a.units ? a.volume * a.units : a.volume;
      b = b.units ? b.volume * b.units : b.volume;
      return a - b;
    });
    setProductGrid(() => (sortedByVolume.map((item) => {
      return (
        <Product key={item.id} product={item} baseUnit={baseUnit} />
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