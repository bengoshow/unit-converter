import React from 'react';
import { CollectionsContext } from './CollectionsProvider';
import slugify from '../utils/slugify';
import sortCollections from '../utils/sortCollections';
import { PRESETS } from '../data';
import useToggle from '../hooks/useToggle';

export const CurrentCollectionContext = React.createContext();

function CurrentCollectionProvider({ children }) {
  // the active collection ID ('beer','wine','soup')
  const [currentCollectionId, setCurrentCollectionId] = React.useState('');
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);
  const { collections, setCollections } = React.useContext(CollectionsContext);

  // handle collection selector
  function handleCollectionChange(event) {
    setCurrentCollectionId(event.target.value);
  }

  function addCollection(event) {
    event.preventDefault();
    const newCollectionTitle = event.target.collectionTitle.value;
    const newCollectionId = slugify(newCollectionTitle);
    const nextCollection = {
      label: event.target.collectionTitle.value,
      baseUnit: event.target.collectionUnitsOfMeasurement.value,
      icon: event.target.collectionIcon.value,
      items: [],
    };
    const nextCollections = {
      ...collections,
      [newCollectionId]: nextCollection,
    };
    setCollections(nextCollections);
    setCurrentCollectionId(newCollectionId);
    toggleIsModalOpen();
  }

  function resetCollections() {
    setCurrentCollectionId('');
    setCollections(sortCollections(PRESETS));
  }

  function clearCollections() {
    setCollections({});
    setCurrentCollectionId('');
  }

  return (
    <CurrentCollectionContext.Provider
      value={{
        currentCollectionId,
        isModalOpen,
        toggleIsModalOpen,
        handleCollectionChange,
        addCollection,
        resetCollections,
        clearCollections,
      }}
    >
      {children}
    </CurrentCollectionContext.Provider>
  );
}

export default CurrentCollectionProvider;
