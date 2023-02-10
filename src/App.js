import styles from "./App.module.css";
import ProductGrid from "./components/ProductGrid";
function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Price Per Unit Comparison Calculator</h1>
      <ProductGrid />
    </div>
  );
}

export default App;
