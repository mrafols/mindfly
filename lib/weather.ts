export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  pressure: number;
  visibility: number;
  description: string;
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    // Usamos Open-Meteo API que no requiere API key
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,surface_pressure,visibility&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();
    const current = data.current;
    
    return {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      conditions: getWeatherDescription(current.weather_code),
      pressure: Math.round(current.surface_pressure),
      visibility: current.visibility ? Math.round(current.visibility / 1000) : 10,
      description: getDetailedDescription(current.weather_code)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Datos de ejemplo en caso de error
    return {
      temperature: 20,
      humidity: 65,
      windSpeed: 15,
      conditions: 'Nublado',
      pressure: 1013,
      visibility: 10,
      description: 'Condiciones moderadas'
    };
  }
}

function getWeatherDescription(code: number): string {
  const descriptions: { [key: number]: string } = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna moderada',
    55: 'Llovizna densa',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    71: 'Nieve ligera',
    73: 'Nieve moderada',
    75: 'Nieve fuerte',
    80: 'Chubascos',
    95: 'Tormenta',
    96: 'Tormenta con granizo'
  };
  return descriptions[code] || 'Condiciones variables';
}

function getDetailedDescription(code: number): string {
  if (code === 0 || code === 1) return 'Excelentes condiciones para volar';
  if (code === 2 || code === 3) return 'Buenas condiciones para volar';
  if (code >= 45 && code <= 48) return 'Visibilidad reducida, navegación instrumental';
  if (code >= 51 && code <= 65) return 'Precipitaciones, condiciones normales de vuelo';
  if (code >= 71 && code <= 75) return 'Nevadas, procedimientos estándar de invierno';
  if (code >= 80 && code <= 82) return 'Chubascos, posibles turbulencias ligeras';
  if (code >= 95) return 'Actividad tormentosa, posible desviación de ruta';
  return 'Condiciones normales de vuelo';
}

export interface RouteWeather {
  origin: WeatherData;
  destination: WeatherData;
  midpoint?: WeatherData;
}

export async function getRouteWeather(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<RouteWeather> {
  const [origin, destination] = await Promise.all([
    getWeather(originLat, originLon),
    getWeather(destLat, destLon)
  ]);
  
  // Obtener clima en el punto medio de la ruta
  const midLat = (originLat + destLat) / 2;
  const midLon = (originLon + destLon) / 2;
  const midpoint = await getWeather(midLat, midLon);
  
  return { origin, destination, midpoint };
}

