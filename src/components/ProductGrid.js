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
    description: 'The ol\' standby',
    icon: 'wine-bottle'
  }, {
    id: 'tallboys',
    title: 'Tallboys',
    units: 4,
    volume: 16,
    unitsOfMeasurement: 'oz',
    container: 'can',
    description: 'Packaged for hipsters',
    icon: 'glasses'
  }, {
    id: 'growler',
    title: 'Growler',
    units: 1,
    volume: 64,
    unitsOfMeasurement: 'oz',
    container: 'jug',
    description: 'A jug of beer',
    icon: 'jug-detergent'
  }, {
    id: 'forty',
    title: '40',
    units: 1,
    volume: 40,
    unitsOfMeasurement: 'oz',
    container: 'can',
    description: 'A "40"',
  }, {
    id: 'keg',
    title: 'Keg',
    units: 1,
    volume: 3968,
    unitsOfMeasurement: 'oz',
    container: 'keg',
    description: 'Toga! Toga!',
    icon: 'pizza-slice'
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
      <Product key="new" product={{ id: 'new', title: "Add Your Own", icon: 'plus' }} />
    </div>
  )
}

export default ProductGrid;