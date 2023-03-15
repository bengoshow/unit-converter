import React from 'react';
import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Product({ product, baseUnit, totalVolume }) {
  const icon = product.icon ?? 'box';
  const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;
  const productUnits = product.units ?? 1;
  const [price, setPrice] = React.useState(product.price ?? '');
  const [pricePerUnit, setPricePerUnit] = React.useState(product.price ? calculatePricePerUnit(product.price) : '');

  function calculatePricePerUnit(price) {
    const nextPricePerUnit = Math.round((price / totalVolume) * 1000) / 1000;
    return `$${nextPricePerUnit}/${baseUnit}`;
  }

  function handlePriceChange(price) {
    setPrice(price);
    setPricePerUnit(calculatePricePerUnit(price));
  }

  return (
    <div className={styles.product}>
      <FontAwesomeIcon icon={`fa-solid fa-${icon}`} size='2x' />
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.description}
        <span className={styles.smallText}>{productUnits} {product.volume}{unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</span><br />
        Total Volume in {baseUnit}: {totalVolume}
      </p>
      <label className={styles.priceLabel} htmlFor="prod-price">Price: $
        <input id="prod-price" type="text" value={price} onChange={(event) => {
          handlePriceChange(event.target.value)
        }} />
      </label>
      <div className="price-per-unit">{pricePerUnit}</div>
    </div >
  )
}

export default Product;