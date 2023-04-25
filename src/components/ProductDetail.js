import styles from "./Product.module.css";

function ProductDetail({ title }) {
  return (
    <div className={styles.ProductDetail}>
      <h1>{title}</h1>

    </div>
  )
}

export default ProductDetail;
