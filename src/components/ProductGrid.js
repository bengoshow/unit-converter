import Product from "./Product";
import styles from "./ProductGrid.module.css";
function ProductGrid({ currentCollection, calculateTotalVolume }) {
  const baseUnit = currentCollection.baseUnit;
  const allProducts = currentCollection.items.map((product) => {
    const totalVolume = calculateTotalVolume(product, baseUnit);
    const productKey = `${product.id}-${Math.random()}`;
    return <Product key={productKey} {...{ product, baseUnit, totalVolume }} />
  });
  return (
    <div className={styles.ProductGrid}>
      {allProducts}
    </div>
  );
}

export default ProductGrid;