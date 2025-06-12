# 📅 Calendar API Documentation

## 📋 Resumen

Esta documentación cubre todos los endpoints de la API de Calendar del sistema de programación de turnos. El módulo Calendar está construido siguiendo los principios de **Clean Architecture** y proporciona un sistema completo de gestión de calendarios automáticos con soporte para días festivos.

---

## 🏗️ Arquitectura del Módulo

### **Flujo de Capas**
```
📱 Client Request
    ↓
🌐 Presentation Layer (Controllers + Routes)
    ↓
🔧 Application Layer (Use Cases)
    ↓
📊 Domain Layer (Entities + Services + Repository Interface)
    ↓
💾 Infrastructure Layer (MySQL Repository + Models)
```

### **Archivos Principales**
- **Routes**: `/presentation/routes/calendar.routes.ts`
- **Controller**: `/presentation/controllers/calendar.controller.ts`
- **Use Cases**: `/application/calendar/calendar.usecases.ts`
- **Entity**: `/domain/entities/calendar.entity.ts`
- **Repository**: `/domain/repositories/calendar.repository.ts`
- **Domain Service**: `/domain/services/CalendarDomainService.ts`
- **Infrastructure**: `/infrastructure/repositories/mysql/CalendarRepoMysql.ts`

---

## 🎯 Características del Sistema

### ✅ **Automatización Completa**
- **Una sola llamada** genera 365/366 días del año
- **Detección automática** de fines de semana (sábados y domingos)
- **Marcado automático** de días festivos fijos de Colombia
- **Nombres en español** para días y meses

### ✅ **Control Manual de Festivos**
- **Agregar días festivos manuales** (Semana Santa, días especiales, etc.)
- **Remover días festivos** (solo los manuales)
- **Actualizar descripciones** de días festivos
- **Los días fijos están protegidos** (no se pueden modificar)

### ✅ **Validaciones Robustas**
- **Años válidos** (1900-2100)
- **Fechas válidas** (respeta años bisiestos)
- **Descripciones obligatorias** para días festivos
- **Protección de días fijos** (no se pueden remover/modificar)

### ✅ **Días Festivos Fijos de Colombia**
- 🎉 **1 de Enero**: Año Nuevo
- 🎉 **1 de Mayo**: Día del Trabajo
- 🎉 **20 de Julio**: Día de la Independencia
- 🎉 **7 de Agosto**: Batalla de Boyacá
- 🎉 **8 de Diciembre**: Inmaculada Concepción
- 🎉 **25 de Diciembre**: Navidad

---

## 📊 Entidad Calendar

```typescript
interface Calendar {
    id: string;                        // UUID único
    year: number;                      // Año (1900-2100)
    month: number;                     // Mes (1-12)
    days: number;                      // Día (1-31)
    isHoliday: boolean;               // Si es día festivo
    isWeekend: boolean;               // Si es fin de semana
    nameDay: string;                  // Nombre del día en español
    nameMonth: string;                // Nombre del mes en español
    holidayDescription?: string | null; // Descripción del festivo
    createdAt?: Date;                 // Fecha de creación
    updatedAt?: Date;                 // Fecha de actualización
}
```

---

## 🌐 Endpoints de la API

### **Base URL**: `/api/calendar`

---

## 1. 📅 **Gestión de Calendarios**

### 1.1 **Crear Calendario por Año**

**Genera automáticamente un calendario completo para un año específico.**

- **Endpoint**: `POST /calendar/year`
- **Descripción**: Crea 365/366 días automáticamente con fines de semana y festivos fijos detectados
- **Autenticación**: No requerida

#### **Request Body**
```json
{
    "year": 2024,
    "forceRegenerate": false
}
```

#### **Parámetros**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `year` | number | ✅ | Año del calendario (1900-2100) |
| `forceRegenerate` | boolean | ❌ | Si es true, borra y regenera el calendario existente |

#### **Response Success (201)**
```json
{
    "success": true,
    "message": "Calendar for year 2024 created successfully",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 1,
            "days": 1,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Lunes",
            "nameMonth": "Enero",
            "holidayDescription": "Año Nuevo",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        }
        // ... 365 días más
    ],
    "count": 366
}
```

