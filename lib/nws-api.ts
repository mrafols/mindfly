/**
 * National Weather Service API Integration
 * 
 * API oficial del gobierno de Estados Unidos (NOAA)
 * https://api.weather.gov/
 * 
 * Características:
 * - 100% GRATIS - No requiere API key
 * - Cobertura completa de Estados Unidos
 * - Datos actualizados cada hora
 * - Pronósticos, alertas, observaciones
 * - Información de estaciones meteorológicas
 */

const NWS_BASE_URL = 'https://api.weather.gov';
const USER_AGENT = 'MindFly/1.0 (Flight Weather Forecast App)';

// Timeout para las peticiones
const REQUEST_TIMEOUT = 10000; // 10 segundos

/**
 * Interfaces para los datos de NWS
 */

export interface NWSPoint {
  properties: {
    gridId: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      };
    };
  };
}

export interface NWSForecast {
  properties: {
    periods: NWSForecastPeriod[];
  };
}

export interface NWSForecastPeriod {
  number: number;
  name: string; // "This Afternoon", "Tonight", etc.
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string | null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
  probabilityOfPrecipitation?: {
    value: number;
  };
  dewpoint?: {
    value: number;
  };
  relativeHumidity?: {
    value: number;
  };
}

export interface NWSObservation {
  properties: {
    timestamp: string;
    textDescription: string;
    temperature: {
      value: number | null;
      unitCode: string;
    };
    dewpoint: {
      value: number | null;
      unitCode: string;
    };
    windDirection: {
      value: number | null;
      unitCode: string;
    };
    windSpeed: {
      value: number | null;
      unitCode: string;
    };
    windGust: {
      value: number | null;
      unitCode: string;
    };
    barometricPressure: {
      value: number | null;
      unitCode: string;
    };
    visibility: {
      value: number | null;
      unitCode: string;
    };
    relativeHumidity: {
      value: number | null;
      unitCode: string;
    };
    precipitationLastHour: {
      value: number | null;
      unitCode: string;
    };
    cloudLayers: Array<{
      base: {
        value: number | null;
        unitCode: string;
      };
      amount: string;
    }>;
  };
}

export interface NWSAlert {
  properties: {
    event: string;
    severity: string;
    certainty: string;
    urgency: string;
    headline: string;
    description: string;
    instruction: string | null;
    areaDesc: string;
    onset: string;
    expires: string;
  };
}

/**
 * Obtiene información del punto (grid) para unas coordenadas
 */
export async function getPoint(lat: number, lon: number): Promise<NWSPoint | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const url = `${NWS_BASE_URL}/points/${lat.toFixed(4)},${lon.toFixed(4)}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        console.log('ℹ️ NWS: Ubicación fuera de cobertura USA');
        return null;
      }
      throw new Error(`NWS API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo punto NWS:', error);
    return null;
  }
}

/**
 * Obtiene pronóstico de 7 días
 */
export async function getForecast(point: NWSPoint): Promise<NWSForecast | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(point.properties.forecast, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NWS API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo pronóstico NWS:', error);
    return null;
  }
}

/**
 * Obtiene pronóstico por hora
 */
export async function getHourlyForecast(point: NWSPoint): Promise<NWSForecast | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await fetch(point.properties.forecastHourly, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`NWS API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo pronóstico horario NWS:', error);
    return null;
  }
}

/**
 * Obtiene observaciones de la estación más cercana
 */
export async function getLatestObservation(lat: number, lon: number): Promise<NWSObservation | null> {
  try {
    // Primero obtener el punto
    const point = await getPoint(lat, lon);
    if (!point) return null;

    // Obtener lista de estaciones
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const stationsResponse = await fetch(point.properties.observationStations, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json'
      }
    });

    clearTimeout(timeoutId);

    if (!stationsResponse.ok) {
      return null;
    }

    const stationsData = await stationsResponse.json();
    const stations = stationsData.features;

    if (!stations || stations.length === 0) {
      return null;
    }

    // Obtener observación de la primera estación
    const stationId = stations[0].properties.stationIdentifier;
    
    const controller2 = new AbortController();
    const timeoutId2 = setTimeout(() => controller2.abort(), REQUEST_TIMEOUT);

    const obsResponse = await fetch(`${NWS_BASE_URL}/stations/${stationId}/observations/latest`, {
      signal: controller2.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json'
      }
    });

    clearTimeout(timeoutId2);

    if (!obsResponse.ok) {
      return null;
    }

    const data = await obsResponse.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo observaciones NWS:', error);
    return null;
  }
}

/**
 * Obtiene alertas activas para un punto
 */
export async function getAlerts(lat: number, lon: number): Promise<NWSAlert[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const url = `${NWS_BASE_URL}/alerts/active?point=${lat.toFixed(4)},${lon.toFixed(4)}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/geo+json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error('Error obteniendo alertas NWS:', error);
    return [];
  }
}

/**
 * Analiza el clima en una ubicación específica
 */
export async function analyzeWeatherAtLocation(
  lat: number,
  lon: number
): Promise<{
  point: NWSPoint;
  currentConditions: NWSObservation | null;
  forecast: NWSForecast | null;
  alerts: NWSAlert[];
} | null> {
  try {
    console.log(`🌦️ Analizando clima NWS en ${lat.toFixed(4)}, ${lon.toFixed(4)}`);

    // Obtener punto
    const point = await getPoint(lat, lon);
    if (!point) {
      console.log('ℹ️ Ubicación fuera de cobertura USA');
      return null;
    }

    const city = point.properties.relativeLocation?.properties?.city || 'Unknown';
    const state = point.properties.relativeLocation?.properties?.state || '';
    console.log(`📍 NWS: ${city}, ${state}`);

    // Obtener datos en paralelo
    const [currentConditions, forecast, alerts] = await Promise.all([
      getLatestObservation(lat, lon),
      getForecast(point),
      getAlerts(lat, lon)
    ]);

    return {
      point,
      currentConditions,
      forecast,
      alerts
    };
  } catch (error) {
    console.error('Error analizando clima en ubicación:', error);
    return null;
  }
}

