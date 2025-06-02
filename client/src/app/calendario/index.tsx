import { useCalendar } from "@/hooks/useCalendar";
import { SearchForm } from "./components";

export default function Programacion() {
  const {
    handleSucursalChange,
    handleYearOrMonthChange,
    selectedMonth,
    selectedYear,
    sucursal
  } = useCalendar();


  return (
    <section className="p-4">
      <SearchForm
        year={selectedYear}
        month={selectedMonth}
        sucursal={sucursal}
        handleYearOrMonthChange={handleYearOrMonthChange}
        onSucursalChange={handleSucursalChange}
      /> 


      {/* Calendario */}
      {/* {workSchedules.length > 0 && !loading && (
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
      )} */}

      {/* Mensaje cuando no hay datos 
      {sucursal && workSchedules.length === 0 && !loading && !error && (
        <Card className="mt-4 p-8 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-lg font-medium mb-2">No hay programaciones</h3>
            <p>No se encontraron programaciones para la sucursal {sucursal} en {currentMonthName} {year}</p>
          </div>
        </Card>
      )}
        */}
    </section>
  );
}