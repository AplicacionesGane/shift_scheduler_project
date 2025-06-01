import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_SERVER_URL } from '@/utils/constants';
import type { Shift } from '@/types/Interfaces';

interface ShiftsCache {
  [shiftId: string]: Shift;
}

export const useShifts = () => {
  const [shiftsCache, setShiftsCache] = useState<ShiftsCache>({});
  const [loading, setLoading] = useState<Set<string>>(new Set());

  const getShift = useCallback(async (shiftId: string): Promise<Shift | null> => {
    // Si ya está en cache, devolverlo inmediatamente
    if (shiftsCache[shiftId]) {
      return shiftsCache[shiftId];
    }

    // Si ya se está cargando, esperar
    if (loading.has(shiftId)) {
      return new Promise((resolve) => {
        const checkCache = () => {
          if (shiftsCache[shiftId]) {
            resolve(shiftsCache[shiftId]);
          } else if (!loading.has(shiftId)) {
            resolve(null);
          } else {
            setTimeout(checkCache, 100);
          }
        };
        checkCache();
      });
    }

    // Marcar como cargando
    setLoading(prev => new Set([...prev, shiftId]));

    try {
      const response = await axios.get(`${API_SERVER_URL}/shifts/${shiftId}`);
      const shiftData = response.data;
      
      setShiftsCache(prev => ({
        ...prev,
        [shiftId]: shiftData
      }));

      return shiftData;
    } catch (error) {
      console.error(`Error al obtener turno ${shiftId}:`, error);
      return null;
    } finally {
      setLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(shiftId);
        return newSet;
      });
    }
  }, [shiftsCache, loading]);

  const preloadShifts = useCallback(async (shiftIds: string[]) => {
    const uniqueIds = [...new Set(shiftIds)];
    const missingIds = uniqueIds.filter(id => !shiftsCache[id] && !loading.has(id));
    
    if (missingIds.length === 0) return;

    // Marcar todos como cargando
    setLoading(prev => new Set([...prev, ...missingIds]));

    try {
      // Hacer todas las llamadas en paralelo
      const promises = missingIds.map(async (shiftId) => {
        try {
          const response = await axios.get(`${API_SERVER_URL}/shifts/${shiftId}`);
          return { shiftId, data: response.data };
        } catch (error) {
          console.error(`Error al obtener turno ${shiftId}:`, error);
          return { shiftId, data: null };
        }
      });

      const results = await Promise.all(promises);
      
      // Actualizar cache con todos los resultados
      const newCache: ShiftsCache = {};
      results.forEach(({ shiftId, data }) => {
        if (data) {
          newCache[shiftId] = data;
        }
      });

      setShiftsCache(prev => ({ ...prev, ...newCache }));
    } finally {
      // Remover de loading
      setLoading(prev => {
        const newSet = new Set(prev);
        missingIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  }, [shiftsCache, loading]);

  return {
    getShift,
    preloadShifts,
    shiftsCache,
    isLoading: (shiftId: string) => loading.has(shiftId)
  };
};
