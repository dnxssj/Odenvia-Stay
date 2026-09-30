import { useEffect, useState } from 'react';
import { loadStore, saveStore } from '../services/storage';

export function useStore() {
  const [store, setStore] = useState(loadStore);

  useEffect(() => {
    const handleStoreEvent = (event) => {
      setStore(event.detail);
    };

    window.addEventListener('odenvia-store', handleStoreEvent);

    return () => {
      window.removeEventListener('odenvia-store', handleStoreEvent);
    };
  }, []);

  const update = (patch) => {
    const nextStore = {
      ...store,
      ...patch,
    };

    saveStore(nextStore);
    setStore(nextStore);
  };

  return [store, update];
}
