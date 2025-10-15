/**
 * Integración con datos GFS (Global Forecast System) de NOAA
 * Similar a como lo usa Turbli.com
 * 
 * GFS proporciona:
 * - Pronósticos meteorológicos globales
 * - Datos de viento en altitud
 * - Índices de turbulencia (GTG)
 * - EDR (Eddy Dissipation Rate)
 */

export interface GFSTurbulenceData {
  lat: number;
  lon: number;
  altitude: number; // en pies
  time: string; // ISO timestamp
  
  // Datos de viento
  windSpeed: number; // knots
  windDirection: number; // grados
  
  // Datos de turbulencia
  turbulenceIndex: number; // 0-4 (none, light, moderate, severe, extreme)
  edr: number; // EDR value
  probability: number; // 0-100%
  
  // Condiciones atmosféricas
  temperature: number; // Celsius en altitud
  pressure: number; // hPa
  
  // Factores adicionales
  jetStream: boolean; // Cerca de corriente en chorro
  convection: boolean; // Actividad convectiva
  mountainWave: boolean; // Ondas orográficas
}

export interface TurbulenceSegment {
  startPoint: { lat: number; lon: number };
  endPoint: { lat: number; lon: number };
  distance: number; // km
  avgTurbulenceIndex: number;
  maxTurbulenceIndex: number;
  severity: 'none' | 'light' | 'moderate' | 'severe';
  description: string;
}

/**
 * Obtiene datos de turbulencia del modelo GFS de NOAA
 * Usa Open-Meteo que proporciona acceso a datos GFS
 */