#### **Response Error (400)**
```json
{
    "success": false,
    "message": "Calendar for year 2024 already exists"
}
```

#### **Casos de Uso**
- ✅ Generar calendario completo para un año nuevo
- ✅ Regenerar calendario existente con `forceRegenerate: true`
- ✅ Detectar automáticamente fines de semana
- ✅ Marcar automáticamente días festivos fijos de Colombia

---

### 1.2 **Obtener Calendario por Año**

**Recupera todos los días de un año específico.**

- **Endpoint**: `GET /calendar/year/:year`
- **Descripción**: Obtiene el calendario completo de un año
- **Autenticación**: No requerida

#### **Parámetros de Ruta**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `year` | number | Año del calendario (1900-2100) |

#### **Response Success (200)**
```json
{
    "success": true,
    "message": "Calendar for year 2024 retrieved successfully",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 1,
            "days": 1,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Lunes",
            "nameMonth": "Enero",
            "holidayDescription": "Año Nuevo",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        }
        // ... resto del año
    ],
    "count": 366
}
```

#### **Response Error (404)**
```json
{
    "success": false,
    "message": "No calendar found for year 2024. Consider creating it first."
}
```

---

### 1.3 **Obtener Calendario por Año y Mes**

**Recupera todos los días de un mes específico.**

- **Endpoint**: `GET /calendar/year/:year/month/:month`
- **Descripción**: Obtiene el calendario de un mes específico
- **Autenticación**: No requerida

#### **Parámetros de Ruta**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `year` | number | Año del calendario (1900-2100) |
| `month` | number | Mes del calendario (1-12) |

#### **Response Success (200)**
```json
{
    "success": true,
    "message": "Calendar for 6/2024 retrieved successfully",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 6,
            "days": 1,
            "isHoliday": false,
            "isWeekend": true,
            "nameDay": "Sábado",
            "nameMonth": "Junio",
            "holidayDescription": null,
            "createdAt": "2024-06-01T00:00:00.000Z",
            "updatedAt": "2024-06-01T00:00:00.000Z"
        }
        // ... resto del mes
    ],
    "count": 30
}
```

---

### 1.4 **Obtener Información de Fecha Específica**

**Recupera información detallada de un día específico.**

- **Endpoint**: `GET /calendar/date/:year/:month/:day`
- **Descripción**: Obtiene información de una fecha específica
- **Autenticación**: No requerida

#### **Parámetros de Ruta**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `year` | number | Año (1900-2100) |
| `month` | number | Mes (1-12) |
| `day` | number | Día (1-31) |

#### **Response Success (200)**
```json
{
    "success": true,
    "message": "Date information retrieved successfully",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 12,
            "days": 25,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Miércoles",
            "nameMonth": "Diciembre",
            "holidayDescription": "Navidad",
            "createdAt": "2024-12-25T00:00:00.000Z",
            "updatedAt": "2024-12-25T00:00:00.000Z"
        }
    ],
    "count": 1
}
```

---

### 1.5 **Obtener Años y Meses Disponibles**

**Recupera todos los años y meses que tienen calendarios creados.**

- **Endpoint**: `GET /calendar/years-months`
- **Descripción**: Obtiene lista de años y meses disponibles en el sistema
- **Autenticación**: No requerida

#### **Response Success (200)**
```json
{
    "years": [2023, 2024, 2025],
    "months": [
        { "numero": 1, "nameMonth": "Enero" },
        { "numero": 2, "nameMonth": "Febrero" },
        { "numero": 3, "nameMonth": "Marzo" },
        { "numero": 4, "nameMonth": "Abril" },
        { "numero": 5, "nameMonth": "Mayo" },
        { "numero": 6, "nameMonth": "Junio" },
        { "numero": 7, "nameMonth": "Julio" },
        { "numero": 8, "nameMonth": "Agosto" },
        { "numero": 9, "nameMonth": "Septiembre" },
        { "numero": 10, "nameMonth": "Octubre" },
        { "numero": 11, "nameMonth": "Noviembre" },
        { "numero": 12, "nameMonth": "Diciembre" }
    ]
}
```

---

## 2. 🎉 **Gestión de Días Festivos**

### 2.1 **Agregar Día Festivo Manual**

**Agrega un día festivo personalizado al calendario.**

