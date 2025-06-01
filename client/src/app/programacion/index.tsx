import { Card } from "@/components/ui/card";
import { useProgramacionCalendar } from "@/hooks/useProgramacionCalendar";
import { SearchForm, CalendarGrid, MonthSummary, LoadingSpinner } from "./components";
import { months } from "./components/SearchForm";

export default function Programacion() {
  const {
    year,
    month,
    sucursal,
    workSchedules,
    calendarDays,
    summary,
    loading,
    error,
    handleSubmit,
    handleYearChange,
    handleMonthChange,
    handleSucursalChange
  } = useProgramacionCalendar();

  const currentMonthName = months.find(m => m.value === month)?.label;

  return (
    <section className="p-4">
      <SearchForm
        year={year}
        month={month}
        sucursal={sucursal}
        loading={loading}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
        onSucursalChange={handleSucursalChange}
        onSubmit={handleSubmit}
      />

      {error && (
        <Card className="mt-4 p-4 border-red-200 bg-red-50">
          <div className="text-red-700">{error}</div>
        </Card>
      )}

      {/* Loading state */}
      {loading && <LoadingSpinner />}

      {/* Calendario */}
      {workSchedules.length > 0 && !loading && (
        <Card className="mt-4 p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center">
              {currentMonthName} {year}
            </h2>
            <p className="text-center text-gray-600">
              Sucursal: {sucursal} | {workSchedules.length} programaciones encontradas
            </p>
          </div>

          <CalendarGrid calendarDays={calendarDays} />
          <MonthSummary summary={summary} />
        </Card>
      )}

      {/* Mensaje cuando no hay datos */}
      {sucursal && workSchedules.length === 0 && !loading && !error && (
        <Card className="mt-4 p-8 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-lg font-medium mb-2">No hay programaciones</h3>
            <p>No se encontraron programaciones para la sucursal {sucursal} en {currentMonthName} {year}</p>
          </div>
        </Card>
      )}
    </section>
  );
}