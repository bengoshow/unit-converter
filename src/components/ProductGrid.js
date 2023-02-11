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
          {key}:{icon} {label}
        </option>
      );
    }
  );
  console.log(PRESETS);
  function handlePresetChange(event) {
    const nextProductPreset = event.target.value;
    setProductPreset(nextProductPreset);
    console.log(nextProductPreset);
    const sortedByVolume = PRESETS[nextProductPreset].items.sort((a, b) => {
      a = a.units ? a.volume * a.units : a.volume;
      b = b.units ? b.volume * b.units : b.volume;
      return a - b;
    });
    setProductGrid(() => (sortedByVolume.map((item) => {
      return (
        <Product key={item.id} product={item} />
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
        <Product key="new" product={{ id: 'new', title: "Add Your Own", icon: 'plus' }} />
      </div>
    </form>
  )
}

export default ProductGrid;