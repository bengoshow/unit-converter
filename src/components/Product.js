import React from 'react';
import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Product({ product }) {
  const icon = product.icon ?? 'box';
  const [price, setPrice] = React.useState(product.price);
  const [pricePerUnit, setPricePerUnit] = React.useState('');

  function handlePriceChange(price) {
    setPrice(price);
    const totalVolume = product.units ? product.units * product.volume : product.volume;
    console.log(totalVolume);
    const nextPricePerUnit = Math.round((price / totalVolume) * 1000) / 1000;
    setPricePerUnit(`$${nextPricePerUnit}/${product.unitsOfMeasurement}`)
  }

  return (
    <div className={styles.product}>
      <FontAwesomeIcon icon={`fa-solid fa-${icon}`} size='2x' />
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.description}
        <span className={styles.smallText}>{product.units} {product.volume}{product.unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</span>
      </p>
      <label className={styles.priceLabel} htmlFor="prod-price">Total Price: $
        <input id="prod-price" type="text" value={price} onChange={(event) => {
          handlePriceChange(event.target.value)
        }} />
      </label>
      <div className="price-per-unit">{pricePerUnit}</div>
    </div >
  )
}

export default Product;