import { StoreSearchStep, ShiftSelectionStep, VendedoraSearchStep, DateAssignmentStep } from './components';
import React, { useState, useCallback, useMemo } from 'react';
import { useAsingSchedule } from "@/hooks/useAsingSchedule";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Multi-step wizard component with modular steps
const AsingSchedules: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const asingScheduleData = useAsingSchedule();
  const { 
    store, 
    vendedora, 
    selectedShift, 
    selectedDates,
    confirmAssignment 
  } = asingScheduleData;

  // Step navigation handlers
  const goToNextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  // Form handlers for each step
  const { 
    getStores, 
    getVendedora, 
    setId, 
    id, 
    setSelectedShift,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    toggleDate,
    clearSelectedDates,
    getDaysInMonth,
    getFirstDayOfMonth,
    isValidAssignmentDate,
    vendedoraDocument
  } = asingScheduleData;

  const handleChangeStore = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, [setId]);

  const handleSubmitStore = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getStores(id);
  }, [getStores, id]);

  const handleShiftSelect = useCallback((shiftId: string | null) => {
    setSelectedShift(shiftId);
  }, [setSelectedShift]);

  const handleSubmitVendedora = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const documento = formData.get("documento") as string;
    if (!documento || documento.trim() === "") {
      alert("Por favor, ingresa un documento de identidad válido.");
      return;
    }
    getVendedora(documento);
  }, [getVendedora]);

  // Check if current step is complete
  const isStepComplete = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!store;
      case 2:
        return !!selectedShift;
      case 3:
        return !!vendedora;
      case 4:
        return selectedDates.size > 0;
      default:
        return false;
    }
  }, [store, selectedShift, vendedora, selectedDates]);

  // Check if user can proceed to next step
  const canProceedToNext = useMemo(() => {
    return isStepComplete(currentStep);
  }, [currentStep, isStepComplete]);

  // Handle final assignment confirmation
  const handleConfirmAssignment = useCallback(async () => {
    const success = await confirmAssignment();
    if (success) {
      setCurrentStep(1); // Reset to first step after successful assignment
    }
  }, [confirmAssignment]);

  // Render step content based on current step
  const renderStepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <StoreSearchStep 
            id={id}
            store={store}
            onChangeId={handleChangeStore}
            onSubmit={handleSubmitStore}
          />
        );
      case 2:
        return (
          <ShiftSelectionStep 
            shifts={asingScheduleData.shifts}
            selectedShift={selectedShift}
            onShiftSelect={handleShiftSelect}
          />
        );
      case 3:
        return (
          <VendedoraSearchStep 
            vendedora={vendedora}
            onSubmit={handleSubmitVendedora}
          />
        );
      case 4:
        return (
          <DateAssignmentStep 
            store={store}
            vendedora={vendedora}
            shifts={asingScheduleData.shifts}
            selectedShift={selectedShift}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDates={selectedDates}
            vendedoraDocument={vendedoraDocument}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
            onDateToggle={toggleDate}
            onClearDates={clearSelectedDates}
            onConfirmAssignment={handleConfirmAssignment}
            getDaysInMonth={getDaysInMonth}
            getFirstDayOfMonth={getFirstDayOfMonth}
            isValidAssignmentDate={isValidAssignmentDate}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep, 
    id, 
    store, 
    vendedora, 
    selectedShift, 
    selectedYear, 
    selectedMonth, 
    selectedDates, 
    vendedoraDocument,
    asingScheduleData.shifts,
    handleChangeStore, 
    handleSubmitStore, 
    handleShiftSelect, 
    handleSubmitVendedora, 
    handleConfirmAssignment,
    setSelectedYear,
    setSelectedMonth,
    toggleDate,
    clearSelectedDates,
    getDaysInMonth,
    getFirstDayOfMonth,
    isValidAssignmentDate
  ]);

  // Progress indicator component
  const ProgressIndicator = useMemo(() => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
          >
            <button
              onClick={() => goToStep(step)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                currentStep === step
                  ? 'bg-blue-600 text-white shadow-lg'
                  : isStepComplete(step)
                  ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
              disabled={!isStepComplete(step) && step !== currentStep && step !== currentStep + 1}
            >
              {isStepComplete(step) && step !== currentStep ? '✓' : step}
            </button>
            {step < 4 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-200 ${
                  isStepComplete(step) ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Sucursal</span>
        <span>Turno</span>
        <span>Vendedora</span>
        <span>Fechas</span>
      </div>
    </div>
  ), [currentStep, isStepComplete, goToStep]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Asignación de Horarios
          </h1>
          <p className="text-gray-600">
            Asigna turnos a vendedoras siguiendo estos sencillos pasos
          </p>
        </div>

        <Card className="p-8">
          {ProgressIndicator}
          
          {/* Step Content */}
          <div className="min-h-[500px]">
            {renderStepContent}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            
            <div className="flex gap-3">
              {currentStep < 4 && (
                <Button
                  onClick={goToNextStep}
                  disabled={!canProceedToNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Siguiente
                </Button>
              )}
              
              {currentStep === 4 && (
                <Button
                  onClick={handleConfirmAssignment}
                  disabled={!isStepComplete(4)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirmar Asignación
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

AsingSchedules.displayName = 'AsingSchedules';

export default React.memo(AsingSchedules);
