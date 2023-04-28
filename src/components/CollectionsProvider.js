import React from "react";
import { PRESETS } from "../data";
import useLocalStorageState from '../hooks/useLocalStorageState'
import sortCollections from '../utils/sortCollections';

export const CollectionsContext = React.createContext();

function CollectionsProvider({ children }) {

  // get localStorage collections data if set, grab PRESETS otherwise
  const [collections, setCollections] = useLocalStorageState('collections', sortCollections(PRESETS));

  const value = React.useMemo(() => {
    // capture current collection prices and update collections in state
    function updateItemPrice(collectionId, itemId, price) {
      const nextItems = collections[collectionId].items.map((item) => {
        if (!price || (item.id === itemId && item.price === price)) {
          return item;
        }
        return item.id === itemId ? { ...item, price: parseFloat(price) } : item;
      });
      const nextCollection = { ...collections[collectionId], items: nextItems }
      const nextCollections = { ...collections, [collectionId]: nextCollection }
      setCollections(sortCollections(nextCollections));
    }

    function updateCollection(collectionId, item) {
      const nextItems = collections[collectionId].items.filter((existingItem) => {
        return item.id !== existingItem.id;
      });
      nextItems.push(item);
      const nextCollection = { ...collections[collectionId], items: nextItems }
      const nextCollections = { ...collections, [collectionId]: nextCollection }
      setCollections(sortCollections(nextCollections));
    }

    return {
      collections,
      setCollections,
      updateItemPrice,
      updateCollection
    }
  }, [collections, setCollections]);


  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  )
}

export default CollectionsProvider;
