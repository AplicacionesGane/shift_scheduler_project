import type { WorkSchedule } from '@/types/Interfaces';
import { API_SERVER_URL } from '@/utils/constants';
import { useState, useCallback } from 'react';
import axios from 'axios';

interface UseProgramacionReturn {
  workSchedules: WorkSchedule[];
  loading: boolean;
  error: string | null;
  fetchSchedules: (sucursal: string, year: number, month: number) => Promise<void>;
  clearSchedules: () => void;
}

export const useProgramacion = (): UseProgramacionReturn => {
  const [workSchedules, setWorkSchedules] = useState<WorkSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async (sucursal: string, year: number, month: number) => {
    const trimmedSucursal = sucursal.trim();
    
    if (!trimmedSucursal) {
      setError("Por favor, ingresa el número de sucursal");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_SERVER_URL}/work-schedules/${trimmedSucursal}/${year}/${month}`, {
        timeout: 10000 // 10 segundos de timeout
      });
      
      const schedules = response.data || [];
      setWorkSchedules(schedules);
      console.log(`Programaciones cargadas: ${schedules.length} para sucursal ${trimmedSucursal}`);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          setError("Tiempo de espera agotado. Inténtalo de nuevo.");
        } else if (error.response?.status === 404) {
          setError("No se encontraron datos para los parámetros especificados");
        } else if (error.response?.status === 500) {
          setError("Error del servidor. Inténtalo más tarde.");
        } else {
          setError("Error al cargar las programaciones");
        }
      } else {
        setError("Error de conexión. Verifica tu conexión a internet.");
      }
      
      setWorkSchedules([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSchedules = useCallback(() => {
    setWorkSchedules([]);
    setError(null);
  }, []);

  return {
    workSchedules,
    loading,
    error,
    fetchSchedules,
    clearSchedules
  };
};
