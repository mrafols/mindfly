/**
 * Met Office DataPoint API Integration
 * 
 * Servicio meteorológico oficial del Reino Unido
 * https://www.metoffice.gov.uk/services/data/datapoint/api-reference
 * 
 * Características:
 * - Pronósticos de 5 días para ~5000 ubicaciones en UK
 * - Observaciones de las últimas 24 horas para ~140 sitios
 * - Actualizaciones cada hora
 * - Datos en pasos de 3 horas o diarios
 */

const METOFFICE_BASE_URL = 'http://datapoint.metoffice.gov.uk/public/data';
const API_KEY = process.env.METOFFICE_API_KEY;

// Timeout para las peticiones
const REQUEST_TIMEOUT = 10000; // 10 segundos

/**
 * Interfaces para los datos de Met Office
 */

export interface MetOfficeSite {
  elevation: string;
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  region: string;
  unitaryAuthArea: string;
}

export interface MetOfficeForecastPeriod {
  type: 'Day' | 'Night';
  value: string; // ISO date
  Rep: MetOfficeForecastRep[];
}

export interface MetOfficeForecastRep {
  $: string; // Minutes since midnight
  D: string; // Wind direction
  F: string; // Feels like temperature (°C)
  G: string; // Wind gust (mph)
  H: string; // Screen relative humidity (%)
  Pp: string; // Precipitation probability (%)
  S: string; // Wind speed (mph)
  T: string; // Temperature (°C)
  V: string; // Visibility (m, ft, yd, mi)
  W: string; // Weather type code
  U: string; // Max UV index
}

export interface MetOfficeObservationRep {
  $: string; // Minutes since midnight
  D: string; // Wind direction
  H: string; // Humidity (%)
  P: string; // Pressure (hPa)
  S: string; // Wind speed (mph)
  T: string; // Temperature (°C)
  V: string; // Visibility
  W: string; // Weather type
  Pt: string; // Pressure tendency
  Dp: string; // Dew point (°C)
}

export interface MetOfficeWeatherType {
  code: string;
  description: string;
  severity: 'none' | 'light' | 'moderate' | 'severe';
}

/**
 * Códigos de tipo de clima de Met Office
 * https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
 */
const WEATHER_TYPES: Record<string, MetOfficeWeatherType> = {
  '0': { code: 'Clear night', description: 'Noche despejada', severity: 'none' },
  '1': { code: 'Sunny day', description: 'Día soleado', severity: 'none' },
  '2': { code: 'Partly cloudy (night)', description: 'Parcialmente nublado (noche)', severity: 'none' },
  '3': { code: 'Partly cloudy (day)', description: 'Parcialmente nublado (día)', severity: 'none' },
  '5': { code: 'Mist', description: 'Niebla', severity: 'light' },
  '6': { code: 'Fog', description: 'Niebla densa', severity: 'light' },
  '7': { code: 'Cloudy', description: 'Nublado', severity: 'none' },
  '8': { code: 'Overcast', description: 'Cubierto', severity: 'none' },
  '9': { code: 'Light rain shower (night)', description: 'Lluvia ligera (noche)', severity: 'light' },
  '10': { code: 'Light rain shower (day)', description: 'Lluvia ligera (día)', severity: 'light' },
  '11': { code: 'Drizzle', description: 'Llovizna', severity: 'light' },
  '12': { code: 'Light rain', description: 'Lluvia ligera', severity: 'light' },
  '13': { code: 'Heavy rain shower (night)', description: 'Lluvia fuerte (noche)', severity: 'moderate' },
  '14': { code: 'Heavy rain shower (day)', description: 'Lluvia fuerte (día)', severity: 'moderate' },
  '15': { code: 'Heavy rain', description: 'Lluvia fuerte', severity: 'moderate' },
  '16': { code: 'Sleet shower (night)', description: 'Aguanieve (noche)', severity: 'moderate' },
  '17': { code: 'Sleet shower (day)', description: 'Aguanieve (día)', severity: 'moderate' },
  '18': { code: 'Sleet', description: 'Aguanieve', severity: 'moderate' },
  '19': { code: 'Hail shower (night)', description: 'Granizo (noche)', severity: 'moderate' },
  '20': { code: 'Hail shower (day)', description: 'Granizo (día)', severity: 'moderate' },
  '21': { code: 'Hail', description: 'Granizo', severity: 'moderate' },
  '22': { code: 'Light snow shower (night)', description: 'Nevada ligera (noche)', severity: 'light' },
  '23': { code: 'Light snow shower (day)', description: 'Nevada ligera (día)', severity: 'light' },
  '24': { code: 'Light snow', description: 'Nevada ligera', severity: 'light' },
  '25': { code: 'Heavy snow shower (night)', description: 'Nevada fuerte (noche)', severity: 'severe' },
  '26': { code: 'Heavy snow shower (day)', description: 'Nevada fuerte (día)', severity: 'severe' },
  '27': { code: 'Heavy snow', description: 'Nevada fuerte', severity: 'severe' },
  '28': { code: 'Thunder shower (night)', description: 'Tormenta (noche)', severity: 'severe' },
  '29': { code: 'Thunder shower (day)', description: 'Tormenta (día)', severity: 'severe' },
  '30': { code: 'Thunder', description: 'Tormenta', severity: 'severe' },
};

