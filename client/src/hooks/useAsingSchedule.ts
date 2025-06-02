import { searchStoreById, getAllShifts, getVendedoraByDocument } from '@/services/stores.service';
import { useCallback, useEffect, useRef, useState } from "react";
import type { Shift, Store, Vendedora } from "@/types/Interfaces";

export function useAsingSchedule() {
  const [store, setStore] = useState<Store>();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [id, setId] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [vendedora, setVendedora] = useState<Vendedora>();

  const previousId = useRef<string>(id);
  
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

  const getVendedora = async (document: string) => {
    try {
      const vendedoraData = await getVendedoraByDocument(document);
      setVendedora(vendedoraData);
    } catch (error) {
      console.error("Error al cargar la vendedora:", error);
    }
  }

  useEffect(() => {
    getShifts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { store, getStores, shifts, getVendedora, vendedora, id, setId, selectedShift, setSelectedShift, getShifts };
}