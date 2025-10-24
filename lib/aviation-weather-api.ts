/**
 * Integración con Aviation Weather Center Data API
 * API oficial del gobierno de EE.UU. para datos meteorológicos de aviación
 * https://aviationweather.gov/data/api/
 * 
 * Proporciona:
 * - PIREPs (Pilot Reports) - Reportes reales de pilotos sobre turbulencias
 * - G-AIRMETs - Avisos meteorológicos de aviación
 * - METARs - Observaciones meteorológicas
 */

// Interfaces para PIREPs
export interface PIREP {
  receiptTime: string;
  obsTime: string;
  reportType: string;
  lat: number;
  lon: number;
  flightLevel?: number;
  aircraftRef?: string;
  turbulence?: {
    intensity: string;
    baseFlightLevel?: number;
    topFlightLevel?: number;
  };
  rawText: string;
}

interface PIREPResponse {
  pireps?: PIREP[];
}

// Interfaces para G-AIRMETs
interface GAirmet {
  validTimeFrom: string;
  validTimeTo: string;
  hazard: string;
  severity?: string;
  minFlightLevel?: number;
  maxFlightLevel?: number;
  geom: {
    coordinates: number[][][];
  };
  rawText?: string;
}

interface GAirmetResponse {
  gairmets?: GAirmet[];
}

// Tipos de turbulencia según Aviation Weather
type TurbulenceIntensity = 'LGT' | 'MOD' | 'SEV' | 'SMOOTH' | 'NEG';

/**
 * Convierte intensidad PIREP a nuestro formato
 */
function convertTurbulenceIntensity(intensity: string): 'none' | 'light' | 'moderate' | 'severe' {
  const intensityUpper = intensity.toUpperCase();
  
  if (intensityUpper.includes('SMOOTH') || intensityUpper.includes('NEG')) {
    return 'none';
  } else if (intensityUpper.includes('LGT') || intensityUpper.includes('LIGHT')) {
    return 'light';
  } else if (intensityUpper.includes('MOD') || intensityUpper.includes('MODERATE')) {
    return 'moderate';
  } else if (intensityUpper.includes('SEV') || intensityUpper.includes('SEVERE') || intensityUpper.includes('EXTREME')) {
    return 'severe';
  }
  
  return 'light'; // Default conservador
}

/**
 * Obtiene PIREPs (reportes de pilotos) en un área y tiempo específicos
 * 
 * @param lat - Latitud central
 * @param lon - Longitud central
 * @param radiusNM - Radio en millas náuticas (máx 200)
 * @param hoursBack - Horas hacia atrás (máx 12)
 */
export async function getPIREPs(
  lat: number,
  lon: number,
  radiusNM: number = 100,
  hoursBack: number = 3
): Promise<PIREP[]> {
  try {
    // Calcular tiempo
    const now = new Date();
    const startTime = new Date(now.getTime() - hoursBack * 60 * 60 * 1000);
    
    const startTimeStr = startTime.toISOString().split('.')[0] + 'Z';
    const endTimeStr = now.toISOString().split('.')[0] + 'Z';
    
    // Construir URL con parámetros
    const params = new URLSearchParams({
      format: 'json',
      date: startTimeStr,
      endDate: endTimeStr,
      location: `${lat},${lon}`,
      distance: `${radiusNM}`
    });
    
    const url = `https://aviationweather.gov/api/data/pirep?${params.toString()}`;
    
    console.log('🛩️ Solicitando PIREPs:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MindFly-Weather-App/1.0'
      },
      signal: AbortSignal.timeout(10000) // 10 segundos timeout
    });
    
    if (!response.ok) {
      if (response.status === 204) {
        console.log('ℹ️ No hay PIREPs disponibles en esta área');
        return [];
      }
      throw new Error(`Aviation Weather API error: ${response.status}`);
    }
    
    const data: PIREPResponse = await response.json();
    
    if (!data.pireps || data.pireps.length === 0) {
      console.log('ℹ️ No se encontraron PIREPs');
      return [];
    }
    
    console.log(`✅ ${data.pireps.length} PIREPs encontrados`);
    return data.pireps;
    
  } catch (error) {
    console.error('⚠️ Error obteniendo PIREPs:', error);
    return [];
  }
}

/**
 * Obtiene G-AIRMETs (avisos de turbulencia) actuales
 * Solo disponible para CONUS (Estados Unidos continental)
 */
export async function getGAIRMETs(): Promise<GAirmet[]> {
  try {
    const url = 'https://aviationweather.gov/api/data/gairmet?format=json&hazard=turb';
    
    console.log('🌪️ Solicitando G-AIRMETs...');
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MindFly-Weather-App/1.0'
      },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      if (response.status === 204) {
        console.log('ℹ️ No hay G-AIRMETs activos');
        return [];
      }
      throw new Error(`Aviation Weather API error: ${response.status}`);
    }
    
    const data: GAirmetResponse = await response.json();
    
    if (!data.gairmets || data.gairmets.length === 0) {
      console.log('ℹ️ No se encontraron G-AIRMETs');
      return [];
    }
    
    console.log(`✅ ${data.gairmets.length} G-AIRMETs encontrados`);
    return data.gairmets;
    
  } catch (error) {
    console.error('⚠️ Error obteniendo G-AIRMETs:', error);
    return [];
  }
}

