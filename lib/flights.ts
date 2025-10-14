// Interfaz para datos de vuelo
export interface Flight {
  flightNumber: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  status: 'scheduled' | 'active' | 'landed' | 'cancelled';
  currentPosition?: {
    lat: number;
    lon: number;
    altitude: number; // en pies
    speed: number; // en knots
  };
  route?: {
    lat: number;
    lon: number;
  }[];
}

export interface TurbulenceData {
  severity: 'none' | 'light' | 'moderate' | 'severe';
  altitude: number; // en pies
  probability: number; // 0-100
  description: string;
}

export interface FlightForecast {
  flight: Flight;
  turbulence: TurbulenceData;
  weatherAlerts: string[];
  recommendation: string;
  turbulencePoints?: import('./noaa-weather').TurbulenceForecastPoint[]; // Datos detallados para gráficos
}

// Función para buscar vuelos entre dos aeropuertos
export async function searchFlights(
  originIATA: string,
  destinationIATA: string
): Promise<Flight[]> {
  try {
    // Usar la nueva API de vuelos reales
    const { searchRealFlights } = await import('./flight-apis');
    const flights = await searchRealFlights(originIATA, destinationIATA);
    
    if (flights.length > 0) {
      return flights;
    }
    
    // Fallback solo si no hay datos reales
    console.warn('No se encontraron vuelos reales, usando fallback');
    return [];
  } catch (error) {
    console.error('Error buscando vuelos:', error);
    return [];
  }
}