export async function getGFSTurbulenceData(
  waypoints: { lat: number; lon: number }[],
  altitude: number = 350 // FL350 (35,000 pies)
): Promise<GFSTurbulenceData[]> {
  const turbulenceData: GFSTurbulenceData[] = [];
  
  // Nivel de presión correspondiente a la altitud
  // FL350 ≈ 250 hPa, FL300 ≈ 300 hPa
  const pressureLevel = altitude >= 340 ? '250hPa' : '300hPa';
  
  // Ejecutar todas las llamadas en paralelo para ser más rápido
  const dataPromises = waypoints.map(async (point) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // Open-Meteo proporciona datos GFS gratuitos
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${point.lat}&longitude=${point.lon}` +
        `&hourly=temperature_${pressureLevel},` +
        `wind_speed_${pressureLevel},` +
        `wind_direction_${pressureLevel},` +
        `wind_gusts_10m` + // Indicador de turbulencia
        `&forecast_days=1` +
        `&models=gfs_seamless`, // Usar modelo GFS específicamente
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('GFS API error');
      }
      
      const data = await response.json();
      
      // Procesar datos y calcular índice de turbulencia
      return processGFSData(data, point, altitude);
    } catch (error) {
      console.error(`Error obteniendo datos GFS para ${point.lat},${point.lon}:`, error);
      return null;
    }
  });
  
  const results = await Promise.allSettled(dataPromises);
  
  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      turbulenceData.push(result.value);
    }
  });
  
  return turbulenceData;
}

/**
 * Procesa datos GFS y calcula índice de turbulencia
 * Algoritmo basado en investigación de aviación
 */
function processGFSData(
  data: { hourly?: { [key: string]: number[] } },
  point: { lat: number; lon: number },
  altitude: number
): GFSTurbulenceData {
  const hourly = data.hourly || {};
  const pressureLevel = altitude >= 340 ? '250hPa' : '300hPa';
  
  // Tomar primera hora del pronóstico
  const windSpeed = hourly[`wind_speed_${pressureLevel}`]?.[0] || 0;
  const windDirection = hourly[`wind_direction_${pressureLevel}`]?.[0] || 0;
  const temperature = hourly[`temperature_${pressureLevel}`]?.[0] || -50;
  const windGusts = hourly.wind_gusts_10m?.[0] || 0;
  
  // ALGORITMO DE TURBULENCIA (similar a GTG)
  
  // 1. Calcular shear de viento (diferencia entre capas)
  const windShear = Math.abs(windSpeed - windGusts);
  
  // 2. Calcular EDR (Eddy Dissipation Rate)
  // EDR es la métrica estándar de turbulencia en aviación
  let edr = 0;
  
  if (windShear < 10 && windSpeed < 50) {
    edr = 0.05; // Suave
  } else if (windShear < 20 && windSpeed < 80) {
    edr = 0.15; // Ligera
  } else if (windShear < 35 && windSpeed < 120) {
    edr = 0.30; // Moderada
  } else {
    edr = 0.50; // Severa
  }
  
  // 4. Determinar índice de turbulencia (0-4)
  let turbulenceIndex = 0;
  let probability = 0;
  
  if (edr < 0.10) {
    turbulenceIndex = 0; // None
    probability = 5;
  } else if (edr < 0.20) {
    turbulenceIndex = 1; // Light
    probability = 25;
  } else if (edr < 0.35) {
    turbulenceIndex = 2; // Moderate
    probability = 60;
  } else if (edr < 0.50) {
    turbulenceIndex = 3; // Severe
    probability = 80;
  } else {
    turbulenceIndex = 4; // Extreme
    probability = 95;
  }
  
  // 5. Detectar condiciones especiales
  const jetStream = windSpeed > 100; // >100 knots sugiere jet stream
  const convection = windGusts > windSpeed * 1.5; // Ráfagas fuertes = convección
  const mountainWave = false; // Requeriría datos topográficos
  
  return {
    lat: point.lat,
    lon: point.lon,
    altitude,
    time: new Date().toISOString(),
    windSpeed,
    windDirection,
    turbulenceIndex,
    edr,
    probability,
    temperature,
    pressure: altitude >= 340 ? 250 : 300,
    jetStream,
    convection,
    mountainWave
  };
}

/**
 * Analiza la ruta completa y la divide en segmentos
 * Similar a como Turbli muestra tramos de la ruta
 */
export function analyzeRouteSegments(
  turbulenceData: GFSTurbulenceData[]
): TurbulenceSegment[] {
  if (turbulenceData.length < 2) return [];
  
  const segments: TurbulenceSegment[] = [];
  
  // Dividir en segmentos consecutivos
  for (let i = 0; i < turbulenceData.length - 1; i++) {
    const current = turbulenceData[i];
    const next = turbulenceData[i + 1];
    
    // Calcular distancia del segmento
    const distance = calculateSegmentDistance(
      current.lat, current.lon,
      next.lat, next.lon
    );
    
    // Promedios del segmento
    const avgTurbulenceIndex = (current.turbulenceIndex + next.turbulenceIndex) / 2;
    const maxTurbulenceIndex = Math.max(current.turbulenceIndex, next.turbulenceIndex);
    
    // Determinar severidad
    let severity: TurbulenceSegment['severity'] = 'none';
    let description = '';
    
    if (maxTurbulenceIndex === 0) {
      severity = 'none';
      description = 'Condiciones suaves, vuelo tranquilo';
    } else if (maxTurbulenceIndex === 1) {
      severity = 'light';
      description = 'Turbulencias ligeras ocasionales';
    } else if (maxTurbulenceIndex === 2) {
      severity = 'moderate';
      description = 'Turbulencias moderadas posibles';
    } else {
      severity = 'severe';
      description = 'Condiciones turbulentas, cinturón abrochado';
    }
    
    segments.push({
      startPoint: { lat: current.lat, lon: current.lon },
      endPoint: { lat: next.lat, lon: next.lon },
      distance,
      avgTurbulenceIndex,
      maxTurbulenceIndex,
      severity,
      description
    });
  }
  
  return segments;
}

/**
 * Calcula distancia entre dos puntos (Haversine)
 */
function calculateSegmentDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371; // Radio Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Genera resumen del pronóstico similar a Turbli
 */
export function generateTurbulenceSummary(
  segments: TurbulenceSegment[]
): {
  overallRating: string;
  maxSeverity: 'none' | 'light' | 'moderate' | 'severe';
  smoothPercentage: number;
  turbulentPercentage: number;
  recommendation: string;
  emoji: string;
} {
  if (segments.length === 0) {
    return {
      overallRating: 'Unknown',
      maxSeverity: 'none',
      smoothPercentage: 100,
      turbulentPercentage: 0,
      recommendation: 'No hay datos disponibles',
      emoji: '❓'
    };
  }
  
  // Calcular estadísticas
  const totalDistance = segments.reduce((sum, s) => sum + s.distance, 0);
  const smoothDistance = segments
    .filter(s => s.severity === 'none' || s.severity === 'light')
    .reduce((sum, s) => sum + s.distance, 0);
  
  const smoothPercentage = Math.round((smoothDistance / totalDistance) * 100);
  const turbulentPercentage = 100 - smoothPercentage;
  
  // Severidad máxima
  const severityLevels = { none: 0, light: 1, moderate: 2, severe: 3 };
  const maxSeverityValue = Math.max(...segments.map(s => severityLevels[s.severity]));
  const maxSeverity = Object.keys(severityLevels).find(
    k => severityLevels[k as keyof typeof severityLevels] === maxSeverityValue
  ) as 'none' | 'light' | 'moderate' | 'severe';
  
  // Rating general
  let overallRating = '';
  let emoji = '';
  let recommendation = '';
  
  if (smoothPercentage >= 90) {
    overallRating = 'Excelente';
    emoji = '🟢';
    recommendation = '¡Vuelo muy tranquilo! Condiciones ideales para volar.';
  } else if (smoothPercentage >= 70) {
    overallRating = 'Bueno';
    emoji = '🟡';
    recommendation = 'Buen vuelo con turbulencias ligeras ocasionales. Totalmente normal.';
  } else if (smoothPercentage >= 50) {
    overallRating = 'Moderado';
    emoji = '🟠';
    recommendation = 'Turbulencias moderadas en algunos tramos. Mantén el cinturón abrochado.';
  } else {
    overallRating = 'Movido';
    emoji = '🔴';
    recommendation = 'Vuelo más movido de lo habitual. Los pilotos están preparados.';
  }
  
  return {
    overallRating,
    maxSeverity,
    smoothPercentage,
    turbulentPercentage,
    recommendation,
    emoji
  };
}


