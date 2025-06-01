import { memo } from 'react';
import { Card } from "@/components/ui/card";

export const LoadingSpinner = memo(() => (
  <Card className="mt-4 p-8 text-center">
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">Cargando programaciones...</p>
    </div>
  </Card>
));

LoadingSpinner.displayName = 'LoadingSpinner';
