import React from 'react';
import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CollectionsContext } from './CollectionsProvider';

function Product({ product, baseUnit, totalVolume }) {

  console.log(`Render ${product.id}`)

  const { currentCollectionId, updateItemPrice } = React.useContext(CollectionsContext)

  const icon = product.icon ?? 'box';

  // use collection base unit of measurement if not specified per item
  const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;

  // default to 1 unit unless otherwise specified
  const productUnits = product.units ?? 1;

  // track item price in state
  const [price, setPrice] = React.useState(product.price ?? '');

  // track price per unit in state
  const [pricePerUnit, setPricePerUnit] = React.useState(product.price ? calculatePricePerUnit(product.price) : '');

  // let React generate unique item id
  const id = React.useId();

  // calculate total price per common unit of measurement, format to 2 decimals for $, 1 decimal for ¢
  function calculatePricePerUnit(price) {
    const pricePerUnit = Math.round((price / totalVolume) * 1000) / 1000;
    const currencyFormat = pricePerUnit >= 1 ? `$${pricePerUnit.toFixed(2)}` : `${(pricePerUnit * 100).toFixed(1)}¢`
    return `${currencyFormat}/${baseUnit}`;
  }

  // update price in state, update price per unit in state
  function handlePriceChange(price) {
    setPrice(price);
    setPricePerUnit(calculatePricePerUnit(price));
  }

  return (
    <div className={styles.product}>
      <FontAwesomeIcon icon={`fa-solid fa-${icon}`} size='2x' />
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.description}
        <span className={styles.smallText}>{productUnits} {product.volume > 1 && product.volume}{unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</span><br />
        Total Volume in {baseUnit}: {totalVolume}
      </p>
      <label htmlFor={id} className={styles.priceLabel}>Price: $
        <input
          id={id}
          type="text"
          value={price}
          onChange={(event) => {
            handlePriceChange(event.target.value)
          }}
          onBlur={(event) => {
            updateItemPrice(currentCollectionId, product.id, event.target.value)
          }} />
      </label>
      <div className="price-per-unit">{pricePerUnit}</div>
    </div >
  )
}

export default Product;
