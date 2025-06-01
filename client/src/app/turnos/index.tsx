import { API_SERVER_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Clock, Calendar } from "lucide-react";

interface Shift {
  id: string;
  nameTurno: string;
  startTime: string;
  endTime: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ShiftFormData {
  id?: string; // Para editar, opcional
  nameTurno: string;
  startTime: string;
  endTime: string;
  description: string;
}

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState<ShiftFormData>({
    id: "",
    nameTurno: "",
    startTime: "",
    endTime: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<ShiftFormData>>({});

  // Cargar turnos
  const fetchShifts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_SERVER_URL}/shifts`);
      setShifts(response.data);
    } catch (error) {
      console.error("Error al cargar los turnos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  // Validar formulario
  const validateForm = (): boolean => {
    const errors: Partial<ShiftFormData> = {};

    if (!formData.nameTurno.trim()) {
      errors.nameTurno = "El nombre del turno es requerido";
    }
    if (!formData.startTime) {
      errors.startTime = "La hora de inicio es requerida";
    }
    if (!formData.endTime) {
      errors.endTime = "La hora de fin es requerida";
    }
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      errors.endTime = "La hora de fin debe ser posterior a la de inicio";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      nameTurno: "",
      startTime: "",
      endTime: "",
      description: "",
    });
    setFormErrors({});
    setEditingShift(null);
  };

  // Abrir modal para crear
  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  // Abrir modal para editar
  const openEditDialog = (shift: Shift) => {
    setFormData({
      nameTurno: shift.nameTurno,
      startTime: shift.startTime,
      endTime: shift.endTime,
      description: shift.description || "",
    });
    setEditingShift(shift);
    setFormErrors({});
    setDialogOpen(true);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editingShift) {
        // Actualizar turno existente
        await axios.put(`${API_SERVER_URL}/shifts`, { ...formData, id: editingShift.id });
      } else {
        // Crear nuevo turno
        await axios.post(`${API_SERVER_URL}/shifts`, formData);
      }
      
      await fetchShifts();
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error al guardar el turno:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar turno
  const handleDelete = async (shiftId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_SERVER_URL}/shifts/${shiftId}`);
      await fetchShifts();
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
    } finally {
      setLoading(false);
    }
  };

  // Formatear hora
  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calcular duración del turno
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return `${diffHours}h`;
  };

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
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nameTurno">Nombre del Turno</Label>
                  <Input
                    id="nameTurno"
                    value={formData.nameTurno}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameTurno: e.target.value }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción del turno..."
                  />
                </div>
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : editingShift ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Turnos</p>
                <p className="text-2xl font-bold text-gray-900">{shifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Turnos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{shifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Badge className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Promedio Horas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.length > 0 
                    ? Math.round(shifts.reduce((acc, shift) => {
                        const start = new Date(`2000-01-01T${shift.startTime}`);
                        const end = new Date(`2000-01-01T${shift.endTime}`);
                        return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                      }, 0) / shifts.length) + "h"
                    : "0h"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de turnos */}
      {loading && shifts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">Cargando turnos...</div>
          </CardContent>
        </Card>
      ) : shifts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay turnos</h3>
            <p className="text-gray-500 mb-4">Comienza creando tu primer turno de trabajo</p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Primer Turno
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shifts.map((shift) => (
            <Card key={shift.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{shift.nameTurno}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {calculateDuration(shift.startTime, shift.endTime)}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(shift)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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
                            onClick={() => handleDelete(shift.id)}
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Inicio:</span>
                    <span className="font-medium">{formatTime(shift.startTime)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Fin:</span>
                    <span className="font-medium">{formatTime(shift.endTime)}</span>
                  </div>
                  
                  {shift.description && (
                    <>
                      <Separator />
                      <div className="text-sm text-gray-600">
                        {shift.description}
                      </div>
                    </>
                  )}
                  
                  <Separator />
                  <div className="text-xs text-gray-400">
                    Creado: {new Date(shift.createdAt).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}