/**
 * Analiza turbulencia en una ruta basándose en PIREPs reales
 * 
 * @param originLat - Latitud origen
 * @param originLon - Longitud origen
 * @param destLat - Latitud destino
 * @param destLon - Longitud destino
 * @param flightLevel - Nivel de vuelo en FL (ej: 350 para FL350)
 */
export async function analyzeTurbulenceOnRoute(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number,
  flightLevel: number = 350
): Promise<{
  severity: 'none' | 'light' | 'moderate' | 'severe';
  probability: number;
  reports: number;
  description: string;
  pireps: PIREP[];
}> {
  try {
    // Calcular punto medio de la ruta
    const midLat = (originLat + destLat) / 2;
    const midLon = (originLon + destLon) / 2;
    
    // Calcular radio aproximado (la mitad de la distancia de la ruta + margen)
    const distance = calculateDistance(originLat, originLon, destLat, destLon);
    const radiusNM = Math.min(Math.round(distance / 2 / 1.852) + 50, 200); // km a NM + margen, máx 200
    
    // Obtener PIREPs en el área
    const pireps = await getPIREPs(midLat, midLon, radiusNM, 3);
    
    if (pireps.length === 0) {
      return {
        severity: 'light',
        probability: 20,
        reports: 0,
        description: 'No hay reportes recientes de pilotos en esta ruta. Condiciones esperadas: ligeras.',
        pireps: []
      };
    }
    
    // Filtrar PIREPs relevantes por altitud (±5000 ft del nivel de vuelo)
    const targetAlt = flightLevel * 100; // FL a pies
    const relevantPireps = pireps.filter(p => {
      if (!p.flightLevel) return true; // Incluir si no tiene nivel de vuelo
      const pirepAlt = p.flightLevel * 100;
      return Math.abs(pirepAlt - targetAlt) <= 5000;
    });
    
    // Analizar severidad de los reportes
    const turbulentPireps = relevantPireps.filter(p => p.turbulence);
    
    if (turbulentPireps.length === 0) {
      return {
        severity: 'none',
        probability: 10,
        reports: relevantPireps.length,
        description: `${relevantPireps.length} reporte(s) reciente(s) sin turbulencia reportada. Vuelo suave esperado.`,
        pireps: relevantPireps
      };
    }
    
    // Encontrar la severidad máxima
    const severities: ('none' | 'light' | 'moderate' | 'severe')[] = [];
    
    turbulentPireps.forEach(p => {
      if (p.turbulence) {
        const severity = convertTurbulenceIntensity(p.turbulence.intensity);
        severities.push(severity);
      }
    });
    
    // Determinar severidad máxima
    const severityOrder = ['none', 'light', 'moderate', 'severe'] as const;
    let maxSeverity: 'none' | 'light' | 'moderate' | 'severe' = 'none';
    
    for (const sev of severityOrder) {
      if (severities.includes(sev)) {
        maxSeverity = sev;
      }
    }
    
    // Calcular probabilidad basada en proporción de reportes con turbulencia
    const turbulenceRatio = turbulentPireps.length / relevantPireps.length;
    const baseProbability = turbulenceRatio * 100;
    
    // Ajustar probabilidad según severidad
    let probability = baseProbability;
    if (maxSeverity === 'severe') {
      probability = Math.min(probability * 1.5, 95);
    } else if (maxSeverity === 'moderate') {
      probability = Math.min(probability * 1.3, 85);
    }
    
    // Generar descripción
    const severityText = {
      none: 'suaves',
      light: 'ligeras',
      moderate: 'moderadas',
      severe: 'severas'
    };
    
    const description = turbulentPireps.length === 1
      ? `1 piloto reportó turbulencias ${severityText[maxSeverity]} en esta ruta (FL${flightLevel}).`
      : `${turbulentPireps.length} pilotos reportaron turbulencias ${severityText[maxSeverity]} en esta ruta (FL${flightLevel}).`;
    
    return {
      severity: maxSeverity,
      probability: Math.round(probability),
      reports: relevantPireps.length,
      description,
      pireps: relevantPireps
    };
    
  } catch (error) {
    console.error('⚠️ Error analizando turbulencia en ruta:', error);
    
    // Fallback conservador
    return {
      severity: 'light',
      probability: 30,
      reports: 0,
      description: 'No se pudieron obtener datos en tiempo real. Estimación conservadora: turbulencias ligeras posibles.',
      pireps: []
    };
  }
}

/**
 * Calcula distancia entre dos puntos (Haversine)
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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
 * Verifica si una coordenada está dentro del área CONUS (para G-AIRMETs)
 */
export function isInCONUS(lat: number, lon: number): boolean {
  // Aproximación del área continental de EE.UU.
  return lat >= 24 && lat <= 49 && lon >= -125 && lon <= -66;
}

/**
 * Obtiene una descripción legible de un PIREP
 */
export function formatPIREP(pirep: PIREP): string {
  const time = new Date(pirep.obsTime).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'UTC'
  });
  
  const alt = pirep.flightLevel ? `FL${pirep.flightLevel}` : 'altitud no especificada';
  const aircraft = pirep.aircraftRef || 'aeronave no especificada';
  
  if (pirep.turbulence) {
    const intensity = pirep.turbulence.intensity;
    return `${time} UTC - ${aircraft} en ${alt}: Turbulencia ${intensity}`;
  }
  
  return `${time} UTC - ${aircraft} en ${alt}: ${pirep.rawText}`;
}

