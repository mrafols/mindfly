# ✈️ Integración con AeroDataBox API

## ¿Qué es AeroDataBox?

**AeroDataBox** es una API completa y profesional para datos de aeropuertos y vuelos, disponible en [RapidAPI](https://api.market/store/aedbx/aerodatabox).

### 🎯 **Características Principales:**

- ✈️ **Datos de vuelos en tiempo real** con horarios exactos
- 🏢 **Información completa de aeropuertos** (coordenadas, terminales, gates)
- 🌍 **Cobertura global** de aerolíneas comerciales
- 📊 **Horarios programados y reales** (scheduled + actual times)
- 🛫 **Salidas y llegadas** por aeropuerto
- 🔍 **Búsqueda por número de vuelo** específico
- ⏰ **Estados de vuelos** (scheduled, active, landed, cancelled)
- 🎫 **Información de aeronaves** (modelo, registro)
- 🏷️ **Puertas y terminales** de salida/llegada

## Ventajas sobre ADS-B Exchange

| Característica | AeroDataBox | ADS-B Exchange |
|----------------|-------------|----------------|
| Horarios programados | ✅ Sí | ❌ No |
| Horarios reales | ✅ Sí | ❌ No |
| Información de aeropuerto | ✅ Completa | ❌ Limitada |
| Terminales y puertas | ✅ Sí | ❌ No |
| Número de vuelo real | ✅ Sí | ⚠️ Callsign |
| Aerolínea completa | ✅ Nombre completo | ⚠️ Solo código |
| Tipo de aeronave | ✅ Modelo exacto | ✅ Sí |
| Búsqueda por ruta | ✅ Nativa | ❌ Filtrado manual |
| API REST estándar | ✅ Sí | ⚠️ Varía |
| Precio | 💰 Desde gratis | 💰 Desde gratis |

## Planes y Precios

AeroDataBox ofrece varios planes en RapidAPI:

### 🆓 **Basic (Gratis)**
- **500 requests/mes**
- Datos de vuelos en tiempo real
- Información de aeropuertos
- Búsqueda por ruta
- ✅ **Perfecto para desarrollo**

### 💎 **Pro ($9.99/mes)**
- **10,000 requests/mes**
- Todo lo del plan Basic
- Soporte prioritario
- ✅ **Ideal para producción**

### 🚀 **Ultra ($49.99/mes)**
- **100,000 requests/mes**
- Todo lo del plan Pro
- Sin límites de tasa
- ✅ **Para aplicaciones de alto tráfico**

## Configuración

### 1. Obtener API Key

1. Ve a [AeroDataBox en RapidAPI](https://api.market/store/aedbx/aerodatabox)
2. Haz clic en **"Subscribe to Test"**
3. Selecciona un plan (puedes empezar con Basic - Gratis)
4. Copia tu **API Key** de RapidAPI

### 2. Configurar en Vercel

```bash
# Dashboard de Vercel
Settings → Environment Variables → Add New

Name: AERODATABOX_API_KEY
Value: tu-rapidapi-key-aqui
Environments: ✅ Production, ✅ Preview, ✅ Development
```

### 3. Configurar localmente (opcional)

```bash
# .env.local
AERODATABOX_API_KEY=tu-rapidapi-key-aqui
```

## Endpoints Utilizados

### 1. **Buscar Vuelos por Ruta**
```http
GET /flights/airports/iata/{originIATA}/{fromTime}/{toTime}
?withLeg=true
&direction=Departure
&withCancelled=false
&withCodeshared=false
```

**Ejemplo:**
```
GET /flights/airports/iata/BCN/2025-01-15T00:00/2025-01-15T23:59
```

**Respuesta incluye:**
- Número de vuelo (IB1013)
- Aerolínea (Iberia)
- Aeronave (Airbus A320)
- Horarios programados y reales
- Terminal y puerta de salida
- Aeropuerto de destino
- Estado del vuelo

### 2. **Información de Aeropuerto**
```http
GET /airports/iata/{iataCode}
```

**Ejemplo:**
```
GET /airports/iata/BCN
```

**Respuesta incluye:**
- Nombre completo del aeropuerto
- Coordenadas GPS (lat, lon)
- Código ICAO/IATA
- País y continente
- Zona horaria
- URLs (sitio web, Wikipedia)

### 3. **Vuelos en Tiempo Real**
```http
GET /flights/airports/iata/{iataCode}/{fromTime}/{toTime}
```

**Útil para:**
- Ver todos los vuelos de un aeropuerto
- Salidas o llegadas
- Ventana de tiempo específica

### 4. **Buscar por Número de Vuelo**
```http
GET /flights/number/{flightNumber}/{date}
```

**Ejemplo:**
```
GET /flights/number/IB1013/2025-01-15
```

## Datos que Obtenemos

```typescript
interface FlightData {
  // Básico
  flightNumber: string;      // "IB1013"
  airline: string;           // "Iberia"
  aircraft: string;          // "A320"
  status: 'scheduled' | 'active' | 'landed' | 'cancelled';
  
  // Horarios
  departureTime: string;     // ISO 8601 UTC
  arrivalTime: string;       // ISO 8601 UTC
  
  // Adicional (si disponible)
  departureTerminal?: string;
  departureGate?: string;
  arrivalTerminal?: string;
  arrivalGate?: string;
}
```

## Uso en MindFly

### Sistema de Fallback Mejorado

```
1. Base de datos local ✅
   → Vuelos programados de rutas comunes
   → 150+ aeropuertos

2. AeroDataBox 🆕
   → Datos completos de aeropuertos
   → Vuelos en tiempo real con horarios
   → 500 requests/mes gratis

3. AviationStack ✅
   → Vuelos comerciales confirmados
   → 100 requests/mes gratis

4. OpenSky Network ✅
   → Backup público gratuito
```

### Ventajas para MindFly

1. **Horarios Exactos** ⏰
   - Ya no estimamos horarios
   - Datos reales de salida/llegada
   - Actualizaciones en tiempo real

2. **Información Completa** 📊
   - Modelo exacto de aeronave
   - Nombre real de la aerolínea
   - Terminales y puertas

3. **Mejor Experiencia** 🎯
   - Usuarios ven vuelos reales
   - Horarios precisos
   - Estado actualizado (en vuelo, aterrizado, etc.)

4. **Búsqueda Eficiente** 🔍
   - API diseñada para búsquedas por ruta
   - No requiere filtrado manual
   - Respuestas rápidas

## Ejemplos de Uso

### Buscar Vuelos BCN → MAD

```typescript
const flights = await searchRouteFlightsAeroDataBox('BCN', 'MAD');

// Resultado:
[
  {
    flightNumber: 'IB1013',
    airline: 'Iberia',
    aircraft: 'A320',
    status: 'scheduled',
    departureTime: '2025-01-15T07:00:00Z',
    arrivalTime: '2025-01-15T08:25:00Z'
  },
  {
    flightNumber: 'VY1001',
    airline: 'Vueling',
    aircraft: 'A320',
    status: 'active',
    departureTime: '2025-01-15T08:30:00Z',
    arrivalTime: '2025-01-15T09:55:00Z'
  }
  // ... más vuelos
]
```

### Obtener Info de Aeropuerto

```typescript
const airport = await getAirportInfo('BCN');

// Resultado:
{
  iata: 'BCN',
  icao: 'LEBL',
  name: 'Josep Tarradellas Barcelona-El Prat Airport',
  location: {
    lat: 41.2971,
    lon: 2.0785
  },
  countryCode: 'ES',
  timeZone: 'Europe/Madrid'
}
```

## Limitaciones

### Plan Gratuito (Basic):
- ⚠️ 500 requests/mes (~16-17 por día)
- ⚠️ Sin soporte prioritario

### Solución:
- Cache inteligente (5 minutos para vuelos)
- Fallback a base de datos local
- Usar solo cuando sea necesario

## Comparación con Alternativas

### vs AviationStack
- ✅ Más datos de aeropuerto
- ✅ Terminales y puertas
- ✅ Búsqueda más específica
- ⚠️ Menos requests gratis (500 vs 100)

### vs ADS-B Exchange
- ✅ Horarios programados
- ✅ Información de aerolínea completa
- ✅ API más simple
- ❌ No tiene tracking GPS en vivo

### vs FlightRadar24
- ✅ API oficial
- ✅ Datos confiables
- ✅ Sin scraping
- 💰 Similar en precio

## Estado Actual

✅ **Integrado en MindFly**
- Código en `/lib/aerodatabox-api.ts`
- Sistema de fallback configurado
- Cache optimizado

🔑 **Para Activar:**
```bash
# Añadir en Vercel
AERODATABOX_API_KEY=tu-rapidapi-key

# Redeploy
npx vercel --prod
```

## Links Útiles

- 🌐 [AeroDataBox en RapidAPI](https://api.market/store/aedbx/aerodatabox)
- 📚 [Documentación API](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/details)
- 🔑 [Obtener API Key](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/pricing)
- 💬 [Soporte](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/discussions)

## Resumen

AeroDataBox es **superior a ADS-B Exchange** para MindFly porque:

1. ✅ Datos específicos de vuelos comerciales
2. ✅ Horarios reales (no estimados)
3. ✅ Información completa de aeropuertos
4. ✅ API diseñada para búsqueda por ruta
5. ✅ Plan gratuito generoso (500 requests/mes)
6. ✅ Fácil de integrar vía RapidAPI

**Recomendación:** Usar plan Basic (gratis) para desarrollo y Pro ($9.99/mes) para producción.

