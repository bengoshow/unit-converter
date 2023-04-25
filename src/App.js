import React from 'react'
import styles from "./App.module.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import CollectionsProvider from './components/CollectionsProvider';

library.add(fas)

function App() {

  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Cost Comparison Calculator</h1>
      <CollectionsProvider />
    </div>
  );
}

export default App;
