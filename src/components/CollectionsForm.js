import React from "react";
import { createPortal } from "react-dom";
import { UNITS_OF_MEASUREMENT } from "../data";
import { CollectionsContext } from "./CollectionsProvider";
import { CurrentCollectionContext } from "./CurrentCollectionProvider";
import ProductGrid from './ProductGrid';
import Modal from "./Modal";
import styles from "../App.module.css";

function CollectionsForm({ children }) {

  const { collections } = React.useContext(CollectionsContext);
  const { currentCollectionId, isModalOpen, toggleIsModalOpen, handleCollectionChange, addCollection, resetCollections, clearCollections } = React.useContext(CurrentCollectionContext);

  // build dropdown options from available collections
  const collectionOptions = collections && Object.keys(collections).map((key) => {
    return (
      <option key={key} value={key}>
        {collections[key].icon} Calculate cost per {collections[key].baseUnit} of {key}
      </option>
    );
  });

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
      {isModalOpen &&
        createPortal(
          <Modal
            handleDismiss={() => toggleIsModalOpen(false)}
          >
            <AddCollectionForm handleSubmit={addCollection} />
          </Modal>, document.body
        )}
      <button onClick={toggleIsModalOpen}>{isModalOpen ? 'Adding' : 'Add'} New Collection</button>
      <button onClick={resetCollections}>Reset All Collections</button>
      <button onClick={clearCollections}>Clear All Collections</button>
    </>
  )
}

function AddCollectionForm({ handleSubmit }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add a New Collection</legend>
        <span>
          <label htmlFor="collection-icon">Collection Icon</label>
          <input type="text" id="collection-icon" name="collectionIcon" defaultValue="🎩" />
        </span>
        <span>
          <label htmlFor="collection-title">Collection Title</label>
          <input type="text" id="collection-title" name="collectionTitle" defaultValue="Hats" />
        </span>
        <span>
          <label htmlFor="collection-unitsOfMeasurement">Base Unit of Measurement</label>
          <select id="collection-unitsOfMeasurement" name="collectionUnitsOfMeasurement" defaultValue="gallon">
            {Object.keys(UNITS_OF_MEASUREMENT).map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </span>
        <button type='submit'>Create Collection</button>
      </fieldset>
    </form >
  )
}
export default CollectionsForm;
