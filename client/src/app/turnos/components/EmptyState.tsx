import { Card, CardContent } from '@/components/ui/card';
import { Clock, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface EmptyStateProps {
  loading: boolean;
  error: string | null;
  onCreateClick: () => void;
  onRetry?: () => void;
}

export const EmptyState = memo(({ loading, error, onCreateClick, onRetry }: EmptyStateProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500">Cargando turnos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <div>
              <h3 className="text-lg font-medium text-red-900 mb-2">Error al cargar</h3>
              <p className="text-red-700 mb-4">{error}</p>
              {onRetry && (
                <Button onClick={onRetry} variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  Reintentar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <Clock className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay turnos</h3>
            <p className="text-gray-500 mb-6">
              Comienza creando tu primer turno de trabajo para organizar los horarios
            </p>
            <Button onClick={onCreateClick} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Crear Primer Turno
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

EmptyState.displayName = 'EmptyState';
