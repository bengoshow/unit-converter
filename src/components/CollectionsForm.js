import React from "react";
import { CollectionsContext } from "./CollectionsProvider";
import { CurrentCollectionContext } from "./CurrentCollectionProvider";
import ProductGrid from './ProductGrid';
import styles from "../App.module.css";


function CollectionsForm({ children }) {

  const { collections } = React.useContext(CollectionsContext);
  const { currentCollectionId, setCurrentCollectionId } = React.useContext(CurrentCollectionContext);

  // build dropdown options from available collections
  const collectionOptions = Object.keys(collections).map((key) => {
    return (
      <option key={key} value={key}>
        {collections[key].icon} Calculate cost per {collections[key].baseUnit} of {key}
      </option>
    );
  });

  // handle collection selector
  function handleCollectionChange(event) {
    setCurrentCollectionId(event.target.value);
  }

  return (
    <>
      {currentCollectionId && <h2 className={styles.subheader}>{collections[currentCollectionId].label}</h2>}
      <form>
        <select className={styles.collectionSelector} value={currentCollectionId} onChange={handleCollectionChange}>
          <option value=''>--Choose a Collection--</option>
          {collectionOptions}
        </select>
      </form>
      {currentCollectionId && <ProductGrid />}
    </>
  )
}

export default CollectionsForm;
