import React from 'react';
import styles from "./Product.module.css";
import { CollectionsContext } from './CollectionsProvider';
import { CurrentCollectionContext } from './CurrentCollectionProvider';
import useToggle from '../hooks/useToggle';
import Modal from './Modal';
import ProductDetail from './ProductDetail';
import { Emoji, EmojiStyle } from 'emoji-picker-react';

function Product({ product, baseUnit, totalVolume }) {

  console.log(`Render ${product.id}`)

  const { updateItemPrice } = React.useContext(CollectionsContext)
  const { currentCollectionId } = React.useContext(CurrentCollectionContext);
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const icon = product.icon ?? '';

  // use collection base unit of measurement if not specified per item
  const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;

  // default to 1 unit unless otherwise specified
  const productUnits = product.units ?? 1;

  // track item price in state
  const [price, setPrice] = React.useState(product.price ?? '');
  const pricePerUnit = calculatePricePerUnit(price)

  // let React generate unique item id
  const id = React.useId();

  // calculate total price per common unit of measurement, format to 2 decimals for $, 1 decimal for ¢
  function calculatePricePerUnit(price) {
    const pricePerUnit = Math.round((price / totalVolume) * 1000) / 1000;
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(pricePerUnit);

    const currencyFormat = pricePerUnit >= 1 ? formattedPrice : `${(pricePerUnit * 100).toFixed(1)}¢`
    return `${currencyFormat}/${baseUnit}`;
  }

  // update price in state, update price per unit in state
  function handlePriceChange(price) {
    setPrice(price);
  }

  return (
    <div className={styles.product}>
      <Emoji unified={icon.unified} size="40" emojiStyle={EmojiStyle.NATIVE} />
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.description}
        <span className={styles.smallText}>{productUnits} {product.volume !== 1 && product.volume}{unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</span><br />
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
      <div>
        <button onClick={toggleIsModalOpen}>Edit Product</button>
        {/* <button onClick={deleteProduct}>Delete Product</button> */}
      </div>
      {isModalOpen && (
        <Modal
          handleDismiss={() => toggleIsModalOpen(false)}
        >
          <ProductDetail {...{ toggleIsModalOpen, product, handlePriceChange }} />
        </Modal>
      )}

    </div >
  )
}

export default Product;
