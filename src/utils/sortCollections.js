import calculateTotalVolume from "./calculateTotalVolume";

// sort collection items by total volume
function sortCollectionItems(collection) {
  const sortedItems = collection.items.sort((a, b) => {
    return calculateTotalVolume(a, collection.baseUnit) - calculateTotalVolume(b, collection.baseUnit);
  });
  return sortedItems;
}

// map over and sort all collections
export default function sortCollections(collectionsObject) {
  const sortedCollections = collectionsObject;
  Object.keys(collectionsObject).forEach((collection) => {
    sortedCollections[collection].items = sortCollectionItems(sortedCollections[collection]);
  });
  return sortedCollections;
}
