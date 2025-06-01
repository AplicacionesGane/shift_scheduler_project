import { type ShiftFormData } from '@/hooks/useShiftsManagement';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { memo } from 'react';

interface ShiftFormProps {
    formData: ShiftFormData;
    formErrors: Partial<ShiftFormData>;
    loading: boolean;
    isEditing: boolean;
    onFieldChange: (field: keyof ShiftFormData, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export const ShiftForm = memo(({
    formData,
    formErrors,
    loading,
    isEditing,
    onFieldChange,
    onSubmit,
    onCancel
}: ShiftFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="nameTurno">Nombre del Turno</Label>
                    <Input
                        id="nameTurno"
                        value={formData.nameTurno}
                        onChange={(e) => onFieldChange('nameTurno', e.target.value)}
                        placeholder="Ej: Turno Mañana"
                        className={formErrors.nameTurno ? "border-red-500" : ""}
                    />
                    {formErrors.nameTurno && (
                        <p className="text-sm text-red-500">{formErrors.nameTurno}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startTime">Hora Inicio</Label>
                        <Input
                            id="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => onFieldChange('startTime', e.target.value)}
                            className={formErrors.startTime ? "border-red-500" : ""}
                        />
                        {formErrors.startTime && (
                            <p className="text-sm text-red-500">{formErrors.startTime}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="endTime">Hora Fin</Label>
                        <Input
                            id="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => onFieldChange('endTime', e.target.value)}
                            className={formErrors.endTime ? "border-red-500" : ""}
                        />
                        {formErrors.endTime && (
                            <p className="text-sm text-red-500">{formErrors.endTime}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Descripción (Opcional)</Label>
                    <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => onFieldChange('description', e.target.value)}
                        placeholder="Descripción del turno..."
                    />
                </div>
            </div>

            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
                </Button>
            </DialogFooter>
        </form>
    );
});

ShiftForm.displayName = 'ShiftForm';
