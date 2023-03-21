import styles from "./App.module.css";
import ProductGrid from "./components/ProductGrid";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Price Per Unit Comparison Calculator</h1>
      <ProductGrid />
    </div>
  );
}

export default App;