// Función para obtener pronóstico de turbulencias para un vuelo
export async function getTurbulenceForecast(
  flight: Flight,
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<TurbulenceData> {
  try {
    // Importar dinámicamente el módulo de NOAA
    const { getNOAATurbulenceData, analyzeTurbulenceRoute } = await import('./noaa-weather');
    
    // Calcular puntos en la ruta del vuelo (más puntos para mejor precisión)
    const waypoints = calculateFlightPath(originLat, originLon, destLat, destLon, 15);
    
    // Obtener datos de turbulencia de NOAA/Open-Meteo
    const turbulencePoints = await getNOAATurbulenceData(waypoints, 350);
    
    // Analizar la ruta completa
    const routeAnalysis = analyzeTurbulenceRoute(turbulencePoints);
    
    return {
      severity: routeAnalysis.maxSeverity,
      altitude: 35000,
      probability: routeAnalysis.avgProbability,
      description: routeAnalysis.recommendation
    };
  } catch (error) {
    console.error('Error obteniendo pronóstico de turbulencia:', error);
    // Fallback al método anterior si falla
    const waypoints = calculateFlightPath(originLat, originLon, destLat, destLon);
    const weatherData = await getUpperAirWeather(waypoints);
    return analyzeTurbulence(weatherData);
  }
}

// Función auxiliar para calcular la ruta de vuelo
function calculateFlightPath(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  points: number = 10
): { lat: number; lon: number }[] {
  const waypoints = [];
  
  for (let i = 0; i <= points; i++) {
    const fraction = i / points;
    const lat = originLat + (destLat - originLat) * fraction;
    const lon = originLon + (destLon - originLon) * fraction;
    waypoints.push({ lat, lon });
  }
  
  return waypoints;
}

interface WeatherApiResponse {
  hourly?: {
    temperature_300hPa?: number[];
    wind_speed_300hPa?: number[];
    wind_direction_300hPa?: number[];
  };
}

// Función para obtener datos meteorológicos en altitud
async function getUpperAirWeather(
  waypoints: { lat: number; lon: number }[]
): Promise<(WeatherApiResponse | null)[]> {
  const weatherPromises = waypoints.map(async (point) => {
    try {
      // Usamos Open-Meteo con datos de presión en niveles de altitud
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${point.lat}&longitude=${point.lon}` +
        `&hourly=temperature_300hPa,wind_speed_300hPa,wind_direction_300hPa` +
        `&forecast_days=1`
      );
      
      if (!response.ok) throw new Error('Weather API error');
      
      return await response.json() as WeatherApiResponse;
    } catch {
      return null;
    }
  });
  
  return Promise.all(weatherPromises);
}

// Función para analizar turbulencia basada en datos meteorológicos
function analyzeTurbulence(weatherData: (WeatherApiResponse | null)[]): TurbulenceData {
  let maxWindSpeed = 0;
  let avgWindSpeed = 0;
  let validPoints = 0;
  
  weatherData.forEach(data => {
    if (data?.hourly?.wind_speed_300hPa) {
      const speeds = data.hourly.wind_speed_300hPa;
      const currentSpeed = speeds[0] || 0;
      maxWindSpeed = Math.max(maxWindSpeed, currentSpeed);
      avgWindSpeed += currentSpeed;
      validPoints++;
    }
  });
  
  avgWindSpeed = validPoints > 0 ? avgWindSpeed / validPoints : 0;
  
  // Determinar severidad de turbulencia basada en velocidad del viento
  let severity: TurbulenceData['severity'] = 'none';
  let probability = 0;
  let description = '';
  
  if (avgWindSpeed < 25) {
    severity = 'none';
    probability = 10;
    description = 'Condiciones suaves, vuelo muy tranquilo esperado';
  } else if (avgWindSpeed < 40) {
    severity = 'light';
    probability = 35;
    description = 'Posibles turbulencias ligeras, completamente normales y seguras';
  } else if (avgWindSpeed < 60) {
    severity = 'moderate';
    probability = 60;
    description = 'Turbulencias moderadas posibles, los pilotos están preparados';
  } else {
    severity = 'moderate';
    probability = 75;
    description = 'Condiciones más movidas, pero dentro de los parámetros normales';
  }
  
  return {
    severity,
    altitude: 35000, // Altitud típica de crucero
    probability,
    description
  };
}

// Esta función ya no se usa, mantenida solo por compatibilidad
function _generateMockFlights(_origin: string, _destination: string): Flight[] {
  return [];
}

// Función principal para obtener forecast completo de un vuelo
export async function getFlightForecast(
  flight: Flight,
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<FlightForecast> {
  // Obtener pronóstico base de turbulencia
  const baseTurbulence = await getTurbulenceForecast(
    flight,
    originLat,
    originLon,
    destLat,
    destLon
  );
  
  // Ajustar según tipo de aeronave (datos de SKYbrary)
  const { adjustTurbulenceByAircraft } = await import('./aircraft-data');
  const adjusted = adjustTurbulenceByAircraft(
    baseTurbulence.severity,
    baseTurbulence.probability,
    flight.aircraft
  );
  
  const turbulence: TurbulenceData = {
    severity: adjusted.adjustedSeverity,
    altitude: baseTurbulence.altitude,
    probability: adjusted.adjustedProbability,
    description: `${baseTurbulence.description}\n\n${adjusted.explanation}`
  };
  
  const weatherAlerts: string[] = [];
  let recommendation = '';
  
  // Generar alertas y recomendaciones basadas en turbulencia
  if (turbulence.severity === 'none' || turbulence.severity === 'light') {
    recommendation = '✅ Excelentes condiciones para volar. Vuelo tranquilo esperado.';
  } else if (turbulence.severity === 'moderate') {
    recommendation = '⚠️ Posibles turbulencias moderadas. Los pilotos están preparados y es completamente seguro.';
    weatherAlerts.push('Turbulencias moderadas esperadas en ruta');
  } else {
    recommendation = '⚠️ Condiciones más movidas de lo normal, pero totalmente seguro volar.';
    weatherAlerts.push('Condiciones de viento intensas en ruta');
  }
  
  // Obtener datos detallados de turbulencia para gráficos
  let turbulencePoints;
  try {
    const { getNOAATurbulenceData } = await import('./noaa-weather');
    const waypoints = calculateFlightPath(originLat, originLon, destLat, destLon, 15);
    turbulencePoints = await getNOAATurbulenceData(waypoints, 350);
  } catch (error) {
    console.error('Error obteniendo datos detallados:', error);
  }

  return {
    flight,
    turbulence,
    weatherAlerts,
    recommendation,
    turbulencePoints
  };
}

