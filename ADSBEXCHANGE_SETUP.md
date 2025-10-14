# 🛰️ Integración con ADS-B Exchange

## ¿Qué es ADS-B Exchange?

[**ADS-B Exchange**](https://www.adsbexchange.com/) es la fuente de datos de vuelos sin filtrar más grande del mundo, con:

- 🌍 **15,000+ aeronaves** rastreadas en tiempo real
- 📡 **14,000+ feeds activos** contribuyendo datos
- 🔓 **Sin filtros** - todos los vuelos visibles (incluyendo militares y privados)
- 🆓 **Datos comunitarios** - alimentado por entusiastas globalmente

## Características

### ✈️ **Datos en Tiempo Real**
- Posición GPS exacta de aeronaves
- Altitud, velocidad y rumbo
- Tipo de aeronave (A320, B737, etc.)
- Callsign/número de vuelo
- Squawk codes y categorías

### 🗺️ **Cobertura Global**
- Tracking mundial sin restricciones
- Datos de todas las aerolíneas
- Vuelos comerciales, privados, militares
- Helicópteros, drones, y más

## Configuración de API

### Opción 1: API Pública (Limitada)
- ✅ **Gratis**
- ⚠️ Límites de rate
- 📊 Acceso básico a datos globales
- Endpoint: `https://globe.adsbexchange.com/data/aircraft.json`

### Opción 2: API Enterprise (RapidAPI)
- 💎 **Plan de pago**
- 🚀 Sin límites de rate
- 📈 Datos históricos
- 🎯 Búsqueda avanzada por callsign, área, etc.

#### Configurar API Enterprise:

1. **Obtener API Key**:
   - Ve a [RapidAPI - ADS-B Exchange](https://rapidapi.com/adsbx/api/adsbexchange-com1)
   - Suscríbete a un plan (hay planes desde $0/mes)
   - Copia tu API Key

2. **Configurar en Vercel**:
   ```bash
   # Dashboard de Vercel
   Settings → Environment Variables → Add New
   
   Name: ADSBEXCHANGE_API_KEY
   Value: tu-api-key-aqui
   Environments: Production, Preview, Development
   ```

3. **Configurar localmente** (opcional):
   ```bash
   # .env.local
   ADSBEXCHANGE_API_KEY=tu-api-key-aqui
   ```

## Endpoints Utilizados

### 1. Búsqueda por Área
```
GET /v2/lat/{lat}/lon/{lon}/dist/{distance}/
```
Busca todos los vuelos en un radio de X km desde un punto.

### 2. Búsqueda por Callsign
```
GET /v2/callsign/{callsign}/
```
Obtiene datos de un vuelo específico por su número/callsign.

### 3. Feed Global
```
GET https://globe.adsbexchange.com/data/aircraft.json
```
API pública con todos los vuelos globales (sin autenticación).

## Ventajas de la Integración

### 🎯 **Para MindFly:**

1. **Vuelos en Tiempo Real**
   - Datos actualizados cada minuto
   - Posición exacta de aeronaves
   - Estado real del vuelo (en aire, aterrizando, etc.)

2. **Más Cobertura**
   - Complementa AviationStack
   - Vuelos que otras APIs no muestran
   - Datos globales sin filtros

3. **Mejor Precisión**
   - Altitud real de la aeronave
   - Velocidad actual
   - Posición GPS exacta para pronóstico de turbulencias

4. **Fallback Inteligente**
   ```
   1. Base de datos local (rutas programadas) ✅
   2. ADS-B Exchange (vuelos en tiempo real) 🆕
   3. AviationStack (vuelos comerciales) ✅
   4. OpenSky Network (backup) ✅
   ```

## Sistema de Prioridad

La app busca vuelos en este orden:

1. **Base de datos local** → Vuelos programados de rutas comunes
2. **ADS-B Exchange** → Vuelos en tiempo real en el área
3. **AviationStack** → Vuelos comerciales confirmados
4. **OpenSky** → Backup público

## Datos que Obtenemos

```typescript
interface FlightData {
  flightNumber: string;    // Ej: IB1013, VY1001
  airline: string;          // Iberia, Vueling
  aircraft: string;         // A320, B738
  status: string;           // active, landed, scheduled
  currentPosition?: {
    lat: number;            // Latitud GPS
    lon: number;            // Longitud GPS
    altitude: number;       // Altitud en pies
    speed: number;          // Velocidad en knots
  }
}
```

## Uso en MindFly

### 1. Búsqueda de Vuelos
```typescript
// Busca vuelos entre BCN y MAD
const flights = await searchRealFlights('BCN', 'MAD');
// → Combina datos programados + en tiempo real
```

### 2. Tracking en Vivo
```typescript
// Obtiene posición actual de un vuelo
const flight = await getFlightByCallsign('IB1013');
// → Posición GPS, altitud, velocidad en tiempo real
```

### 3. Pronóstico Preciso
```typescript
// Usa posición real para calcular turbulencias
if (flight.currentPosition) {
  const turbulence = await getTurbulenceAtPosition(
    flight.currentPosition.lat,
    flight.currentPosition.lon,
    flight.currentPosition.altitude
  );
}
```

## Limitaciones

### API Pública (Sin Key):
- ⚠️ Límite de requests
- ⚠️ No filtra por ruta específica
- ⚠️ Requiere filtrado local

### API Enterprise (Con Key):
- ✅ Sin límites
- ✅ Búsqueda avanzada
- ✅ Datos históricos
- 💰 Requiere suscripción

## Alternativas Gratuitas

Si no quieres usar la API de pago:

1. **OpenSky Network** (ya integrado)
   - Gratis, sin API key
   - Datos globales
   - Algo más limitado

2. **FlightRadar24** (scraping)
   - Datos públicos
   - Requiere parseo HTML
   - No oficial

3. **Base de datos local** (actual)
   - Vuelos programados
   - Horarios típicos
   - Muy confiable para rutas comunes

## Links Útiles

- 🌐 [ADS-B Exchange Homepage](https://www.adsbexchange.com/)
- 🗺️ [Mapa de Tracking Global](https://globe.adsbexchange.com/)
- 📚 [Documentación API v2](https://www.adsbexchange.com/version-2-api-wip/)
- 💎 [API en RapidAPI](https://rapidapi.com/adsbx/api/adsbexchange-com1)
- 🤝 [Comunidad y Leaderboard](https://www.adsbexchange.com/community/)
- 📖 [Cómo funciona ADS-B](https://www.adsbexchange.com/how-ads-b-exchange-works/)

## Estado Actual

✅ **Integrado en MindFly**
- Código listo en `/lib/adsbexchange-api.ts`
- Sistema de fallback configurado
- API pública funciona sin configuración
- API Enterprise lista para API key

🚀 **Para Activar API Enterprise:**
Solo necesitas añadir `ADSBEXCHANGE_API_KEY` en Vercel y la app automáticamente usará la API premium.

