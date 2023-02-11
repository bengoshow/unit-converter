import React from "react";
import styles from "./ProductGrid.module.css";
import Product from "./Product";
import { PRESETS } from "../data";
function ProductGrid() {
  const [productPreset, setProductPreset] = React.useState('soup');
  const presetOptions = PRESETS.map(
    ({ id, label }) => {
      return (
        <option key={id} value={id}>
          {label}
        </option>
      );
    }
  );
  console.log(PRESETS);
  function handlePresetChange(event) {
    setProductPreset(event.target.value)

    const sortedByVolume = productPreset.items.sort((a, b) => a.volume - b.volume);
    // {sortedByVolume.map((item) => {
    //   return (
    //     <Product key={item.id} product={item} />
    //   )
    // })}

  }
  return (
    <form>
      <select value={productPreset} onChange={handlePresetChange}>
        {presetOptions}
      </select>
      <div className={styles.ProductGrid}>
        <Product key="new" product={{ id: 'new', title: "Add Your Own", icon: 'plus' }} />
      </div>
    </form>
  )
}

export default ProductGrid;