/**
 * Obtiene la lista de sitios disponibles
 */
export async function getSiteList(): Promise<MetOfficeSite[]> {
  if (!API_KEY) {
    throw new Error('METOFFICE_API_KEY no configurada');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const url = `${METOFFICE_BASE_URL}/val/wxfcs/all/json/sitelist?key=${API_KEY}`;
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'MindFly/1.0 (Flight Weather Forecast)',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Met Office API error: ${response.status}`);
    }

    const data = await response.json();
    return data.Locations?.Location || [];
  } catch (error) {
    console.error('Error obteniendo lista de sitios de Met Office:', error);
    throw error;
  }
}

/**
 * Encuentra el sitio más cercano a unas coordenadas
 */
export async function findNearestSite(
  lat: number,
  lon: number
): Promise<MetOfficeSite | null> {
  try {
    const sites = await getSiteList();
    
    if (!sites || sites.length === 0) {
      return null;
    }

    let nearestSite: MetOfficeSite | null = null;
    let minDistance = Infinity;

    for (const site of sites) {
      const siteLat = parseFloat(site.latitude);
      const siteLon = parseFloat(site.longitude);
      
      const distance = calculateDistance(lat, lon, siteLat, siteLon);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestSite = site;
      }
    }

    console.log(`🎯 Sitio Met Office más cercano: ${nearestSite?.name} (${minDistance.toFixed(1)} km)`);
    return nearestSite;
  } catch (error) {
    console.error('Error buscando sitio más cercano:', error);
    return null;
  }
}

/**
 * Obtiene pronóstico de 5 días para un sitio específico
 */
export async function getForecast(
  siteId: string,
  resolution: '3hourly' | 'daily' = '3hourly'
): Promise<unknown> {
  if (!API_KEY) {
    throw new Error('METOFFICE_API_KEY no configurada');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const url = `${METOFFICE_BASE_URL}/val/wxfcs/all/json/${siteId}?res=${resolution}&key=${API_KEY}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'MindFly/1.0 (Flight Weather Forecast)',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Met Office API error: ${response.status}`);
    }

    const data = await response.json();
    return data.SiteRep?.DV?.Location;
  } catch (error) {
    console.error('Error obteniendo pronóstico de Met Office:', error);
    throw error;
  }
}

/**
 * Obtiene observaciones de las últimas 24 horas
 */
export async function getObservations(siteId: string): Promise<unknown> {
  if (!API_KEY) {
    throw new Error('METOFFICE_API_KEY no configurada');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const url = `${METOFFICE_BASE_URL}/val/wxobs/all/json/${siteId}?res=hourly&key=${API_KEY}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'MindFly/1.0 (Flight Weather Forecast)',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Met Office API error: ${response.status}`);
    }

    const data = await response.json();
    return data.SiteRep?.DV?.Location;
  } catch (error) {
    console.error('Error obteniendo observaciones de Met Office:', error);
    throw error;
  }
}

/**
 * Analiza el clima en una ubicación específica
 */
export async function analyzeWeatherAtLocation(
  lat: number,
  lon: number
): Promise<{
  site: MetOfficeSite;
  currentWeather: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: string;
    weatherType: MetOfficeWeatherType;
    precipitationProb: number;
  } | null;
  forecast: unknown;
} | null> {
  try {
    // Encontrar el sitio más cercano
    const site = await findNearestSite(lat, lon);
    
    if (!site) {
      console.log('⚠️ No se encontró sitio Met Office cercano');
      return null;
    }

    // Obtener pronóstico
    const forecast = await getForecast(site.id, '3hourly');
    
    // Verificar si el forecast tiene la estructura esperada
    const forecastData = forecast as { Period?: MetOfficeForecastPeriod[] };
    
    if (!forecastData || !forecastData.Period) {
      return { site, currentWeather: null, forecast: null };
    }

    // Obtener el pronóstico más reciente (primero disponible)
    const firstPeriod = forecastData.Period[0];
    const firstRep = firstPeriod?.Rep?.[0];

    if (!firstRep) {
      return { site, currentWeather: null, forecast };
    }

    const weatherType = WEATHER_TYPES[firstRep.W] || {
      code: 'Unknown',
      description: 'Desconocido',
      severity: 'none'
    };

    const currentWeather = {
      temperature: parseFloat(firstRep.T),
      feelsLike: parseFloat(firstRep.F),
      humidity: parseFloat(firstRep.H),
      windSpeed: parseFloat(firstRep.S),
      windDirection: firstRep.D,
      visibility: firstRep.V,
      weatherType,
      precipitationProb: parseFloat(firstRep.Pp),
    };

    return { site, currentWeather, forecast };
  } catch (error) {
    console.error('Error analizando clima en ubicación:', error);
    return null;
  }
}

/**
 * Analiza condiciones meteorológicas en una ruta
 */
export interface MetOfficeRouteAnalysis {
  origin: Awaited<ReturnType<typeof analyzeWeatherAtLocation>>;
  destination: Awaited<ReturnType<typeof analyzeWeatherAtLocation>>;
  waypoints: Array<Awaited<ReturnType<typeof analyzeWeatherAtLocation>>>;
  summary: {
    maxPrecipitationProb: number;
    avgTemperature: number;
    maxWindSpeed: number;
    worstWeather: MetOfficeWeatherType;
  };
}

export async function analyzeWeatherOnRoute(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  numPoints: number = 5
): Promise<MetOfficeRouteAnalysis> {
  console.log('🌦️ Analizando clima en ruta con Met Office...');

  // Analizar origen y destino
  const [origin, destination] = await Promise.all([
    analyzeWeatherAtLocation(originLat, originLon),
    analyzeWeatherAtLocation(destLat, destLon),
  ]);

  // Generar puntos intermedios en la ruta
  const waypoints: Array<Awaited<ReturnType<typeof analyzeWeatherAtLocation>>> = [];
  
  for (let i = 1; i < numPoints - 1; i++) {
    const fraction = i / (numPoints - 1);
    const lat = originLat + (destLat - originLat) * fraction;
    const lon = originLon + (destLon - originLon) * fraction;
    
    const waypoint = await analyzeWeatherAtLocation(lat, lon);
    waypoints.push(waypoint);
  }

  // Calcular resumen
  const allPoints = [origin, ...waypoints, destination].filter(p => p?.currentWeather);
  
  let maxPrecipitationProb = 0;
  let totalTemp = 0;
  let maxWindSpeed = 0;
  let worstSeverity: 'none' | 'light' | 'moderate' | 'severe' = 'none';
  let worstWeather = WEATHER_TYPES['1']; // Default: sunny

  const severityOrder = ['none', 'light', 'moderate', 'severe'];

  for (const point of allPoints) {
    if (point?.currentWeather) {
      const { currentWeather } = point;
      maxPrecipitationProb = Math.max(maxPrecipitationProb, currentWeather.precipitationProb);
      totalTemp += currentWeather.temperature;
      maxWindSpeed = Math.max(maxWindSpeed, currentWeather.windSpeed);
      
      if (severityOrder.indexOf(currentWeather.weatherType.severity) > 
          severityOrder.indexOf(worstSeverity)) {
        worstSeverity = currentWeather.weatherType.severity;
        worstWeather = currentWeather.weatherType;
      }
    }
  }

  const avgTemperature = allPoints.length > 0 ? totalTemp / allPoints.length : 0;

  console.log(`✅ Met Office: ${allPoints.length} puntos analizados`);
  console.log(`   Precipitación máx: ${maxPrecipitationProb}%`);
  console.log(`   Temperatura media: ${avgTemperature.toFixed(1)}°C`);
  console.log(`   Viento máx: ${maxWindSpeed} mph`);

  return {
    origin,
    destination,
    waypoints,
    summary: {
      maxPrecipitationProb,
      avgTemperature,
      maxWindSpeed,
      worstWeather,
    }
  };
}

/**
 * Calcula la distancia entre dos puntos geográficos en kilómetros
 * Fórmula de Haversine
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convierte mph a km/h
 */
export function mphToKmh(mph: number): number {
  return mph * 1.60934;
}

/**
 * Convierte mph a nudos
 */
export function mphToKnots(mph: number): number {
  return mph * 0.868976;
}

