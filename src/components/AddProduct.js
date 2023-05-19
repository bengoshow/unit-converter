import React from 'react';
import styles from './AddProduct.module.css';
import slugify from '../utils/slugify';
import { UNITS_OF_MEASUREMENT, SAMPLE_PRODUCT } from '../data';
import { CollectionsContext } from './CollectionsProvider';
import { CurrentCollectionContext } from './CurrentCollectionProvider';
import useLocalStorageState from '../hooks/useLocalStorageState';

function AddProductForm({ toggleIsModalOpen }) {
  const { collections, updateCollection } =
    React.useContext(CollectionsContext);
  const { currentCollectionId } = React.useContext(CurrentCollectionContext);
  const [sampleProduct] = useLocalStorageState('sample', SAMPLE_PRODUCT);

  // collection base unit of measurement to calculate and compare pricing
  const baseUnit = collections[currentCollectionId].baseUnit;

  function handleSubmit(event) {
    event.preventDefault();
    const newProductTitle = event.target.productTitle.value;
    const newProductUnits = event.target.productItemsPerProduct.value;
    const newProductVolume = event.target.productVolumePerItem.value;
    const newProductUnitsOfMeasurement =
      event.target.productUnitsOfMeasurement.value;
    const newProductId = slugify(
      newProductUnits,
      newProductVolume,
      newProductUnitsOfMeasurement,
      newProductTitle
    );
    const nextProduct = {
      id: newProductId,
      title: event.target.productTitle.value,
      units: parseInt(event.target.productItemsPerProduct.value),
      volume: parseFloat(event.target.productVolumePerItem.value),
      unitsOfMeasurement: event.target.productUnitsOfMeasurement.value,
      container: event.target.productContainer.value,
      description: event.target.productDescription.value,
      icon: event.target.productIcon.value,
      price: parseFloat(event.target.productPrice.value),
    };
    updateCollection(currentCollectionId, nextProduct);
    window.localStorage.setItem('sample', JSON.stringify({}));
    toggleIsModalOpen();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add a New Product to the Collection</legend>
        <span>
          <label htmlFor="product-icon">Product Icon</label>
          <input
            type="text"
            id="product-icon"
            name="productIcon"
            defaultValue={sampleProduct.icon}
          />
        </span>
        <span>
          <label htmlFor="product-title">Product Title</label>
          <input
            type="text"
            id="product-title"
            name="productTitle"
            defaultValue={sampleProduct.title}
          />
        </span>
        <span>
          <label htmlFor="product-description">Product Description</label>
          <input
            type="text"
            id="product-description"
            name="productDescription"
            defaultValue={sampleProduct.description}
          />
        </span>
        <span>
          <label htmlFor="product-itemsPerProduct">Items per Product</label>
          <input
            type="text"
            id="product-itemsPerProduct"
            name="productItemsPerProduct"
            defaultValue={sampleProduct.units}
          />
        </span>
        <span>
          <label htmlFor="product-volumePerItem">Volume per Item</label>
          <input
            type="text"
            id="product-volumePerItem"
            name="productVolumePerItem"
            defaultValue={sampleProduct.volume}
          />
        </span>
        <span>
          <label htmlFor="product-unitsOfMeasurement">
            Units of Measurement
          </label>
          <select
            id="product-unitsOfMeasurement"
            name="productUnitsOfMeasurement"
            defaultValue={sampleProduct.unitsOfMeasurement}
          >
            <option value={baseUnit}>{baseUnit}</option>
            {Object.keys(UNITS_OF_MEASUREMENT[baseUnit]).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </span>
        <span>
          <label htmlFor="product-container">Product Container</label>
          <input
            type="text"
            id="product-container"
            name="productContainer"
            defaultValue={sampleProduct.container}
          />
        </span>
        <span>
          <label htmlFor="product-price">Product Price</label>
          <input
            type="text"
            id="product-price"
            name="productPrice"
            defaultValue={sampleProduct.price}
          />
        </span>
        <button type="submit">Add Product to Collection</button>
      </fieldset>
    </form>
  );
}

export default AddProductForm;
