import { create } from 'zustand';
import axios from 'axios';
import { API_SERVER_URL } from '@/utils/constants';
import type { Shift } from '@/types/Interfaces';

interface ShiftsState {
  // Estado
  shiftsCache: Record<string, Shift>;
  loading: Set<string>;
  
  // Acciones
  getShift: (shiftId: string) => Promise<Shift | null>;
  preloadShifts: (shiftIds: string[]) => Promise<void>;
  isLoading: (shiftId: string) => boolean;
  setShiftInCache: (shiftId: string, shift: Shift) => void;
  addToLoading: (shiftId: string) => void;
  removeFromLoading: (shiftId: string) => void;
}

export const useShiftsStore = create<ShiftsState>((set, get) => ({
  // Estado inicial
  shiftsCache: {},
  loading: new Set(),

  // Verificar si un turno está cargando
  isLoading: (shiftId: string) => {
    return get().loading.has(shiftId);
  },

  // Agregar turno al cache
  setShiftInCache: (shiftId: string, shift: Shift) => {
    set((state) => ({
      shiftsCache: {
        ...state.shiftsCache,
        [shiftId]: shift
      }
    }));
  },

  // Agregar a loading
  addToLoading: (shiftId: string) => {
    set((state) => ({
      loading: new Set([...state.loading, shiftId])
    }));
  },

  // Remover de loading
  removeFromLoading: (shiftId: string) => {
    set((state) => {
      const newLoading = new Set(state.loading);
      newLoading.delete(shiftId);
      return { loading: newLoading };
    });
  },

  // Obtener un turno individual
  getShift: async (shiftId: string): Promise<Shift | null> => {
    const state = get();
    
    // Si ya está en cache, devolverlo inmediatamente
    if (state.shiftsCache[shiftId]) {
      return state.shiftsCache[shiftId];
    }

    // Si ya se está cargando, esperar
    if (state.loading.has(shiftId)) {
      return new Promise((resolve) => {
        const checkCache = () => {
          const currentState = get();
          if (currentState.shiftsCache[shiftId]) {
            resolve(currentState.shiftsCache[shiftId]);
          } else if (!currentState.loading.has(shiftId)) {
            resolve(null);
          } else {
            setTimeout(checkCache, 100);
          }
        };
        checkCache();
      });
    }

    // Marcar como cargando
    state.addToLoading(shiftId);

    try {
      const response = await axios.get(`${API_SERVER_URL}/shifts/${shiftId}`);
      const shiftData = response.data;
      
      state.setShiftInCache(shiftId, shiftData);
      return shiftData;
    } catch (error) {
      console.error(`Error al obtener turno ${shiftId}:`, error);
      return null;
    } finally {
      state.removeFromLoading(shiftId);
    }
  },

  // Precargar múltiples turnos
  preloadShifts: async (shiftIds: string[]) => {
    const state = get();
    const uniqueIds = [...new Set(shiftIds)];
    const missingIds = uniqueIds.filter(id => 
      !state.shiftsCache[id] && !state.loading.has(id)
    );
    
    if (missingIds.length === 0) return;

    // Marcar todos como cargando
    missingIds.forEach(id => state.addToLoading(id));

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
      results.forEach(({ shiftId, data }) => {
        if (data) {
          state.setShiftInCache(shiftId, data);
        }
      });
    } finally {
      // Remover de loading
      missingIds.forEach(id => state.removeFromLoading(id));
    }
  }
}));
