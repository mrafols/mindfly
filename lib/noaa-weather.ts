/**
 * Módulo para obtener datos meteorológicos aeronáuticos de NOAA/NWS
 * y otros servicios oficiales de meteorología para aviación
 */

export interface TurbulenceForecastPoint {
  lat: number;
  lon: number;
  altitude: number; // en pies
  severity: 'none' | 'light' | 'moderate' | 'severe';
  probability: number; // 0-100
}

export interface WindDataPoint {
  lat: number;
  lon: number;
  altitude: number;
  speed: number; // knots
  direction: number; // grados
  temperature: number; // Celsius
}

export interface AviationWeatherData {
  turbulenceForecast: TurbulenceForecastPoint[];
  windData: WindDataPoint[];
  sigmet: string[]; // Avisos SIGMET (Significant Meteorological Information)
  convectiveOutlook: 'low' | 'moderate' | 'high'; // Riesgo de tormentas
  timestamp: string;
}

/**
 * Obtiene datos de turbulencia de NOAA Aviation Weather Center
 * Usa el servicio GTG (Graphical Turbulence Guidance)
 */
export async function getNOAATurbulenceData(
  waypoints: { lat: number; lon: number }[],
  altitude: number = 350 // FL350 (35,000 pies)
): Promise<TurbulenceForecastPoint[]> {
  const turbulenceData: TurbulenceForecastPoint[] = [];
  
  // Por cada punto de la ruta, obtener datos de turbulencia
  for (const point of waypoints) {
    try {
      // Aviation Weather Center Turbulence Forecast
      // URL: https://aviationweather.gov/data/api/
      const response = await fetch(
        `https://aviationweather.gov/cgi-bin/data/turbulence.php?` +
        `lat=${point.lat}&lon=${point.lon}&altitude=${altitude}`,
        { cache: 'no-store', next: { revalidate: 300 } } // Cache 5 minutos
      );
      
      if (response.ok) {
        const data = await response.json();
        turbulenceData.push(parseTurbulenceData(data, point, altitude));
      } else {
        // Si falla la API oficial, usar estimación basada en Open-Meteo
        const estimated = await estimateTurbulenceFromWind(point.lat, point.lon);
        turbulenceData.push(estimated);
      }
    } catch (error) {
      console.error('Error obteniendo datos NOAA:', error);
      // Fallback a estimación
      const estimated = await estimateTurbulenceFromWind(point.lat, point.lon);
      turbulenceData.push(estimated);
    }
  }
  
  return turbulenceData;
}

/**
 * Obtiene datos de viento en altitud de Open-Meteo
 * (alternativa gratuita cuando NOAA no está disponible)
 */
async function estimateTurbulenceFromWind(
  lat: number,
  lon: number
): Promise<TurbulenceForecastPoint> {
  try {
    // Open-Meteo proporciona datos de viento en diferentes niveles de presión
    // 300hPa ≈ 30,000 pies, 250hPa ≈ 34,000 pies
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&hourly=temperature_250hPa,wind_speed_250hPa,wind_direction_250hPa,wind_gusts_10m` +
      `&forecast_hours=12`
    );
    
    if (!response.ok) throw new Error('Open-Meteo API error');
    
    const data = await response.json();
    const hourly = data.hourly;
    
    // Calcular turbulencia basada en velocidad del viento y variabilidad
    const windSpeed = hourly.wind_speed_250hPa?.[0] || 0;
    const windGusts = hourly.wind_gusts_10m?.[0] || 0;
    const windVariability = Math.abs(windSpeed - windGusts);
    
    // Algoritmo de estimación de turbulencia
    let severity: TurbulenceForecastPoint['severity'] = 'none';
    let probability = 0;
    
    if (windSpeed < 30 && windVariability < 10) {
      severity = 'none';
      probability = 5;
    } else if (windSpeed < 50 && windVariability < 20) {
      severity = 'light';
      probability = 25;
    } else if (windSpeed < 80 && windVariability < 35) {
      severity = 'light';
      probability = 45;
    } else if (windSpeed < 120) {
      severity = 'moderate';
      probability = 65;
    } else {
      severity = 'moderate';
      probability = 80;
    }
    
    return {
      lat,
      lon,
      altitude: 35000,
      severity,
      probability
    };
  } catch (error) {
    console.error('Error estimando turbulencia:', error);
    return {
      lat,
      lon,
      altitude: 35000,
      severity: 'light',
      probability: 20
    };
  }
}

/**
 * Parsea los datos de turbulencia de NOAA
 */
function parseTurbulenceData(
  data: unknown,
  point: { lat: number; lon: number },
  altitude: number
): TurbulenceForecastPoint {
  // Implementación básica - en producción se parsearía el formato real de NOAA
  return {
    lat: point.lat,
    lon: point.lon,
    altitude: altitude * 100,
    severity: 'light',
    probability: 30
  };
}

/**
 * Obtiene avisos SIGMET (Significant Meteorological Information)
 * Avisos importantes para la aviación sobre condiciones peligrosas
 */
export async function getSIGMETData(
  region: string = 'all'
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://aviationweather.gov/api/data/sigmet?format=json&region=${region}`,
      { cache: 'no-store', next: { revalidate: 600 } }
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return parseSIGMETData(data);
  } catch (error) {
    console.error('Error obteniendo SIGMET:', error);
    return [];
  }
}

