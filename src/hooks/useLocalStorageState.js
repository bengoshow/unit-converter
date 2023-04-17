import React from 'react'

export default function useLocalStorageState(key, default_value = '') {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage)
    }
    return default_value
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

