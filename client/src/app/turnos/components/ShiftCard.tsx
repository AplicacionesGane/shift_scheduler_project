import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { type Shift } from '@/hooks/useShiftsManagement';

interface ShiftCardProps {
  shift: Shift;
  onEdit: (shift: Shift) => void;
  onDelete: (shiftId: string) => void;
}

export const ShiftCard = memo(({ shift, onEdit, onDelete }: ShiftCardProps) => {
  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return `${diffHours}h`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {shift.nameTurno}
            </CardTitle>
            <Badge variant="secondary" className="mt-2 font-medium">
              {calculateDuration(shift.startTime, shift.endTime)}
            </Badge>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(shift)}
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
              title="Editar turno"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  title="Eliminar turno"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar turno?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente 
                    el turno "{shift.nameTurno}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(shift.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-gray-500">Inicio</span>
              <p className="font-medium text-gray-900">{formatTime(shift.startTime)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-gray-500">Fin</span>
              <p className="font-medium text-gray-900">{formatTime(shift.endTime)}</p>
            </div>
          </div>
          
          {shift.description && (
            <>
              <Separator />
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Descripción</span>
                <p className="text-sm text-gray-700">{shift.description}</p>
              </div>
            </>
          )}
          
          <Separator />
          <div className="text-xs text-gray-400">
            Creado: {new Date(shift.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ShiftCard.displayName = 'ShiftCard';
