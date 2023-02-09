import styles from "./Product.module.css";

function Product({ product }) {
  return (
    <div className={styles.product}>
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.description}
        <span className={styles.smallText}>{product.units} {product.volume}{product.unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</span>
      </p>
      <label className={styles.priceLabel} for="prod-price">Total Price: $
        <input id="prod-price" type="text"></input>
      </label>
    </div>
  )
}

export default Product;