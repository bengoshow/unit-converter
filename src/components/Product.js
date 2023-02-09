import styles from "./Product.module.css";

function Product({ product }) {
  return (
    <div className={styles.Product}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className={styles.smallText}>{product.units} {product.volume}{product.unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</p>
    </div>
  )
}

export default Product;