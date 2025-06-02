# Sistema de Calendario Automático

## 📋 Resumen

He implementado un sistema completo de **gestión de calendarios automáticos** en el dominio de tu aplicación. El sistema está diseñado para:

1. ✅ **Generar automáticamente calendarios por año** con solo pasar el parámetro `year`
2. ✅ **Detectar automáticamente fines de semana** (sábados y domingos)
3. ✅ **Marcar automáticamente días festivos fijos de Colombia** con sus descripciones
4. ✅ **Permitir agregar días festivos manuales** (como Semana Santa, días especiales de la empresa, etc.)
5. ✅ **Control total para el cliente** sobre días festivos variables
6. ✅ **Validaciones robustas** y manejo de errores

---

## 🏗️ Arquitectura Implementada

### **Capa de Dominio**

#### 1. **Entidad Calendar** (`calendar.entity.ts`)
```typescript
export interface Calendar {
    id: string;
    year: number;
    month: number;
    days: number;
    isHoliday: boolean;
    isWeekend: boolean;
    nameDay: string;
    nameMonth: string;
    holidayDescription?: string | null; // 🆕 Descripción del festivo
    createdAt?: Date | null;
    updatedAt?: Date | null;
}
```

#### 2. **Value Object** (`calendar.value.ts`)
- ✅ Validaciones automáticas de fechas
- ✅ Cálculo automático de nombres de días y meses en español
- ✅ Soporte para descripciones de días festivos

#### 3. **Servicio de Dominio** (`CalendarDomainService.ts`)
- ✅ `generateYearCalendar(year)`: Genera 365/366 días automáticamente
- ✅ `isWeekend()`: Detecta fines de semana automáticamente
- ✅ `isFixedHoliday()`: Maneja días festivos fijos de Colombia
- ✅ **Días festivos fijos incluidos**:
  - 🎉 **1 de Enero**: Año Nuevo
  - 🎉 **1 de Mayo**: Día del Trabajo
  - 🎉 **20 de Julio**: Día de la Independencia
  - 🎉 **7 de Agosto**: Batalla de Boyacá
  - 🎉 **8 de Diciembre**: Inmaculada Concepción
  - 🎉 **25 de Diciembre**: Navidad

#### 4. **Repository Interface** (`calendar.repository.ts`)
- ✅ Operaciones CRUD completas
- ✅ Métodos para manejo manual de holidays
- ✅ Búsquedas por año, mes, día específico

### **Capa de Aplicación**

#### 5. **Casos de Uso** (`calendar.usecases.ts`)
- ✅ `createCalendarByYear()`: Crear calendario automático
- ✅ `addManualHoliday()`: Agregar días festivos manuales
- ✅ `removeManualHoliday()`: Remover días festivos (solo manuales)
- ✅ `updateHolidayStatus()`: Actualizar estado de festivos
- ✅ `getHolidaysByYear()`: Obtener todos los festivos de un año
- ✅ `getFixedHolidays()`: Lista de festivos fijos de Colombia

---

## 🚀 Cómo Usar el Sistema

### **1. Crear Calendario Automático**
```typescript
const calendarUseCases = new CalendarUseCases(calendarRepository);

// Crear calendario completo para 2024 automáticamente
const result = await calendarUseCases.createCalendarByYear({
    year: 2024,
    forceRegenerate: false // Si ya existe, no lo recrea
});

// Resultado: 365 días creados automáticamente con:
// - Fines de semana detectados ✅
// - Días festivos fijos marcados ✅
// - Nombres en español ✅
// - Descripciones de festivos ✅
```

### **2. Agregar Días Festivos Manuales**
```typescript
// Ejemplo: Agregar Semana Santa manualmente
const manualHolidays = [
    { year: 2024, month: 3, day: 28, description: 'Jueves Santo' },
    { year: 2024, month: 3, day: 29, description: 'Viernes Santo' },
    { year: 2024, month: 3, day: 31, description: 'Domingo de Resurrección' }
];

for (const holiday of manualHolidays) {
    await calendarUseCases.addManualHoliday(holiday);
}
```

### **3. Gestionar Días Festivos**
```typescript
// Obtener todos los festivos de un año
const holidays = await calendarUseCases.getHolidaysByYear(2024);

// Remover un festivo manual (los fijos NO se pueden remover)
await calendarUseCases.removeManualHoliday(2024, 3, 28);

// Actualizar descripción de un festivo
await calendarUseCases.updateHolidayStatus({
    year: 2024,
    month: 3,
    day: 29,
    isHoliday: true,
    description: 'Viernes Santo - Semana Mayor'
});
```

---

## 🎯 Características Principales

### **✅ Automatización Completa**
- **Una sola llamada** genera 365/366 días del año
- **Detección automática** de fines de semana
- **Marcado automático** de días festivos fijos de Colombia
- **Nombres en español** para días y meses

### **✅ Control del Cliente**
- **Agregar días festivos manuales** (Semana Santa, días especiales, etc.)
- **Remover días festivos** (solo los manuales)
- **Actualizar descripciones** de días festivos
- **Los días fijos están protegidos** (no se pueden modificar)

### **✅ Validaciones Robustas**
- **Años válidos** (1900-2100)
- **Fechas válidas** (respeta años bisiestos)
- **Descripciones obligatorias** para días festivos
- **Protección de días fijos** (no se pueden remover/modificar)

### **✅ Arquitectura Limpia**
- **Separación de responsabilidades**
- **Domain Services** para lógica de negocio
- **Value Objects** con validaciones
- **Use Cases** para orquestación
- **Repository Pattern** para persistencia

---

## 📊 Ejemplo de Resultado

Al ejecutar `createCalendarByYear({ year: 2024 })`, obtienes automáticamente:

```
📅 Calendario 2024 (366 días - año bisiesto)
├── 🏖️ 104 fines de semana detectados automáticamente
├── 🎉 6 días festivos fijos de Colombia:
│   ├── 01/01/2024 - Año Nuevo
│   ├── 01/05/2024 - Día del Trabajo
│   ├── 20/07/2024 - Día de la Independencia
│   ├── 07/08/2024 - Batalla de Boyacá
│   ├── 08/12/2024 - Inmaculada Concepción
│   └── 25/12/2024 - Navidad
└── 📝 + Los días festivos manuales que agregues
```

---

## 🔧 Próximos Pasos

Para completar la implementación necesitarías:

1. **🏗️ Implementar la capa de infraestructura**:
   - Repository MySQL para Calendar
   - Modelo de base de datos
   - Migraciones

2. **🌐 Crear la capa de presentación**:
   - Controladores para Calendar
   - Rutas API
   - Validaciones de entrada

3. **🧪 Agregar tests**:
   - Tests unitarios para dominio
   - Tests de integración
   - Tests de casos de uso

¿Te gustaría que implemente alguna de estas capas o necesitas ayuda con algún aspecto específico del sistema?
