import { memo } from 'react';
import { Button } from '@/components/ui/button';

interface CalendarNavigationProps {
  title: string;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
}

export const CalendarNavigation = memo(({
  title,
  canNavigatePrev,
  canNavigateNext,
  onNavigatePrev,
  onNavigateNext
}: CalendarNavigationProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <Button
        variant="outline"
        onClick={onNavigatePrev}
        disabled={!canNavigatePrev}
        className="flex items-center gap-2"
      >
        ← Anterior
      </Button>

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <Button
        variant="outline"
        onClick={onNavigateNext}
        disabled={!canNavigateNext}
        className="flex items-center gap-2"
      >
        Siguiente →
      </Button>
    </div>
  );
});

CalendarNavigation.displayName = 'CalendarNavigation';
