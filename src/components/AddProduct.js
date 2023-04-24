import React from 'react';
import styles from "./AddProduct.module.css";
import Product from "./Product";
import slugify from '../utils/slugify';
import { UNITS_OF_MEASUREMENT } from "../data";

function AddProductForm({ calculateTotalVolume, allProducts, baseUnit, setAllProducts, toggleIsModalOpen }) {

  function handleSubmit(event) {
    event.preventDefault();
    const newProductTitle = event.target.productTitle.value;
    const newProductUnits = event.target.productItemsPerProduct.value;
    const newProductUnitsOfMeasurement = event.target.productUnitsOfMeasurement.value;
    const newProductId = slugify(newProductUnits, newProductUnitsOfMeasurement, newProductTitle);
    const nextProduct = {
      id: newProductId,
      title: event.target.productTitle.value,
      units: event.target.productItemsPerProduct.value,
      volume: event.target.productVolumePerItem.value,
      unitsOfMeasurement: event.target.productUnitsOfMeasurement.value,
      container: event.target.productContainer.value,
      description: event.target.productDescription.value,
      icon: event.target.productIcon.value,
      price: event.target.productPrice.value,
    }
    const nextProductGrid = [
      ...allProducts,
      <Product key={nextProduct.id} product={nextProduct} baseUnit={baseUnit} totalVolume={calculateTotalVolume(nextProduct, baseUnit)} />
    ];
    setAllProducts(nextProductGrid);
    toggleIsModalOpen();
  }

  return (
    <form className={styles.product_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add a New Product to the Collection</legend>
        <span>
          <label htmlFor="product-icon">Product Icon</label>
          <input type="text" id="product-icon" name="productIcon" defaultValue="hat-cowboy-side" />
        </span>
        <span>
          <label htmlFor="product-title">Product Title</label>
          <input type="text" id="product-title" name="productTitle" defaultValue="Hat" />
        </span>
        <span>
          <label htmlFor="product-description">Product Description</label>
          <input type="text" id="product-description" name="productDescription" defaultValue="A 10-Gallon Hat" />
        </span>
        <span>
          <label htmlFor="product-itemsPerProduct">Items per Product</label>
          <input type="text" id="product-itemsPerProduct" name="productItemsPerProduct" defaultValue="1" />
        </span>
        <span>
          <label htmlFor="product-volumePerItem">Volume per Item</label>
          <input type="text" id="product-volumePerItem" name="productVolumePerItem" defaultValue="10" />
        </span>
        <span>
          <label htmlFor="product-unitsOfMeasurement">Units of Measurement</label>
          <select id="product-unitsOfMeasurement" name="productUnitsOfMeasurement" defaultValue="gallon">
            <option value={baseUnit}>{baseUnit}</option>
            {Object.keys(UNITS_OF_MEASUREMENT[baseUnit]).map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </span>
        <span>
          <label htmlFor="product-container">Product Container</label>
          <input type="text" id="product-container" name="productContainer" defaultValue="hat" />
        </span>
        <span>
          <label htmlFor="product-price">Product Price</label>
          <input type="text" id="product-price" name="productPrice" defaultValue="149.99" />
        </span>
        <button type='submit'>Add Product to Collection</button>
      </fieldset>
    </form >
  )
}

export default AddProductForm;
