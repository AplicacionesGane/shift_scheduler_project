# 📋 Sistema de Programación de Turnos y Horas Extras

## 🎯 Objetivo General

Desarrollar un **sistema integral** para la gestión automatizada de turnos, control de horas laborales y generación de reportes para cajeros comerciales y empleados de diferentes puntos de venta.

---

## 🎯 Objetivos Específicos

### 🔄 1. Gestión de Turnos
- ✅ Programar turnos mensuales considerando calendario de domingos y festivos
- ✅ Configurar múltiples turnos por punto de venta con horarios flexibles
- ✅ Asignar personal automáticamente con rotación semanal secuencial
- ✅ Gestionar cambios de turnos manteniendo orden establecido

### ⏰ 2. Control de Horarios y Horas
- 📊 Calcular horas trabajadas, extras diurnas, nocturnas y festivas
- 💰 Computar recargos diurnos y nocturnos
- 📅 Configurar días de "hora menos" con opciones de hora extra
- 📈 Establecer fechas de corte para generación de reportes

### 📝 3. Gestión de Novedades
- 🆔 Registrar permisos con números de incidente
- 🏥 Documentar incapacidades con seguimiento
- ❌ Incluir ausencias y otras novedades
- 🚨 Generar alertas por inasistencias o llegadas tardías

### 📊 4. Reportería y Alertas
- 👤 Generar reportes individuales por empleado/cajero
- 💵 Crear reportes de costos por punto y empleado
- 🔗 Integrar con sistema BNET para control de ingreso/salida
- ⚠️ Alertar sobre exceso de domingos laborados (>2/mes)

### ⚙️ 5. Configuración y Administración
- 💲 Configurar valores monetarios de extras y recargos
- 🗃️ Administrar base de datos de cajeros y sucursales
- 📋 Establecer parámetros de turnos por punto
- 📅 Gestionar calendario de festivos por ubicación

---

## 🏗️ Módulos Principales Identificados

| Módulo | Funcionalidades |
|--------|----------------|
| **⚙️ Configuración** | • Gestión de turnos y horarios<br>• Configuración de valores monetarios<br>• Administración de calendarios |
| **📅 Programación** | • Asignación automática de turnos<br>• Rotación de personal<br>• Gestión de cambios |
| **🎮 Control** | • Registro de horas trabajadas<br>• Cálculo de extras y recargos<br>• Integración con BNET |
| **📋 Novedades** | • Permisos e incapacidades<br>• Ausencias y alertas<br>• Seguimiento de incidentes |
| **📊 Reportes** | • Reportes individuales y grupales<br>• Análisis de costos<br>• Dashboards de seguimiento |

---

## 👥 Actores del Sistema

| Actor | Rol |
|-------|-----|
| **🔑 Administradores** | Configuración general del sistema |
| **👨‍💼 Supervisores** | Gestión de turnos y novedades |
| **👤 Cajeros/Empleados** | Consulta de horarios asignados |
| **🖥️ Sistema BNET** | Integración automática de datos |

---

## 🔧 Consideraciones Técnicas

> **Aspectos clave para el desarrollo:**

- 🔗 **Integración** con sistema BNET existente
- 🏢 **Manejo** de múltiples puntos de venta
- ⚖️ **Cálculos automatizados** de legislación laboral
- 🚨 **Generación de alertas** en tiempo real
- 📈 **Reportería** con estándares de calidad establecidos

---

## 📋 Estado del Proyecto

> **Fase actual:** Análisis de requerimientos
> 
> **Próximo paso:** Diseño de arquitectura y casos de uso

---
