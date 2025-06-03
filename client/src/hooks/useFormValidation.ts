import { useEffect } from 'react';

interface UseFormValidationProps {
  year: number;
  month: number;
  sucursal: string;
  clearSchedules: () => void;
}

export const useFormValidation = ({ 
  year, 
  month, 
  sucursal, 
  clearSchedules 
}: UseFormValidationProps) => {
  
  // Limpiar resultados cuando cambian los filtros
  useEffect(() => {
    clearSchedules();
  }, [year, month, sucursal, clearSchedules]);

  const validateForm = (): string | null => {
    if (!sucursal.trim()) {
      return "Por favor, ingresa el número de sucursal";
    }
    
    if (sucursal.trim().length < 1) {
      return "El número de sucursal debe tener al menos 1 carácter";
    }

    return null;
  };

  return {
    validateForm
  };
};