/**
 * Analiza condiciones meteorológicas en una ruta
 */
export async function analyzeWeatherOnRoute(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  numPoints: number = 3
): Promise<{
  origin: Awaited<ReturnType<typeof analyzeWeatherAtLocation>>;
  destination: Awaited<ReturnType<typeof analyzeWeatherAtLocation>>;
  waypoints: Array<Awaited<ReturnType<typeof analyzeWeatherAtLocation>>>;
  summary: {
    maxTemperature: number;
    minTemperature: number;
    maxWindSpeed: number;
    precipitationProbability: number;
    alertCount: number;
    worstAlert: NWSAlert | null;
  };
  coverage: boolean; // true si toda la ruta está en USA
}> {
  console.log('🌦️ Analizando clima en ruta con National Weather Service...');

  // Analizar origen y destino
  const [origin, destination] = await Promise.all([
    analyzeWeatherAtLocation(originLat, originLon),
    analyzeWeatherAtLocation(destLat, destLon),
  ]);

  // Verificar cobertura
  const coverage = !!(origin && destination);

  // Generar puntos intermedios
  const waypoints: Array<Awaited<ReturnType<typeof analyzeWeatherAtLocation>>> = [];
  
  if (coverage && numPoints > 2) {
    for (let i = 1; i < numPoints - 1; i++) {
      const fraction = i / (numPoints - 1);
      const lat = originLat + (destLat - originLat) * fraction;
      const lon = originLon + (destLon - originLon) * fraction;
      
      const waypoint = await analyzeWeatherAtLocation(lat, lon);
      waypoints.push(waypoint);
    }
  }

  // Calcular resumen
  const allPoints = [origin, ...waypoints, destination].filter(p => p !== null);
  
  let maxTemperature = -Infinity;
  let minTemperature = Infinity;
  let maxWindSpeed = 0;
  let precipitationProbability = 0;
  let alertCount = 0;
  let worstAlert: NWSAlert | null = null;

  for (const point of allPoints) {
    if (!point) continue;

    // Temperatura
    if (point.currentConditions?.properties.temperature?.value !== null && point.currentConditions) {
      const tempC = point.currentConditions.properties.temperature.value;
      if (tempC !== null) {
        maxTemperature = Math.max(maxTemperature, tempC);
        minTemperature = Math.min(minTemperature, tempC);
      }
    }

    // Viento
    if (point.currentConditions?.properties.windSpeed?.value !== null && point.currentConditions) {
      const windKmh = point.currentConditions.properties.windSpeed.value;
      if (windKmh !== null) {
        maxWindSpeed = Math.max(maxWindSpeed, windKmh);
      }
    }

    // Probabilidad de precipitación
    if (point.forecast?.properties.periods?.[0]?.probabilityOfPrecipitation?.value) {
      precipitationProbability = Math.max(
        precipitationProbability,
        point.forecast.properties.periods[0].probabilityOfPrecipitation.value
      );
    }

    // Alertas
    if (point.alerts && point.alerts.length > 0) {
      alertCount += point.alerts.length;
      
      // Encontrar alerta más severa
      for (const alert of point.alerts) {
        if (!worstAlert || getSeverityScore(alert) > getSeverityScore(worstAlert)) {
          worstAlert = alert;
        }
      }
    }
  }

  // Ajustar valores si no hay datos
  if (maxTemperature === -Infinity) maxTemperature = 0;
  if (minTemperature === Infinity) minTemperature = 0;

  console.log(`✅ NWS: ${allPoints.length} puntos analizados en USA`);
  console.log(`   Temp: ${minTemperature.toFixed(1)}°C - ${maxTemperature.toFixed(1)}°C`);
  console.log(`   Viento máx: ${maxWindSpeed.toFixed(0)} km/h`);
  console.log(`   Precip: ${precipitationProbability}%`);
  console.log(`   Alertas: ${alertCount}`);

  return {
    origin,
    destination,
    waypoints,
    summary: {
      maxTemperature,
      minTemperature,
      maxWindSpeed,
      precipitationProbability,
      alertCount,
      worstAlert
    },
    coverage
  };
}

/**
 * Calcula un score de severidad para ordenar alertas
 */
function getSeverityScore(alert: NWSAlert): number {
  const severity = alert.properties.severity?.toLowerCase() || '';
  const urgency = alert.properties.urgency?.toLowerCase() || '';
  
  let score = 0;
  
  // Severidad
  if (severity === 'extreme') score += 100;
  else if (severity === 'severe') score += 75;
  else if (severity === 'moderate') score += 50;
  else if (severity === 'minor') score += 25;
  
  // Urgencia
  if (urgency === 'immediate') score += 20;
  else if (urgency === 'expected') score += 15;
  else if (urgency === 'future') score += 10;
  
  return score;
}

/**
 * Convierte km/h a nudos
 */
export function kmhToKnots(kmh: number): number {
  return kmh * 0.539957;
}

/**
 * Convierte km/h a mph
 */
export function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

