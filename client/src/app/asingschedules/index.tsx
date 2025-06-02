import { useAsingSchedule } from "@/hooks/useAsingSchedule";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function AsingSchedules() {
  const { 
    getStores, 
    store, 
    shifts, 
    getVendedora,
    vendedora, 
    setId, 
    id, 
    selectedShift, 
    setSelectedShift,
    // Calendar functionality
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedDates,
    toggleDate,
    clearSelectedDates,
    getDaysInMonth,
    getFirstDayOfMonth,
    isValidAssignmentDate,
    vendedoraDocument,
    // Assignment confirmation
    confirmAssignment
  } = useAsingSchedule();

  const handleChangeStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const handleSubmitStore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getStores(id);
  }

  const handleSubmitVendedora = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const documento = formData.get("documento") as string;
    if (!documento || documento.trim() === "") {
      alert("Por favor, ingresa un documento de identidad válido.");
      return;
    }

    getVendedora(documento);
  }

  return (
    <div className="flex flex-col w-full h-screen space-y-1">
      <Card className="grid grid-cols-4 gap-8">
        <div className="space-y-4 col-span-1 px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Step 1
            </h1>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🏪 Buscar Sucursal</h3>
            <p className="text-sm text-gray-600">Ingresa el ID para encontrar la información de la sucursal</p>
          </div>

          <form onSubmit={handleSubmitStore} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                🔍 Código de Sucursal
              </Label>
              <Input type="text" value={id} placeholder="Ej: 39825, 41925 ... etc." onChange={handleChangeStore} />
            </div>
            <Button type="submit" variant='blue'>
              Buscar Sucursal
            </Button>
          </form>
        </div>

        {/* Resultados - Lado Derecho */}
        <div className="col-span-3 border-l border-gray-200 pl-8 py-6">
          {store ? (
            <div className="space-y-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <span className="text-green-600 text-2xl">✅</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Sucursal Encontrada</h4>
                  <p className="text-sm text-gray-600">Información completa de la sucursal</p>
                </div>
              </div>

              {/* Información Principal */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1 text-xl">🏢</span>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{store.nombre}</p>
                      <p className="text-sm text-blue-600 font-medium">Nombre de la sucursal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 mt-1 text-xl">🏛️</span>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{store.empresa}</p>
                      <p className="text-sm text-purple-600 font-medium">Empresa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-green-600">📍</span>
                  Ubicación y Datos Generales
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-medium text-gray-900">{store.direccion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <p className="font-medium text-gray-900">{store.estado || "No disponible"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Región</p>
                    <p className="font-medium text-gray-900">{store.region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Categoría</p>
                    <p className="font-medium text-gray-900">{store.categoria}</p>
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-amber-600">🕐</span>
                  Horarios de Operación
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-amber-700">Horario Regular</p>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-sm">🟢</span>
                      <span className="font-medium text-gray-900">{store.horaEntrada} - {store.horaSalida}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-amber-700">Horario Festivo</p>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600 text-sm">🎉</span>
                      <span className="font-medium text-gray-900">{store.horaEntradaFest} - {store.horaSalidaFest}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identificadores */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-gray-600">🏷️</span>
                  Identificadores
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-white rounded-lg p-3 border">
                    <p className="text-sm text-gray-600 mb-1">ID Sucursal</p>
                    <p className="font-bold text-blue-600 text-2xl">{store.sucursal}</p>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 border">
                    <p className="text-sm text-gray-600 mb-1">Célula</p>
                    <p className="font-bold text-indigo-600 text-2xl">{store.celula}</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg">Busca una sucursal para ver los detalles</p>
              </div>
            </div>
          )}
        </div>

      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Step 2
            </h1>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Asignar Turno - Horario
            </h3>
            <p className="text-sm text-gray-600">Selecciona un turno disponible para asignar a la sucursal</p>
          </div>

          {/* Grid de Shifts */}
          {shifts.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900">
                  Turnos Disponibles ({shifts.length})
                </h4>
                {selectedShift && (
                  <div className="text-sm text-green-600 font-medium">
                    ✅ Turno seleccionado
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {shifts.map((shift) => (
                  <div
                    key={shift.id}
                    onClick={() => setSelectedShift(selectedShift === shift.id ? null : shift.id)}
                    className={`
                      relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]
                      ${selectedShift === shift.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                      }
                    `}
                  >
                    {/* Indicador de selección */}
                    {selectedShift === shift.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}

                    {/* Contenido del turno */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${selectedShift === shift.id ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                        <h5 className="font-semibold text-gray-900 truncate">{shift.nameTurno}</h5>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-green-600">🕐</span>
                          <span className="font-medium text-gray-700">
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${selectedShift === shift.id
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-600'
                            }
                          `}>
                            {(() => {
                              const start = new Date(`2000-01-01T${shift.startTime}`);
                              const end = new Date(`2000-01-01T${shift.endTime}`);
                              const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                              return `${diffHours}h duración`;
                            })()}
                          </div>
                        </div>

                        {shift.description && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 truncate" title={shift.description}>
                              {shift.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Información del turno seleccionado */}
              {selectedShift && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-900">
                        Turno Seleccionado: {shifts.find(s => s.id === selectedShift)?.nameTurno}
                      </h5>
                      <p className="text-sm text-blue-700">
                        Horario: {shifts.find(s => s.id === selectedShift)?.startTime} - {shifts.find(s => s.id === selectedShift)?.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">⏰</div>
                <p className="text-lg">No hay turnos disponibles</p>
                <p className="text-sm">Los turnos se cargarán automáticamente</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="grid grid-cols-4 gap-8">
        <div className="space-y-4 col-span-1 px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Step 3
            </h1>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex gap-2">
              <Users />
              <span>Buscar Vendedora - Asignación Horario Punto de Venta</span>
            </h3>
            <p className="text-sm text-gray-600">Ingresa el documento de identidad de la vendedora para confirmar asignación</p>
          </div>

          <form onSubmit={handleSubmitVendedora} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                🔍 N° Documento Vendora
              </Label>
              <Input type="text" name="documento" placeholder="Ej: 1118***** | 31525****" />
            </div>
            <Button type="submit" variant='blue'>
              Buscar Vendedora
            </Button>
          </form>
        </div>

        <div className="col-span-3 border-l border-gray-200 pl-8 py-6">
          {vendedora ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-full">
                  <span className="text-green-600 text-2xl">✅</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Vendedora Encontrada</h4>
                  <p className="text-sm text-gray-600">Información completa de la vendedora</p>
                </div>
              </div>

              {/* Información Principal */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">👤</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-2xl">{vendedora.nombres}</p>
                      <p className="text-sm text-purple-600 font-medium">Nombre completo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Cargo */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">💼</span>
                  Información del Cargo
                </h5>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1 text-lg">🏷️</span>
                    <div>
                      <p className="font-medium text-gray-900 text-lg">{vendedora.nameCargo}</p>
                      <p className="text-sm text-blue-600">Cargo asignado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identificación */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-gray-600">🆔</span>
                  Identificación
                </h5>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center bg-white rounded-lg p-4 border">
                    <p className="text-sm text-gray-600 mb-2">Documento de Identidad</p>
                    <p className="font-bold text-purple-600 text-3xl">{vendedora.documento}</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">👤</div>
                <p className="text-lg">Busca una vendedora por documento</p>
                <p className="text-sm">Ingresa el número de documento para ver los detalles</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6 col-span-1 px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Step 4
            </h1>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Asignación de fechas</span>
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Selecciona el año, mes y días para la asignación del turno en el punto de venta: {store?.nombre}
            </p>
          </div>

          {/* Year and Month Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Año</Label>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar año" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(5)].map((_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Mes</Label>
              <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar mes" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                  ].map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][selectedMonth]} {selectedYear}
              </h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedMonth === 0) {
                      setSelectedMonth(11);
                      setSelectedYear(selectedYear - 1);
                    } else {
                      setSelectedMonth(selectedMonth - 1);
                    }
                  }}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (selectedMonth === 11) {
                      setSelectedMonth(0);
                      setSelectedYear(selectedYear + 1);
                    } else {
                      setSelectedMonth(selectedMonth + 1);
                    }
                  }}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {[...Array(getFirstDayOfMonth(selectedYear, selectedMonth))].map((_, index) => (
                <div key={`empty-${index}`} className="p-2 h-10"></div>
              ))}
              
              {/* Days of the month */}
              {[...Array(getDaysInMonth(selectedYear, selectedMonth))].map((_, index) => {
                const day = index + 1;
                const isSelected = selectedDates.has(day);
                const isValid = isValidAssignmentDate(day);
                
                return (
                  <button
                    key={day}
                    onClick={() => isValid && toggleDate(day)}
                    disabled={!isValid}
                    className={`
                      p-2 h-10 text-sm rounded-md transition-all duration-200 font-medium
                      ${isValid 
                        ? `cursor-pointer hover:bg-blue-100 ${
                            isSelected 
                              ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300' 
                              : 'bg-white hover:shadow-md border border-gray-200'
                          }`
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {day}
                    {isSelected && (
                      <CheckCircle2 className="w-3 h-3 mx-auto mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected dates summary */}
          {selectedDates.size > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-green-800 mb-1">
                    Fechas seleccionadas ({selectedDates.size})
                  </h5>
                  <p className="text-sm text-green-600">
                    {Array.from(selectedDates).sort((a, b) => a - b).join(', ')} de {
                      ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][selectedMonth]
                    } {selectedYear}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelectedDates}
                  className="text-green-700 border-green-300 hover:bg-green-100"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          )}

          {/* Assignment Summary */}
          {store && vendedora && selectedShift && selectedDates.size > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <h5 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Resumen de asignación
              </h5>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Punto de venta:</span>
                  <span className="font-medium text-gray-900">{store.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendedora:</span>
                  <span className="font-medium text-gray-900">{vendedora.nombres} ({vendedoraDocument})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Turno:</span>
                  <span className="font-medium text-gray-900">
                    {shifts.find(s => s.id === selectedShift)?.nameTurno}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fechas:</span>
                  <span className="font-medium text-gray-900">{selectedDates.size} días</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-purple-200">
                <Button 
                  onClick={confirmAssignment}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Confirmar asignación
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

