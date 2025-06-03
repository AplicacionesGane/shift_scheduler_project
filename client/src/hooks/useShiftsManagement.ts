import { useState, useEffect, useCallback } from 'react';
import { API_SERVER_URL } from '@/utils/constants';
import axios from 'axios';

export interface Shift {
  id: string;
  nameTurno: string;
  startTime: string;
  endTime: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftFormData {
  nameTurno: string;
  startTime: string;
  endTime: string;
  description: string;
}

export const useShiftsManagement = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShifts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_SERVER_URL}/shifts`);
      setShifts(response.data);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
      setError('Error al cargar los turnos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createShift = useCallback(async (formData: ShiftFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_SERVER_URL}/shifts`, formData);
      await fetchShifts();
      return true;
    } catch (error) {
      console.error('Error al crear el turno:', error);
      setError('Error al crear el turno');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchShifts]);

  const updateShift = useCallback(async (shiftId: string, formData: ShiftFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_SERVER_URL}/shifts`, { ...formData, id: shiftId });
      await fetchShifts();
      return true;
    } catch (error) {
      console.error('Error al actualizar el turno:', error);
      setError('Error al actualizar el turno');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchShifts]);

  const deleteShift = useCallback(async (shiftId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_SERVER_URL}/shifts/${shiftId}`);
      await fetchShifts();
      return true;
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      setError('Error al eliminar el turno');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchShifts]);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  return {
    shifts,
    loading,
    error,
    createShift,
    updateShift,
    deleteShift,
    refetch: fetchShifts
  };
};
