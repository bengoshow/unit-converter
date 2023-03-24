import Product from "./Product";
import styles from "./ProductGrid.module.css";
function ProductGrid({ sortedCollections, calculateTotalVolume }) {
  return (
    Object.keys(sortedCollections).map((collection) => {
      const baseUnit = sortedCollections[collection].baseUnit;
      const allProducts = sortedCollections[collection].items.map((product) => {
        const totalVolume = calculateTotalVolume(product, baseUnit);
        return <Product key={product.id} {...{ product, baseUnit, totalVolume }} />
      });
      return (
        <div className={styles.ProductGrid} key={collection}>
          {allProducts}
        </div>
      );
    })
  )
}

export default ProductGrid;