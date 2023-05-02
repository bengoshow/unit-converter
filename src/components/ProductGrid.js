import React from 'react'
import Product from "./Product";
import AddProductForm from './AddProduct'
import Modal from './Modal';
import useToggle from '../hooks/useToggle';
import styles from "./ProductGrid.module.css";
import calculateTotalVolume from '../utils/calculateTotalVolume';
import slugify from '../utils/slugify';
import { CollectionsContext } from './CollectionsProvider';
import { CurrentCollectionContext } from './CurrentCollectionProvider';

function ProductGrid() {

  console.log('Render Product Grid');

  const { collections, updateItemPrice, setCollections } = React.useContext(CollectionsContext);
  const { currentCollectionId } = React.useContext(CurrentCollectionContext);

  // collection base unit of measurement to calculate and compare pricing
  const baseUnit = collections[currentCollectionId].baseUnit;

  // visibility for Add Product form
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  // save collection to localStorage
  function saveCollections() {
    updateItemPrice(currentCollectionId);
    setCollections(collections);
  }

  return (
    <>
      <div key={currentCollectionId} className={styles.ProductGrid}>
        {collections[currentCollectionId].items.map((product) => {
          const totalVolume = calculateTotalVolume(product, baseUnit);

          //generate unique product key
          const productKey = slugify(product.id, product.title);

          // build product with generated key
          return (
            <Product
              key={productKey}
              {...{ product, baseUnit, totalVolume, currentCollectionId, updateItemPrice }} />
          )
        })}
      </div>
      <div>
        <button onClick={toggleIsModalOpen}>Add Product</button>
        <button onClick={saveCollections}>Save Collection</button>
      </div>
      {isModalOpen && (
        <Modal
          handleDismiss={() => toggleIsModalOpen(false)}
        >
          <AddProductForm {...{ toggleIsModalOpen }} />
        </Modal>
      )}
    </>
  );
}

export default ProductGrid;
