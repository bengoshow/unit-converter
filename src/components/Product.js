import styles from "./Product.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function Product({ product }) {
  const icon = product.icon ?? 'hippo';
  return (
    <div className={styles.product}>
      <FontAwesomeIcon icon={`fa-solid fa-${icon}`} size='2x' />
      <h2 className={styles.title}>{product.title}</h2>
      <p>{product.description}
        <span className={styles.smallText}>{product.units} {product.volume}{product.unitsOfMeasurement} {product.container}{product.units > 1 && 's'}</span>
      </p>
      <label className={styles.priceLabel} htmlFor="prod-price">Total Price: $
        <input id="prod-price" type="text"></input>
      </label>
    </div >
  )
}

export default Product;