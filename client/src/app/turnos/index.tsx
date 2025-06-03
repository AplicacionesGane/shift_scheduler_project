import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useShiftsManagement, type Shift } from "@/hooks/useShiftsManagement";
import { useShiftForm } from "@/hooks/useShiftForm";
import { ShiftStats, ShiftForm, ShiftCard, EmptyState } from "./components";

export default function ShiftsPage() {
  const { shifts, loading, error, createShift, updateShift, deleteShift, refetch } = useShiftsManagement();
  const { formData, formErrors, validateForm, resetForm, updateField, loadShiftData } = useShiftForm();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);

  // Abrir modal para crear
  const openCreateDialog = useCallback(() => {
    resetForm();
    setEditingShift(null);
    setDialogOpen(true);
  }, [resetForm]);

  // Abrir modal para editar
  const openEditDialog = useCallback((shift: Shift) => {
    loadShiftData(shift);
    setEditingShift(shift);
    setDialogOpen(true);
  }, [loadShiftData]);

  // Manejar envío del formulario
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = editingShift 
      ? await updateShift(editingShift.id, formData)
      : await createShift(formData);

    if (success) {
      setDialogOpen(false);
      resetForm();
      setEditingShift(null);
    }
  }, [validateForm, editingShift, updateShift, createShift, formData, resetForm]);

  // Eliminar turno
  const handleDelete = useCallback(async (shiftId: string) => {
    await deleteShift(shiftId);
  }, [deleteShift]);

  // Cancelar formulario
  const handleCancel = useCallback(() => {
    setDialogOpen(false);
    resetForm();
    setEditingShift(null);
  }, [resetForm]);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Turnos</h1>
          <p className="text-gray-600 mt-1">
            Administra los turnos de trabajo de tu organización
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Turno
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingShift ? "Editar Turno" : "Crear Nuevo Turno"}
              </DialogTitle>
              <DialogDescription>
                {editingShift 
                  ? "Modifica los datos del turno seleccionado"
                  : "Completa la información para crear un nuevo turno"
                }
              </DialogDescription>
            </DialogHeader>
            
            <ShiftForm
              formData={formData}
              formErrors={formErrors}
              loading={loading}
              isEditing={!!editingShift}
              onFieldChange={updateField}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <ShiftStats shifts={shifts} />

      {/* Lista de turnos */}
      {shifts.length === 0 ? (
        <EmptyState 
          loading={loading}
          error={error}
          onCreateClick={openCreateDialog}
          onRetry={refetch}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shifts.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}