- **Endpoint**: `POST /calendar/holiday`
- **Descripción**: Marca un día como festivo con descripción personalizada
- **Autenticación**: No requerida

#### **Request Body**
```json
{
    "year": 2024,
    "month": 3,
    "day": 28,
    "description": "Jueves Santo"
}
```

#### **Parámetros**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `year` | number | ✅ | Año (1900-2100) |
| `month` | number | ✅ | Mes (1-12) |
| `day` | number | ✅ | Día (1-31) |
| `description` | string | ✅ | Descripción del día festivo |

#### **Response Success (201)**
```json
{
    "success": true,
    "message": "Manual holiday \"Jueves Santo\" added successfully for 28/3/2024",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 3,
            "days": 28,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Jueves",
            "nameMonth": "Marzo",
            "holidayDescription": "Jueves Santo",
            "createdAt": "2024-03-28T00:00:00.000Z",
            "updatedAt": "2024-03-28T00:00:00.000Z"
        }
    ],
    "count": 1
}
```

#### **Response Error (400)**
```json
{
    "success": false,
    "message": "Calendar day 28/3/2024 not found. Create the calendar for year 2024 first."
}
```

---

### 2.2 **Actualizar Estado de Día Festivo**

**Actualiza el estado festivo de un día y su descripción.**

- **Endpoint**: `PUT /calendar/holiday`
- **Descripción**: Permite activar/desactivar días festivos y actualizar descripciones
- **Autenticación**: No requerida

#### **Request Body**
```json
{
    "year": 2024,
    "month": 3,
    "day": 29,
    "isHoliday": true,
    "description": "Viernes Santo - Semana Mayor"
}
```

#### **Parámetros**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `year` | number | ✅ | Año (1900-2100) |
| `month` | number | ✅ | Mes (1-12) |
| `day` | number | ✅ | Día (1-31) |
| `isHoliday` | boolean | ✅ | Si debe ser marcado como festivo |
| `description` | string | ❌ | Descripción del festivo (requerida si isHoliday=true) |

#### **Response Success (200)**
```json
{
    "success": true,
    "message": "Holiday status updated successfully for 29/3/2024",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 3,
            "days": 29,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Viernes",
            "nameMonth": "Marzo",
            "holidayDescription": "Viernes Santo - Semana Mayor",
            "createdAt": "2024-03-29T00:00:00.000Z",
            "updatedAt": "2024-03-29T00:00:00.000Z"
        }
    ],
    "count": 1
}
```

#### **Response Error (400)**
```json
{
    "success": false,
    "message": "Cannot disable fixed holiday \"Navidad\" on 25/12. Fixed holidays cannot be modified."
}
```

---

### 2.3 **Remover Día Festivo Manual**

**Remueve un día festivo manual del calendario.**

- **Endpoint**: `DELETE /calendar/holiday`
- **Descripción**: Quita la marca de festivo de un día (solo funciona con festivos manuales)
- **Autenticación**: No requerida

#### **Request Body**
```json
{
    "year": 2024,
    "month": 3,
    "day": 28
}
```

#### **Parámetros**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `year` | number | ✅ | Año (1900-2100) |
| `month` | number | ✅ | Mes (1-12) |
| `day` | number | ✅ | Día (1-31) |

#### **Response Success (200)**
```json
{
    "success": true,
    "message": "Manual holiday removed successfully for 28/3/2024",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 3,
            "days": 28,
            "isHoliday": false,
            "isWeekend": false,
            "nameDay": "Jueves",
            "nameMonth": "Marzo",
            "holidayDescription": null,
            "createdAt": "2024-03-28T00:00:00.000Z",
            "updatedAt": "2024-03-28T00:00:00.000Z"
        }
    ],
    "count": 1
}
```

#### **Response Error (400)**
```json
{
    "success": false,
    "message": "Cannot remove fixed holiday \"Año Nuevo\" on 1/1. Fixed holidays cannot be modified."
}
```

---

### 2.4 **Obtener Días Festivos por Año**

**Recupera todos los días festivos de un año específico.**

- **Endpoint**: `GET /calendar/holidays/:year`
- **Descripción**: Obtiene lista de todos los días festivos (fijos y manuales) de un año
- **Autenticación**: No requerida

