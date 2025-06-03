# 🧪 Calendar API - Examples & Testing Guide

## 📋 Tabla de Contenidos
1. [Configuración de Testing](#configuración-de-testing)
2. [Ejemplos de Requests Completos](#ejemplos-de-requests-completos)
3. [Casos de Prueba por Endpoint](#casos-de-prueba-por-endpoint)
4. [Colección de Postman](#colección-de-postman)
5. [Scripts de Testing Automatizado](#scripts-de-testing-automatizado)

---

## 🔧 Configuración de Testing

### **Variables de Entorno**
```bash
# Servidor local
BASE_URL=http://localhost:3000/api
PORT=3000

# Servidor de desarrollo  
DEV_BASE_URL=https://dev-api.tu-empresa.com/api

# Servidor de producción
PROD_BASE_URL=https://api.tu-empresa.com/api
```

### **Headers Comunes**
```json
{
    "Content-Type": "application/json",
    "Accept": "application/json"
}
```

---

## 📋 Ejemplos de Requests Completos

### **1. Crear Calendario para 2024**

```bash
curl -X POST http://localhost:3000/api/calendar/year \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "forceRegenerate": false
  }'
```

**Postman Request:**
```json
{
    "method": "POST",
    "url": "{{BASE_URL}}/calendar/year",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {
        "year": 2024,
        "forceRegenerate": false
    }
}
```

**Response Esperado:**
```json
{
    "success": true,
    "message": "Calendar for year 2024 created successfully",
    "count": 366,
    "data": [
        {
            "id": "01234567-89ab-cdef-0123-456789abcdef",
            "year": 2024,
            "month": 1,
            "days": 1,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Lunes",
            "nameMonth": "Enero",
            "holidayDescription": "Año Nuevo",
            "createdAt": "2024-01-01T05:00:00.000Z",
            "updatedAt": "2024-01-01T05:00:00.000Z"
        }
        // ... 365 días más
    ]
}
```

---

### **2. Obtener Calendario de Junio 2024**

```bash
curl -X GET http://localhost:3000/api/calendar/year/2024/month/6 \
  -H "Accept: application/json"
```

**Response Esperado:**
```json
{
    "success": true,
    "message": "Calendar for 6/2024 retrieved successfully",
    "count": 30,
    "data": [
        {
            "id": "01234567-89ab-cdef-0123-456789abcdef",
            "year": 2024,
            "month": 6,
            "days": 1,
            "isHoliday": false,
            "isWeekend": true,
            "nameDay": "Sábado",
            "nameMonth": "Junio",
            "holidayDescription": null,
            "createdAt": "2024-06-01T05:00:00.000Z",
            "updatedAt": "2024-06-01T05:00:00.000Z"
        },
        {
            "id": "01234567-89ab-cdef-0123-456789abcdef",
            "year": 2024,
            "month": 6,
            "days": 2,
            "isHoliday": false,
            "isWeekend": true,
            "nameDay": "Domingo",
            "nameMonth": "Junio",
            "holidayDescription": null,
            "createdAt": "2024-06-02T05:00:00.000Z",
            "updatedAt": "2024-06-02T05:00:00.000Z"
        }
        // ... resto de junio
    ]
}
```

---

### **3. Agregar Semana Santa 2024**

**Jueves Santo:**
```bash
curl -X POST http://localhost:3000/api/calendar/holiday \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "month": 3,
    "day": 28,
    "description": "Jueves Santo"
  }'
```

**Viernes Santo:**
```bash
curl -X POST http://localhost:3000/api/calendar/holiday \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "month": 3,
    "day": 29,
    "description": "Viernes Santo"
  }'
```

**Domingo de Resurrección:**
```bash
curl -X POST http://localhost:3000/api/calendar/holiday \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "month": 3,
    "day": 31,
    "description": "Domingo de Resurrección"
  }'
```

---

### **4. Actualizar Descripción de Festivo**

```bash
curl -X PUT http://localhost:3000/api/calendar/holiday \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "month": 3,
    "day": 29,
    "isHoliday": true,
    "description": "Viernes Santo - Semana Mayor"
  }'
```

---

### **5. Obtener Todos los Festivos de 2024**

```bash
curl -X GET http://localhost:3000/api/calendar/holidays/2024 \
  -H "Accept: application/json"
```

**Response Esperado:**
```json
{
    "success": true,
    "message": "Retrieved 9 holidays for year 2024",
    "count": 9,
    "data": [
        {
            "id": "01234567-89ab-cdef-0123-456789abcdef",
            "year": 2024,
            "month": 1,
            "days": 1,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Lunes",
            "nameMonth": "Enero",
            "holidayDescription": "Año Nuevo",
            "createdAt": "2024-01-01T05:00:00.000Z",
            "updatedAt": "2024-01-01T05:00:00.000Z"
        },
        {
            "id": "01234567-89ab-cdef-0123-456789abcdef",
            "year": 2024,
            "month": 3,
            "days": 28,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Jueves",
            "nameMonth": "Marzo",
            "holidayDescription": "Jueves Santo",
            "createdAt": "2024-03-28T05:00:00.000Z",
            "updatedAt": "2024-03-28T05:00:00.000Z"
        },
        {
            "id": "01234567-89ab-cdef-0123-456789abcdef",
            "year": 2024,
            "month": 5,
            "days": 1,
            "isHoliday": true,
            "isWeekend": false,
            "nameDay": "Miércoles",
            "nameMonth": "Mayo",
            "holidayDescription": "Día del Trabajo",
            "createdAt": "2024-05-01T05:00:00.000Z",
            "updatedAt": "2024-05-01T05:00:00.000Z"
        }
        // ... resto de festivos
    ]
}
```

---

## 🧪 Casos de Prueba por Endpoint

### **POST /calendar/year - Casos de Prueba**

#### ✅ **Caso 1: Crear calendario exitoso**
```json
{
    "input": {
        "year": 2024,
        "forceRegenerate": false
    },
    "expected_status": 201,
    "expected_response": {
        "success": true,
        "message": "Calendar for year 2024 created successfully",
        "count": 366
    }
}
```

#### ❌ **Caso 2: Año inválido**
```json
{
    "input": {
        "year": 1800,
        "forceRegenerate": false
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Year must be between 1900 and 2100"
    }
}
```

#### ❌ **Caso 3: Año ya existe**
```json
{
    "input": {
        "year": 2024,
        "forceRegenerate": false
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Calendar for year 2024 already exists"
    }
}
```

#### ✅ **Caso 4: Forzar regeneración**
```json
{
    "input": {
        "year": 2024,
        "forceRegenerate": true
    },
    "expected_status": 201,
    "expected_response": {
        "success": true,
        "message": "Calendar for year 2024 created successfully"
    }
}
```

---

### **POST /calendar/holiday - Casos de Prueba**

#### ✅ **Caso 1: Agregar festivo manual exitoso**
```json
{
    "input": {
        "year": 2024,
        "month": 3,
        "day": 28,
        "description": "Jueves Santo"
    },
    "expected_status": 201,
    "expected_response": {
        "success": true,
        "message": "Manual holiday \"Jueves Santo\" added successfully for 28/3/2024"
    }
}
```

#### ❌ **Caso 2: Fecha no existe**
```json
{
    "input": {
        "year": 2025,
        "month": 3,
        "day": 28,
        "description": "Jueves Santo"
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Calendar day 28/3/2025 not found. Create the calendar for year 2025 first."
    }
}
```

#### ❌ **Caso 3: Descripción vacía**
```json
{
    "input": {
        "year": 2024,
        "month": 3,
        "day": 28,
        "description": ""
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Description cannot be empty"
    }
}
```

#### ❌ **Caso 4: Fecha inválida**
```json
{
    "input": {
        "year": 2024,
        "month": 2,
        "day": 30,
        "description": "Día inexistente"
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Day must be between 1 and 31"
    }
}
```

---

### **DELETE /calendar/holiday - Casos de Prueba**

#### ✅ **Caso 1: Remover festivo manual exitoso**
```json
{
    "input": {
        "year": 2024,
        "month": 3,
        "day": 28
    },
    "expected_status": 200,
    "expected_response": {
        "success": true,
        "message": "Manual holiday removed successfully for 28/3/2024"
    }
}
```

#### ❌ **Caso 2: Intentar remover festivo fijo**
```json
{
    "input": {
        "year": 2024,
        "month": 1,
        "day": 1
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Cannot remove fixed holiday \"Año Nuevo\" on 1/1. Fixed holidays cannot be modified."
    }
}
```

#### ❌ **Caso 3: Día no es festivo**
```json
{
    "input": {
        "year": 2024,
        "month": 6,
        "day": 15
    },
    "expected_status": 400,
    "expected_response": {
        "success": false,
        "message": "Day 15/6/2024 is not currently marked as a holiday"
    }
}
```

---

## 📋 Colección de Postman

### **Estructura de la Colección**
```json
{
    "info": {
        "name": "Calendar API - Shift Scheduler",
        "description": "Colección completa para testing de la API de Calendar",
        "version": "1.0.0"
    },
    "variable": [
        {
            "key": "base_url",
            "value": "http://localhost:3000/api"
        },
        {
            "key": "test_year",
            "value": "2024"
        }
    ],
    "item": [
        {
            "name": "1. Calendar Management",
            "item": [
                {
                    "name": "Create Calendar 2024",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Content-Type",
                                "value": "application/json"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"year\": {{test_year}},\n    \"forceRegenerate\": false\n}"
                        },
                        "url": {
                            "raw": "{{base_url}}/calendar/year",
                            "host": ["{{base_url}}"],
                            "path": ["calendar", "year"]
                        }
                    },
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "exec": [
                                    "pm.test(\"Status code is 201\", function () {",
                                    "    pm.response.to.have.status(201);",
                                    "});",
                                    "",
                                    "pm.test(\"Response has success true\", function () {",
                                    "    var jsonData = pm.response.json();",
                                    "    pm.expect(jsonData.success).to.eql(true);",
                                    "});",
                                    "",
                                    "pm.test(\"Response has 366 days for 2024\", function () {",
                                    "    var jsonData = pm.response.json();",
                                    "    pm.expect(jsonData.count).to.eql(366);",
                                    "});"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

---

## 🤖 Scripts de Testing Automatizado

### **Jest Test Suite**

```javascript
// tests/calendar.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Calendar API', () => {
    const BASE_URL = '/api/calendar';
    const TEST_YEAR = 2024;

    describe('POST /calendar/year', () => {
        test('should create calendar for valid year', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: TEST_YEAR,
                    forceRegenerate: false
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(366); // 2024 es año bisiesto
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data[0]).toHaveProperty('id');
            expect(response.body.data[0]).toHaveProperty('year', TEST_YEAR);
        });

        test('should reject invalid year', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: 1800,
                    forceRegenerate: false
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Year must be between 1900 and 2100');
        });

        test('should reject calendar creation for existing year', async () => {
            // Crear primero
            await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: TEST_YEAR,
                    forceRegenerate: false
                });

            // Intentar crear de nuevo
            const response = await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: TEST_YEAR,
                    forceRegenerate: false
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('already exists');
        });
    });

    describe('GET /calendar/year/:year', () => {
        beforeEach(async () => {
            // Asegurar que el calendario existe
            await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: TEST_YEAR,
                    forceRegenerate: true
                });
        });

        test('should get calendar for existing year', async () => {
            const response = await request(app)
                .get(`${BASE_URL}/year/${TEST_YEAR}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(366);
            expect(response.body.data).toBeInstanceOf(Array);
        });

        test('should return 404 for non-existing year', async () => {
            const response = await request(app)
                .get(`${BASE_URL}/year/2030`)
                .expect(404);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /calendar/holiday', () => {
        beforeEach(async () => {
            // Asegurar que el calendario existe
            await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: TEST_YEAR,
                    forceRegenerate: true
                });
        });

        test('should add manual holiday', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/holiday`)
                .send({
                    year: TEST_YEAR,
                    month: 3,
                    day: 28,
                    description: 'Jueves Santo'
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data[0].isHoliday).toBe(true);
            expect(response.body.data[0].holidayDescription).toBe('Jueves Santo');
        });

        test('should reject empty description', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/holiday`)
                .send({
                    year: TEST_YEAR,
                    month: 3,
                    day: 28,
                    description: ''
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Description cannot be empty');
        });
    });

    describe('DELETE /calendar/holiday', () => {
        beforeEach(async () => {
            // Crear calendario y agregar festivo manual
            await request(app)
                .post(`${BASE_URL}/year`)
                .send({
                    year: TEST_YEAR,
                    forceRegenerate: true
                });

            await request(app)
                .post(`${BASE_URL}/holiday`)
                .send({
                    year: TEST_YEAR,
                    month: 3,
                    day: 28,
                    description: 'Jueves Santo'
                });
        });

        test('should remove manual holiday', async () => {
            const response = await request(app)
                .delete(`${BASE_URL}/holiday`)
                .send({
                    year: TEST_YEAR,
                    month: 3,
                    day: 28
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data[0].isHoliday).toBe(false);
            expect(response.body.data[0].holidayDescription).toBeNull();
        });

        test('should reject removing fixed holiday', async () => {
            const response = await request(app)
                .delete(`${BASE_URL}/holiday`)
                .send({
                    year: TEST_YEAR,
                    month: 1,
                    day: 1
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Cannot remove fixed holiday');
        });
    });
});
```

### **Script de Testing de Carga con Artillery**

```yaml
# artillery-load-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 20
      name: "Normal load"
    - duration: 60
      arrivalRate: 50
      name: "Peak load"

scenarios:
  - name: "Calendar API Load Test"
    weight: 100
    flow:
      - get:
          url: "/api/calendar/year/2024"
          expect:
            - statusCode: 200
      - get:
          url: "/api/calendar/year/2024/month/{{ $randomInt(1, 12) }}"
          expect:
            - statusCode: 200
      - get:
          url: "/api/calendar/holidays/2024"
          expect:
            - statusCode: 200
      - get:
          url: "/api/calendar/years-months"
          expect:
            - statusCode: 200
```

### **Script de Performance Benchmark**

```bash
#!/bin/bash
# performance-test.sh

echo "🚀 Starting Calendar API Performance Tests..."

# Test 1: Calendar Creation
echo "📅 Testing calendar creation..."
time curl -s -X POST http://localhost:3000/api/calendar/year \
  -H "Content-Type: application/json" \
  -d '{"year": 2025, "forceRegenerate": true}' > /dev/null

# Test 2: Get Full Year
echo "📊 Testing full year retrieval..."
time curl -s http://localhost:3000/api/calendar/year/2025 > /dev/null

# Test 3: Get Month
echo "📅 Testing month retrieval..."
time curl -s http://localhost:3000/api/calendar/year/2025/month/6 > /dev/null

# Test 4: Get Holidays
echo "🎉 Testing holidays retrieval..."
time curl -s http://localhost:3000/api/calendar/holidays/2025 > /dev/null

# Test 5: Multiple concurrent requests
echo "⚡ Testing concurrent requests..."
for i in {1..10}; do
  curl -s http://localhost:3000/api/calendar/year/2025/month/$((RANDOM % 12 + 1)) > /dev/null &
done
wait

echo "✅ Performance tests completed!"
```

---

## 🔍 Debugging y Troubleshooting

### **Logs Comunes de Error**

#### **Error 1: Calendar Not Found**
```bash
# Log
Error getting calendar by year: No calendar found for year 2025

# Solución
curl -X POST http://localhost:3000/api/calendar/year \
  -H "Content-Type: application/json" \
  -d '{"year": 2025}'
```

#### **Error 2: Database Connection**
```bash
# Log
Error finding calendars by year: connect ECONNREFUSED 127.0.0.1:3306

# Verificación
mysql -u root -p -e "SELECT 1"
```

#### **Error 3: Invalid Date**
```bash
# Log
Error: Invalid day. Month 2 of year 2024 only has 29 days

# Verificación de fecha
node -e "console.log(new Date(2024, 2, 0).getDate())" # Días en febrero 2024
```

### **Comandos de Debugging**

```bash
# Verificar estado de base de datos
mysql -u root -p shift_scheduler -e "SELECT COUNT(*) as total_days, year FROM CALENDAR GROUP BY year"

# Verificar festivos
mysql -u root -p shift_scheduler -e "SELECT * FROM CALENDAR WHERE isHoliday = 1 AND year = 2024"

# Verificar logs de aplicación
tail -f logs/application.log | grep -i calendar

# Test de conectividad
curl -I http://localhost:3000/api/calendar/years-months
```

---

## 📊 Métricas y Monitoreo

### **KPIs Importantes**
- ⏱️ **Tiempo de respuesta** promedio < 200ms
- 🎯 **Tasa de éxito** > 99.9%
- 💾 **Uso de memoria** < 100MB para 10 años de calendario
- 🔄 **Requests por segundo** > 100 RPS

### **Queries de Monitoreo**
```sql
-- Calendarios por año
SELECT year, COUNT(*) as days_count 
FROM CALENDAR 
GROUP BY year 
ORDER BY year;

-- Festivos por año
SELECT year, COUNT(*) as holidays_count 
FROM CALENDAR 
WHERE isHoliday = 1 
GROUP BY year;

-- Días de fin de semana por año
SELECT year, COUNT(*) as weekends_count 
FROM CALENDAR 
WHERE isWeekend = 1 
GROUP BY year;
```

---

## 🎯 Checklist de Testing Completo

### **Funcional Testing**
- [ ] ✅ Crear calendario para año válido
- [ ] ✅ Rechazar año inválido (< 1900 o > 2100)
- [ ] ✅ Detectar años bisiestos correctamente
- [ ] ✅ Marcar fines de semana automáticamente
- [ ] ✅ Marcar festivos fijos de Colombia
- [ ] ✅ Agregar festivos manuales
- [ ] ✅ Actualizar descripción de festivos
- [ ] ✅ Remover festivos manuales
- [ ] ✅ Proteger festivos fijos de modificación
- [ ] ✅ Validar fechas inexistentes (30 feb, 31 sep, etc.)

### **Performance Testing**
- [ ] ⚡ Creación de calendario < 2 segundos
- [ ] ⚡ Consulta de mes < 100ms
- [ ] ⚡ Consulta de año < 500ms
- [ ] ⚡ Consulta de festivos < 200ms
- [ ] ⚡ 100+ requests concurrentes

### **Security Testing**
- [ ] 🔒 SQL Injection en parámetros de fecha
- [ ] 🔒 XSS en descripciones de festivos
- [ ] 🔒 Rate limiting para operaciones de escritura
- [ ] 🔒 Validación de entrada en todos los campos

### **Integration Testing**
- [ ] 🔄 Base de datos MySQL
- [ ] 🔄 Sequelize ORM
- [ ] 🔄 Express middleware
- [ ] 🔄 Error handling global
- [ ] 🔄 Logging system

---

*Esta guía de testing cubre todos los aspectos necesarios para verificar el correcto funcionamiento de la API de Calendar*

**Última actualización**: Junio 2025  
**Versión**: 1.0.0
