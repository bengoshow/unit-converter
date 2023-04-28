import React from "react";
import styles from "./Product.module.css";
import { UNITS_OF_MEASUREMENT } from "../data";
import { CollectionsContext } from './CollectionsProvider';
import { CurrentCollectionContext } from './CurrentCollectionProvider';

function ProductDetail({ product, toggleIsModalOpen, handlePriceChange }) {
  const { collections, updateCollection } = React.useContext(CollectionsContext);
  const { currentCollectionId } = React.useContext(CurrentCollectionContext);

  function handleSubmit(event) {
    event.preventDefault();
    const nextProduct = {
      id: product.id,
      title: event.target.productTitle.value,
      units: event.target.productItemsPerProduct.value,
      volume: event.target.productVolumePerItem.value,
      unitsOfMeasurement: event.target.productUnitsOfMeasurement.value,
      container: event.target.productContainer.value,
      description: event.target.productDescription.value,
      icon: event.target.productIcon.value,
      price: event.target.productPrice.value,
    }
    updateCollection(currentCollectionId, nextProduct);
    handlePriceChange(event.target.productPrice.value)
    toggleIsModalOpen();
  }

  // collection base unit of measurement to calculate and compare pricing
  const baseUnit = collections[currentCollectionId].baseUnit;
  return (
    <div className={styles.ProductDetail}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit {product.title}</legend>
          <span>
            <label htmlFor="product-icon">Product Icon</label>
            <input type="text" id="product-icon" name="productIcon" defaultValue={product.icon} />
          </span>
          <span>
            <label htmlFor="product-title">Product Title</label>
            <input type="text" id="product-title" name="productTitle" defaultValue={product.title} />
          </span>
          <span>
            <label htmlFor="product-description">Product Description</label>
            <input type="text" id="product-description" name="productDescription" defaultValue={product.description} />
          </span>
          <span>
            <label htmlFor="product-itemsPerProduct">Items per Product</label>
            <input type="text" id="product-itemsPerProduct" name="productItemsPerProduct" defaultValue={product.units} />
          </span>
          <span>
            <label htmlFor="product-volumePerItem">Volume per Item</label>
            <input type="text" id="product-volumePerItem" name="productVolumePerItem" defaultValue={product.volume} />
          </span>
          <span>
            <label htmlFor="product-unitsOfMeasurement">Units of Measurement</label>
            <select id="product-unitsOfMeasurement" name="productUnitsOfMeasurement" defaultValue={product.unitsOfMeasurement}>
              <option value={baseUnit}>{baseUnit}</option>
              {Object.keys(UNITS_OF_MEASUREMENT[baseUnit]).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </span>
          <span>
            <label htmlFor="product-container">Product Container</label>
            <input type="text" id="product-container" name="productContainer" defaultValue={product.container} />
          </span>
          <span>
            <label htmlFor="product-price">Product Price</label>
            <input type="text" id="product-price" name="productPrice" defaultValue={product.price} />
          </span>
          <button type='submit'>Update Product</button>
        </fieldset>
      </form >
    </div>
  )
}

export default ProductDetail;