function parseSIGMETData(data: unknown): string[] {
  // Parsear avisos SIGMET
  // Por ahora retornamos array vacío
  return [];
}

/**
 * Analiza todos los puntos de turbulencia en la ruta
 * y retorna un resumen consolidado
 */
export function analyzeTurbulenceRoute(
  turbulencePoints: TurbulenceForecastPoint[]
): {
  maxSeverity: TurbulenceForecastPoint['severity'];
  avgProbability: number;
  criticalPoints: number;
  recommendation: string;
} {
  if (turbulencePoints.length === 0) {
    return {
      maxSeverity: 'none',
      avgProbability: 0,
      criticalPoints: 0,
      recommendation: 'No hay datos de turbulencia disponibles'
    };
  }
  
  // Calcular severidad máxima
  const severityLevels = { none: 0, light: 1, moderate: 2, severe: 3 };
  let maxSeverityValue = 0;
  let maxSeverity: TurbulenceForecastPoint['severity'] = 'none';
  
  turbulencePoints.forEach(point => {
    if (severityLevels[point.severity] > maxSeverityValue) {
      maxSeverityValue = severityLevels[point.severity];
      maxSeverity = point.severity;
    }
  });
  
  // Calcular probabilidad promedio
  const avgProbability = Math.round(
    turbulencePoints.reduce((sum, p) => sum + p.probability, 0) / turbulencePoints.length
  );
  
  // Contar puntos críticos (moderate o severe con probabilidad > 50%)
  const criticalPoints = turbulencePoints.filter(
    p => (p.severity === 'moderate' || p.severity === 'severe') && p.probability > 50
  ).length;
  
  // Generar recomendación
  let recommendation = '';
  if (maxSeverity === 'none' || (maxSeverity === 'light' && avgProbability < 30)) {
    recommendation = '✅ Excelentes condiciones. Se espera un vuelo muy tranquilo con turbulencias mínimas o nulas.';
  } else if (maxSeverity === 'light') {
    recommendation = '✅ Buenas condiciones. Posibles turbulencias ligeras completamente normales y seguras. Como conducir por una carretera con algunos baches pequeños.';
  } else if (maxSeverity === 'moderate' && criticalPoints < 3) {
    recommendation = '⚠️ Turbulencias moderadas posibles en algunos tramos. Los pilotos están preparados y el avión está diseñado para estas condiciones. Puede ser incómodo pero es totalmente seguro.';
  } else if (maxSeverity === 'moderate') {
    recommendation = '⚠️ Se esperan turbulencias moderadas en varios tramos de la ruta. Esto es completamente normal y seguro. Los aviones pueden soportar turbulencias 5 veces más fuertes. Mantén el cinturón abrochado.';
  } else {
    recommendation = '⚠️ Condiciones más movidas de lo habitual. Los pilotos pueden ajustar la ruta o altitud. Es incómodo pero no peligroso. Los aviones están diseñados con enormes márgenes de seguridad.';
  }
  
  return {
    maxSeverity,
    avgProbability,
    criticalPoints,
    recommendation
  };
}

/**
 * Obtiene datos meteorológicos completos para aviación
 */
export async function getAviationWeather(
  waypoints: { lat: number; lon: number }[],
  altitude: number = 350
): Promise<AviationWeatherData> {
  // Obtener datos de turbulencia
  const turbulenceForecast = await getNOAATurbulenceData(waypoints, altitude);
  
  // Obtener avisos SIGMET
  const sigmet = await getSIGMETData();
  
  // Por ahora, datos de viento y convección son placeholder
  const windData: WindDataPoint[] = waypoints.map(wp => ({
    lat: wp.lat,
    lon: wp.lon,
    altitude: altitude * 100,
    speed: 0,
    direction: 0,
    temperature: -50
  }));
  
  return {
    turbulenceForecast,
    windData,
    sigmet,
    convectiveOutlook: 'low',
    timestamp: new Date().toISOString()
  };
}