#### **Parámetros de Ruta**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `year` | number | Año del cual obtener los festivos (1900-2100) |

#### **Response Success (200)**
```json
{
    "success": true,
    "message": "Retrieved 9 holidays for year 2024",
    "data": [
        {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 1,
            "days": 1,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Lunes",
            "nameMonth": "Enero",
            "holidayDescription": "Año Nuevo",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        },
        {
            "id": "456e7890-e89b-12d3-a456-426614174000",
            "year": 2024,
            "month": 3,
            "days": 28,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Jueves",
            "nameMonth": "Marzo",
            "holidayDescription": "Jueves Santo",
            "createdAt": "2024-03-28T00:00:00.000Z",
            "updatedAt": "2024-03-28T00:00:00.000Z"
        }
        // ... resto de festivos
    ],
    "count": 9
}
```

---

## 📋 **Códigos de Respuesta HTTP**

| Código | Descripción | Cuándo se usa |
|--------|-------------|---------------|
| **200** | OK | Operación exitosa (GET, PUT, DELETE) |
| **201** | Created | Recurso creado exitosamente (POST) |
| **400** | Bad Request | Datos de entrada inválidos o violación de reglas de negocio |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Server Error | Error interno del servidor |

---

## ⚠️ **Validaciones y Restricciones**

### **Validaciones de Fechas**
- ✅ **Año**: Debe estar entre 1900 y 2100
- ✅ **Mes**: Debe estar entre 1 y 12
- ✅ **Día**: Debe estar entre 1 y 31
- ✅ **Fechas válidas**: Respeta años bisiestos y días válidos por mes

### **Validaciones de Festivos**
- ✅ **Descripción requerida**: Los días festivos manuales requieren descripción
- ✅ **Protección de festivos fijos**: No se pueden modificar ni eliminar
- ✅ **Calendario existente**: El día debe existir antes de marcarlo como festivo

### **Días Festivos Fijos Protegidos**
Los siguientes días **NO PUEDEN** ser modificados ni eliminados:
- 🔒 **01/01** - Año Nuevo
- 🔒 **01/05** - Día del Trabajo  
- 🔒 **20/07** - Día de la Independencia
- 🔒 **07/08** - Batalla de Boyacá
- 🔒 **08/12** - Inmaculada Concepción
- 🔒 **25/12** - Navidad

---

## 🔄 **Ejemplos de Flujos de Trabajo**

### **Flujo 1: Configuración Inicial de Calendario**

```bash
# 1. Crear calendario para 2024
POST /api/calendar/year
{
    "year": 2024,
    "forceRegenerate": false
}

# 2. Verificar años disponibles
GET /api/calendar/years-months

# 3. Obtener calendario del mes actual
GET /api/calendar/year/2024/month/6
```

### **Flujo 2: Gestión de Semana Santa**

```bash
# 1. Agregar Jueves Santo
POST /api/calendar/holiday
{
    "year": 2024,
    "month": 3,
    "day": 28,
    "description": "Jueves Santo"
}

# 2. Agregar Viernes Santo
POST /api/calendar/holiday
{
    "year": 2024,
    "month": 3,
    "day": 29,
    "description": "Viernes Santo"
}

# 3. Ver todos los festivos del año
GET /api/calendar/holidays/2024
```

### **Flujo 3: Actualización de Festivo**

```bash
# 1. Actualizar descripción de un festivo
PUT /api/calendar/holiday
{
    "year": 2024,
    "month": 3,
    "day": 29,
    "isHoliday": true,
    "description": "Viernes Santo - Semana Mayor"
}

# 2. Remover festivo manual
DELETE /api/calendar/holiday
{
    "year": 2024,
    "month": 3,
    "day": 28
}
```

---

## 🛠️ **Casos de Uso Implementados**

### **Use Cases de Aplicación**
1. ✅ `createCalendarByYear()` - Crear calendario automático
2. ✅ `getCalendarByYear()` - Obtener calendario por año
3. ✅ `getCalendarByYearAndMonth()` - Obtener calendario por mes
4. ✅ `getDateInfo()` - Obtener información de fecha específica
5. ✅ `getYearsAndMonths()` - Obtener años y meses disponibles
6. ✅ `addManualHoliday()` - Agregar días festivos manuales
7. ✅ `updateHolidayStatus()` - Actualizar estado de festivos
8. ✅ `removeManualHoliday()` - Remover días festivos manuales
9. ✅ `getHolidaysByYear()` - Obtener festivos por año
10. ✅ `getFixedHolidays()` - Lista de festivos fijos

