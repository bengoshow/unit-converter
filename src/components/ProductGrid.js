import styles from "./ProductGrid.module.css";
import Product from "./Product";

const products = [
  {
    id: 'sixpack',
    title: 'Six-Pack',
    units: 6,
    volume: 12,
    unitsOfMeasurement: 'oz',
    container: 'bottle',
    description: 'A six-pack of bottles'
  }, {
    id: 'tallboys',
    title: 'Tallboys',
    units: 4,
    volume: 16,
    unitsOfMeasurement: 'oz',
    container: 'can',
    description: 'A four-pack of cans'
  }, {
    id: 'growler',
    title: 'Growler',
    units: 1,
    volume: 64,
    unitsOfMeasurement: 'oz',
    container: 'growler',
    description: 'A growler'
  }, {
    id: 'forty',
    title: '40',
    units: 1,
    volume: 40,
    unitsOfMeasurement: 'oz',
    container: 'can',
    description: 'A "40"'
  }, {
    id: 'gallon',
    title: 'Gallon',
    units: 1,
    volume: 128,
    unitsOfMeasurement: 'oz',
    container: 'jug',
    description: 'A gallon jug'
  },
]

function ProductGrid() {
  const sortedByVolume = products.sort((a, b) => a.volume - b.volume);
  return (
    <div className={styles.ProductGrid}>
      {sortedByVolume.map((item) => {
        return (
          <Product key={item.id} product={item} />
        )
      })}
      <Product key="new" product={{ id: 'new', title: "Add Your Own" }} />
    </div>
  )
}

export default ProductGrid;