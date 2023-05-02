import React from 'react'
import styles from "./App.module.css";
import CollectionsProvider from './components/CollectionsProvider';
import CurrentCollectionProvider from './components/CurrentCollectionProvider';
import CollectionsForm from './components/CollectionsForm';

function App() {

  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Cost Comparison Calculator</h1>
      <CollectionsProvider>
        <CurrentCollectionProvider>
          <CollectionsForm />
        </CurrentCollectionProvider>
      </CollectionsProvider>
    </div>
  );
}

export default App;