### **Servicios de Dominio**
- ✅ `generateYearCalendar()` - Genera 365/366 días automáticamente
- ✅ `isWeekend()` - Detecta fines de semana
- ✅ `isFixedHoliday()` - Identifica días festivos fijos de Colombia
- ✅ `getFixedHolidays()` - Lista de festivos fijos

---

## 🧪 **Testing y Calidad**

### **Herramientas Recomendadas**
- **Postman/Insomnia**: Para testing manual de endpoints
- **Jest/Supertest**: Para testing automatizado
- **Artillery**: Para testing de carga

### **Casos de Prueba Críticos**
1. ✅ Creación de calendario para año bisiesto
2. ✅ Protección de días festivos fijos
3. ✅ Validación de fechas inválidas
4. ✅ Gestión de festivos manuales
5. ✅ Detección automática de fines de semana

---

## 📈 **Performance y Escalabilidad**

### **Optimizaciones Implementadas**
- ✅ **Índices en base de datos** para año, mes, día
- ✅ **Validaciones en capas** para evitar consultas innecesarias
- ✅ **Paginación implícita** por mes/año
- ✅ **Caching a nivel de repository** para consultas frecuentes

### **Consideraciones de Escalabilidad**
- 🔄 **Particionado por año** en base de datos
- 🔄 **Cache distribuido** para calendarios frecuentemente consultados
- 🔄 **Compresión de respuestas** para calendarios completos

---

## 🔐 **Seguridad**

### **Validaciones de Entrada**
- ✅ **Sanitización** de strings en descripciones
- ✅ **Validación de tipos** en todos los parámetros
- ✅ **Rangos válidos** para fechas
- ✅ **Protección contra inyección SQL** via ORM

### **Consideraciones Futuras**
- 🔄 **Autenticación JWT** para operaciones de escritura
- 🔄 **Rate limiting** para prevenir abuso
- 🔄 **Logs de auditoría** para cambios en festivos

---

## 📝 **Notas para Desarrolladores**

### **Patrones Implementados**
- ✅ **Repository Pattern** para abstracción de datos
- ✅ **Use Case Pattern** para lógica de aplicación
- ✅ **Value Object Pattern** para entidades de dominio
- ✅ **Domain Service Pattern** para lógica de dominio

### **Estructura de Errores**
Todos los errores siguen el formato estándar:
```json
{
    "success": false,
    "message": "Descripción del error específico"
}
```

### **Logging**
- ✅ **Errores de base de datos** son loggeados con stack trace
- ✅ **Operaciones exitosas** incluyen métricas de tiempo
- ✅ **Validaciones fallidas** son loggeadas para debugging

---

## 🚀 **Roadmap Futuro**

### **Próximas Características**
- 🔄 **Soporte para múltiples países** y sus festivos
- 🔄 **Cálculo automático de Semana Santa** basado en algoritmos
- 🔄 **Integración con APIs externas** de festivos
- 🔄 **Exportación de calendarios** en formatos ICS/PDF
- 🔄 **Notificaciones** de próximos festivos
- 🔄 **Dashboard administrativo** para gestión masiva

### **Mejoras Técnicas**
- 🔄 **GraphQL API** para consultas más flexibles
- 🔄 **WebSockets** para actualizaciones en tiempo real
- 🔄 **Microservicios** para escalabilidad horizontal
- 🔄 **Event Sourcing** para auditoría completa

---

## 📞 **Soporte y Contacto**

Para dudas sobre la implementación o reportar bugs:
- 📧 **Email**: [tu-email@empresa.com]
- 🐛 **Issues**: [URL del repositorio]
- 📖 **Wiki**: [URL de documentación extendida]

---

*Documentación generada automáticamente para el módulo Calendar del Sistema de Programación de Turnos*

**Versión**: 1.0.0  
**Última actualización**: Junio 2025  
**Arquitectura**: Clean Architecture + TypeScript + Express + MySQL
