import React from "react";
import styles from "./ProductGrid.module.css";
import Product from "./Product";
import { PRESETS } from "../data";
function ProductGrid() {
  const [productPreset, setProductPreset] = React.useState('beer');
  console.log(PRESETS[0]['label']);
  // const presetOptions = PRESETS.map(
  //   ([key, value]) => {
  //     return (
  //       <option key={key} value={key}>
  //         {value.label}
  //       </option>
  //     );
  //   }
  // );

  // const sortedByVolume = PRESETS[productPreset].sort((a, b) => a.volume - b.volume);
  return (
    <form>
      <select value={productPreset} onChange={(event) => {
        setProductPreset(event.target.value)
      }}>
        {/* {presetOptions} */}
      </select>
      <div className={styles.ProductGrid}>
        {/* {sortedByVolume.map((item) => {
          return (
            <Product key={item.id} product={item} />
          )
        })} */}
        <Product key="new" product={{ id: 'new', title: "Add Your Own", icon: 'plus' }} />
      </div>
    </form>
  )
}

export default ProductGrid;