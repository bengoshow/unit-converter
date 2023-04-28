import React from "react";
import { UNITS_OF_MEASUREMENT, PRESETS } from "../data";
import { CollectionsContext } from "./CollectionsProvider";
import { CurrentCollectionContext } from "./CurrentCollectionProvider";
import ProductGrid from './ProductGrid';
import styles from "../App.module.css";
import slugify from "../utils/slugify";
import sortCollections from "../utils/sortCollections";

function CollectionsForm({ children }) {

  const { collections, setCollections } = React.useContext(CollectionsContext);
  const { currentCollectionId, setCurrentCollectionId } = React.useContext(CurrentCollectionContext);

  // build dropdown options from available collections
  const collectionOptions = collections && Object.keys(collections).map((key) => {
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

  function handleSubmit(event) {
    event.preventDefault();
    const newCollectionTitle = event.target.collectionTitle.value;
    const newCollectionId = slugify(newCollectionTitle);
    const nextCollection = {
      label: event.target.collectionTitle.value,
      baseUnit: event.target.collectionUnitsOfMeasurement.value,
      icon: event.target.collectionIcon.value,
      items: []
    }
    const nextCollections = { ...collections, [newCollectionId]: nextCollection }
    setCollections(nextCollections)
    setCurrentCollectionId(newCollectionId)
  }

  function resetCollections() {
    setCollections(sortCollections(PRESETS))
  }

  function clearCollections() {
    setCollections({})
    setCurrentCollectionId('')
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
      {currentCollectionId ? <ProductGrid /> :
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
      }
      <button onClick={resetCollections}>Reset All Collections</button>
      <button onClick={clearCollections}>Clear All Collections</button>
    </>
  )
}

export default CollectionsForm;
