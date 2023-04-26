import React from "react";

export const CurrentCollectionContext = React.createContext();

function CurrentCollectionProvider({ children }) {

  // the active collection ID ('beer','wine','soup')
  const [currentCollectionId, setCurrentCollectionId] = React.useState('');

  return (
    <CurrentCollectionContext.Provider value={{ currentCollectionId, setCurrentCollectionId }}>
      {children}
    </CurrentCollectionContext.Provider>
  )
}

export default CurrentCollectionProvider;
