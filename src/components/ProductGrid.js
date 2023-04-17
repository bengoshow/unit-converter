import React from 'react'
import Product from "./Product";
import AddProductForm from './AddProduct'
import Modal from './Modal';
import useModal from '../hooks/useModal';
import styles from "./ProductGrid.module.css";
import calculateTotalVolume from '../utils/calculateTotalVolume';
import slugify from '../utils/slugify';

function ProductGrid({ collections, currentCollectionId, updateItemPrice }) {

  console.log('Render Product Grid');

  // collection base unit of measurement to calculate and compare pricing
  const baseUnit = collections[currentCollectionId].baseUnit;

  // visibility for Add Product form
  const [isShowingModal, toggleModal] = useModal();

  // store grid state
  const [allProducts, setAllProducts] = React.useState();

  React.useEffect(() => {
    // build product grid
    function buildProductsGrid() {
      console.log(currentCollectionId)
      return collections[currentCollectionId].items.map((product) => {
        const totalVolume = calculateTotalVolume(product, baseUnit);

        //generate unique product key
        const productKey = slugify(product.id, product.title);

        // build product with generated ref
        return (
          <Product
            key={productKey}
            {...{ product, baseUnit, totalVolume, currentCollectionId, updateItemPrice }} />
        )
      });
    }
    setAllProducts(() => buildProductsGrid());
  }, [baseUnit, collections, updateItemPrice, currentCollectionId])

  // save collection to localStorage
  function saveCollections() {
    updateItemPrice(currentCollectionId);
    localStorage.setItem('collections', JSON.stringify(collections))
  }

  return (
    <>
      <div className={styles.ProductGrid}>
        {allProducts}
      </div>
      <div>
        <button onClick={saveCollections}>Save Collection</button>
        <button onClick={toggleModal}>Add Product</button>
      </div>
      <Modal isVisible={isShowingModal} onCloseButtonClick={toggleModal}>
        <AddProductForm {...{ collections, currentCollectionId, calculateTotalVolume, baseUnit, allProducts, setAllProducts, toggleModal }} />
      </Modal>
    </>
  );
}

export default ProductGrid;
