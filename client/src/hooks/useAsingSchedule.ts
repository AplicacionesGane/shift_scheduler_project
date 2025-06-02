import { searchStoreById, getAllShifts } from '@/services/stores.service';
import { useCallback, useEffect, useRef, useState } from "react";
import type { Shift, Store } from "@/types/Interfaces";

interface PropsAsingSchedule {
  idStore: string;
}

export function useAsingSchedule({ idStore }: PropsAsingSchedule) {
  const [store, setStore] = useState<Store>();
  const [shifts, setShifts] = useState<Shift[]>([]);

  const previousId = useRef<string>(idStore);
  
  const getStores = useCallback(
    async (id: string) => {
      if (id === previousId.current) return;
      previousId.current = id;
      const stores = await searchStoreById(id);
      setStore(stores);
    }, [])

  const getShifts = async () => {
    if (shifts.length > 0) return; // Evita recargar si ya hay turnos
    try {
      const shiftsData = await getAllShifts();
      setShifts(shiftsData);
    } catch (error) {
      console.error("Error al cargar los turnos:", error);
    }
  };

  useEffect(() => {
    getShifts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { store, getStores, shifts };
}