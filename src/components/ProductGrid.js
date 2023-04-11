import React from 'react'
import Product from "./Product";
import slugify from '../utils/slugify';
import styles from "./ProductGrid.module.css";

function ProductGrid({ collections, currentCollectionId, calculateTotalVolume, updateItemPrice }) {

  console.log('Render Product Grid');

  // collection base unit of measurement to calculate and compare pricing
  const baseUnit = collections[currentCollectionId].baseUnit;

  // build product grid
  const allProducts = collections[currentCollectionId].items.map((product) => {
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

  return (
    <div className={styles.ProductGrid}>
      {allProducts}
    </div>
  );
}

export default ProductGrid;