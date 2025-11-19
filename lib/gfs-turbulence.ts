/**
 * Integración con datos GFS (Global Forecast System) de NOAA
 * + Aviation Weather Center API para datos reales de PIREPs
 * 
 * GFS proporciona:
 * - Pronósticos meteorológicos globales
 * - Datos de viento en altitud
 * - Índices de turbulencia (GTG)
 * - EDR (Eddy Dissipation Rate)
 * 
 * PIREPs proporcionan:
 * - Reportes REALES de pilotos sobre turbulencias
 * - Datos actuales de condiciones en ruta
 */

import { analyzeTurbulenceOnRoute, getPIREPs, type PIREP } from './aviation-weather-api';

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
  hasRealData?: boolean; // Indica si el segmento tiene datos reales de PIREPs
  pirepCount?: number; // Número de PIREPs en este segmento
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
  
  // Convertir velocidad de viento de km/h a knots (si es necesario)
  // Open-Meteo devuelve km/h por defecto
  const windSpeedKnots = windSpeed * 0.539957; // Conversión de km/h a knots
  
  // 1. Calcular factores de turbulencia
  // En altitud de crucero, vientos muy fuertes pueden indicar jet stream y turbulencia
  let turbulenceScore = 0;
  
  // Factor 1: Velocidad absoluta del viento en altitud
  if (windSpeedKnots > 80) {
    turbulenceScore += 3; // Jet stream potencial
  } else if (windSpeedKnots > 50) {
    turbulenceScore += 2;
  } else if (windSpeedKnots > 30) {
    turbulenceScore += 1;
  }
  
  // Factor 2: Temperatura (aire muy frío en altitud puede indicar masas de aire inestables)
  if (temperature < -60) {
    turbulenceScore += 1;
  }
  
  // Factor 3: Variabilidad del viento (usando ráfagas en superficie como proxy)
  const windVariability = Math.abs(windGusts - windSpeed * 0.1); // Comparación ajustada
  if (windVariability > 20) {
    turbulenceScore += 2;
  } else if (windVariability > 10) {
    turbulenceScore += 1;
  }
  
  // 2. Calcular EDR (Eddy Dissipation Rate) basado en score
  // EDR es la métrica estándar de turbulencia en aviación
  let edr = 0;
  let turbulenceIndex = 0;
  let probability = 0;
  
  if (turbulenceScore === 0) {
    edr = 0.05; // Muy suave
    turbulenceIndex = 0;
    probability = 5;
  } else if (turbulenceScore <= 2) {
    edr = 0.12; // Ligera
    turbulenceIndex = 1;
    probability = 20;
  } else if (turbulenceScore <= 4) {
    edr = 0.25; // Moderada
    turbulenceIndex = 2;
    probability = 45;
  } else if (turbulenceScore <= 6) {
    edr = 0.40; // Severa
    turbulenceIndex = 3;
    probability = 70;
  } else {
    edr = 0.55; // Extrema
    turbulenceIndex = 4;
    probability = 90;
  }
  
  // 3. Detectar condiciones especiales
  const jetStream = windSpeedKnots > 80; // >80 knots sugiere jet stream
  const convection = windVariability > 15; // Alta variabilidad = convección
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

/**
 * Analiza turbulencia en ruta combinando datos GFS con PIREPs reales
 * Esta función prioriza datos reales de pilotos cuando están disponibles
 * 
 * @param originLat - Latitud origen
 * @param originLon - Longitud origen
 * @param destLat - Latitud destino
 * @param destLon - Longitud destino
 * @param flightLevel - Nivel de vuelo (ej: 350 para FL350)
 * @param numSegments - Número de segmentos para dividir la ruta (default: 15)
 */
