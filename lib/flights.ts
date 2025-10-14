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
}

// Función para buscar vuelos entre dos aeropuertos
export async function searchFlights(
  originIATA: string,
  destinationIATA: string
): Promise<Flight[]> {
  try {
    // Usaremos AviationStack API (tiene plan gratuito)
    // Por ahora simularemos datos realistas
    const flights = generateMockFlights(originIATA, destinationIATA);
    return flights;
  } catch (error) {
    console.error('Error buscando vuelos:', error);
    return generateMockFlights(originIATA, destinationIATA);
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
    // Calcular puntos en la ruta del vuelo
    const waypoints = calculateFlightPath(originLat, originLon, destLat, destLon);
    
    // Obtener datos meteorológicos en altitud de crucero
    const weatherData = await getUpperAirWeather(waypoints);
    
    // Calcular probabilidad de turbulencia
    const turbulence = analyzeTurbulence(weatherData);
    
    return turbulence;
  } catch (error) {
    console.error('Error obteniendo pronóstico de turbulencia:', error);
    return {
      severity: 'light',
      altitude: 35000,
      probability: 20,
      description: 'Condiciones normales de vuelo'
    };
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

// Generar vuelos simulados (hasta que integremos API real)
function generateMockFlights(_origin: string, _destination: string): Flight[] {
  const now = new Date();
  const flights: Flight[] = [];
  
  // Aerolíneas comunes en España
  const airlines = [
    { code: 'IB', name: 'Iberia' },
    { code: 'VY', name: 'Vueling' },
    { code: 'UX', name: 'Air Europa' },
    { code: 'FR', name: 'Ryanair' }
  ];
  
  // Generar 3-5 vuelos del día
  const numFlights = Math.floor(Math.random() * 3) + 3;
  
  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const departureHour = 6 + (i * 3) + Math.floor(Math.random() * 2);
    const flightDuration = 1.5 + Math.random() * 2; // 1.5-3.5 horas
    
    const departure = new Date(now);
    departure.setHours(departureHour, Math.floor(Math.random() * 60), 0);
    
    const arrival = new Date(departure);
    arrival.setHours(arrival.getHours() + Math.floor(flightDuration));
    arrival.setMinutes(arrival.getMinutes() + Math.floor((flightDuration % 1) * 60));
    
    flights.push({
      flightNumber: `${airline.code}${1000 + Math.floor(Math.random() * 9000)}`,
      airline: airline.name,
      departureTime: departure.toISOString(),
      arrivalTime: arrival.toISOString(),
      aircraft: ['A320', 'A321', 'B737', 'B738'][Math.floor(Math.random() * 4)],
      status: departure < now ? 'active' : 'scheduled'
    });
  }
  
  return flights.sort((a, b) => 
    new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  );
}

// Función principal para obtener forecast completo de un vuelo
export async function getFlightForecast(
  flight: Flight,
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<FlightForecast> {
  const turbulence = await getTurbulenceForecast(
    flight,
    originLat,
    originLon,
    destLat,
    destLon
  );
  
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
  
  return {
    flight,
    turbulence,
    weatherAlerts,
    recommendation
  };
}

