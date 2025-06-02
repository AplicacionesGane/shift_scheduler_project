import { searchStores } from '@/services/stores.service';
import { useCallback, useRef, useState } from "react";
import type { Store } from "@/types/Interfaces";

export function useStores(id: string) {
  const [store, setStore] = useState<Store>();

  const previousId = useRef<string>(id);
  
  const getStores = useCallback(
    async (id: string) => {
      if (id === previousId.current) return;
      previousId.current = id;
      const stores = await searchStores(id);
      setStore(stores);
    }, [])

  return { store, getStores };
}