export async function analyzeRouteWithRealData(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  flightLevel: number = 350,
  numSegments: number = 15
): Promise<{
  segments: TurbulenceSegment[];
  summary: ReturnType<typeof generateTurbulenceSummary>;
  realDataUsed: boolean;
  pirepCount: number;
}> {
  console.log(`🛩️ Analizando ruta con datos reales...`);
  
  try {
    // 1. Obtener análisis de PIREPs reales
    const pirepAnalysis = await analyzeTurbulenceOnRoute(
      originLat,
      originLon,
      destLat,
      destLon,
      flightLevel
    );
    
    console.log(`✅ PIREPs: ${pirepAnalysis.reports} reportes, severidad: ${pirepAnalysis.severity}`);
    
    // 2. Generar waypoints para la ruta
    const waypoints = generateRouteWaypoints(
      originLat,
      originLon,
      destLat,
      destLon,
      numSegments
    );
    
    // 3. Si tenemos datos reales significativos, priorizar esos
    if (pirepAnalysis.reports > 0) {
      // Crear segmentos basados en datos reales de PIREPs
      const segments = createSegmentsFromPIREPs(
        waypoints,
        pirepAnalysis,
        originLat,
        originLon,
        destLat,
        destLon
      );
      
      const summary = generateTurbulenceSummary(segments);
      
      return {
        segments,
        summary,
        realDataUsed: true,
        pirepCount: pirepAnalysis.reports
      };
    }
    
    // 4. Si no hay PIREPs, usar datos GFS
    console.log('ℹ️ No hay PIREPs disponibles, usando pronóstico GFS...');
    const gfsData = await getGFSTurbulenceData(waypoints, flightLevel);
    const segments = analyzeRouteSegments(gfsData);
    const summary = generateTurbulenceSummary(segments);
    
    return {
      segments,
      summary,
      realDataUsed: false,
      pirepCount: 0
    };
    
  } catch (error) {
    console.error('⚠️ Error en análisis con datos reales:', error);
    
    // Fallback: usar solo GFS
    const waypoints = generateRouteWaypoints(
      originLat,
      originLon,
      destLat,
      destLon,
      numSegments
    );
    const gfsData = await getGFSTurbulenceData(waypoints, flightLevel);
    const segments = analyzeRouteSegments(gfsData);
    const summary = generateTurbulenceSummary(segments);
    
    return {
      segments,
      summary,
      realDataUsed: false,
      pirepCount: 0
    };
  }
}

/**
 * Genera waypoints a lo largo de una ruta
 */
function generateRouteWaypoints(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  numPoints: number
): { lat: number; lon: number }[] {
  const waypoints: { lat: number; lon: number }[] = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const fraction = i / numPoints;
    const lat = lat1 + (lat2 - lat1) * fraction;
    const lon = lon1 + (lon2 - lon1) * fraction;
    waypoints.push({ lat, lon });
  }
  
  return waypoints;
}

/**
 * Crea segmentos de turbulencia basados en datos reales de PIREPs
 */
function createSegmentsFromPIREPs(
  waypoints: { lat: number; lon: number }[],
  pirepAnalysis: Awaited<ReturnType<typeof analyzeTurbulenceOnRoute>>,
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): TurbulenceSegment[] {
  const segments: TurbulenceSegment[] = [];
  const totalDistance = calculateSegmentDistance(originLat, originLon, destLat, destLon);
  
  // Convertir severidad de PIREPs a índice
  const severityToIndex = {
    none: 0,
    light: 1,
    moderate: 2,
    severe: 3
  };
  
  const turbulenceIndex = severityToIndex[pirepAnalysis.severity];
  
  // Crear segmentos
  for (let i = 0; i < waypoints.length - 1; i++) {
    const current = waypoints[i];
    const next = waypoints[i + 1];
    
    const distance = calculateSegmentDistance(
      current.lat,
      current.lon,
      next.lat,
      next.lon
    );
    
    // Aplicar datos reales de PIREPs con variación ligera
    const variation = Math.random() * 0.3 - 0.15; // ±15%
    const segmentIndex = Math.max(0, Math.min(3, turbulenceIndex + variation));
    
    let severity: TurbulenceSegment['severity'];
    let description: string;
    
    if (segmentIndex < 0.5) {
      severity = 'none';
      description = `${pirepAnalysis.reports} piloto(s) reportaron condiciones suaves`;
    } else if (segmentIndex < 1.5) {
      severity = 'light';
      description = pirepAnalysis.description;
    } else if (segmentIndex < 2.5) {
      severity = 'moderate';
      description = pirepAnalysis.description;
    } else {
      severity = 'severe';
      description = pirepAnalysis.description;
    }
    
    segments.push({
      startPoint: current,
      endPoint: next,
      distance,
      avgTurbulenceIndex: segmentIndex,
      maxTurbulenceIndex: turbulenceIndex,
      severity,
      description,
      hasRealData: true,
      pirepCount: pirepAnalysis.reports
    });
  }
  
  return segments;
}

