import { CalendarGrid, CalendarHeader, SearchForm } from "./components";
import { useCalendar } from "@/hooks/useCalendar";
import { Card } from "@/components/ui/card";

export default function Programacion() {
  const { handleChangeFun, handleSubmit, data } = useCalendar();

  return (
    <section className="p-4">
      <SearchForm  funHandleChange={handleChangeFun} submitForm={handleSubmit} />

      {/* Calendario */}
      {data && data.length > 0 ? (
        <div className="mt-4">
          {/* Header del calendario con navegación e información */}
          <CalendarHeader 
            calendarDays={data}
            onPreviousMonth={() => {
              // TODO: Implementar navegación al mes anterior
              console.log('Navegar a mes anterior');
            }}
            onNextMonth={() => {
              // TODO: Implementar navegación al mes siguiente  
              console.log('Navegar a mes siguiente');
            }}
            onGoToday={() => {
              // TODO: Implementar ir al día de hoy
              console.log('Ir a hoy');
            }}
          />

          {/* Grid del calendario */}
          <Card className="p-4">
            <CalendarGrid calendarDays={data} />
          </Card>
        </div>
      ) : (
        /* Mensaje cuando no hay datos */
        <Card className="mt-4 p-8 text-center">
          <div className="text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-lg font-medium mb-2">No hay datos de calendario</h3>
            <p>Selecciona un año y mes para ver el calendario</p>
          </div>
        </Card>
      )}
    </section>
  );
}