import type { ShiftFormData } from './useShiftsManagement';
import { useState, useCallback } from 'react';

export const useShiftForm = () => {
  const [formData, setFormData] = useState<ShiftFormData>({
    nameTurno: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ShiftFormData>>({});

  const validateForm = useCallback((): boolean => {
    const errors: Partial<ShiftFormData> = {};

    if (!formData.nameTurno.trim()) {
      errors.nameTurno = 'El nombre del turno es requerido';
    }
    if (!formData.startTime) {
      errors.startTime = 'La hora de inicio es requerida';
    }
    if (!formData.endTime) {
      errors.endTime = 'La hora de fin es requerida';
    }
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      errors.endTime = 'La hora de fin debe ser posterior a la de inicio';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      nameTurno: '',
      startTime: '',
      endTime: '',
      description: '',
    });
    setFormErrors({});
  }, []);

  const updateField = useCallback((field: keyof ShiftFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [formErrors]);

  const loadShiftData = useCallback((shift: {
    nameTurno: string;
    startTime: string;
    endTime: string;
    description?: string | null;
  }) => {
    setFormData({
      nameTurno: shift.nameTurno,
      startTime: shift.startTime,
      endTime: shift.endTime,
      description: shift.description || '',
    });
    setFormErrors({});
  }, []);

  return {
    formData,
    formErrors,
    validateForm,
    resetForm,
    updateField,
    loadShiftData
  };
};
