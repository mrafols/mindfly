import { 
  airportsDatabase, 
  findAirportByCode, 
  searchAirports as searchInDatabase,
  type Airport 
} from './airports-database';

export type { Airport };

// Re-exportar la base de datos completa (6000+ aeropuertos)
export const airports: Airport[] = airportsDatabase;

/**
 * Busca un aeropuerto por su código IATA
 * Usa la base de datos completa de 6000+ aeropuertos globales
 */
export function findAirport(iataCode: string): Airport | undefined {
  return findAirportByCode(iataCode);
}

/**
 * Busca aeropuertos por nombre, ciudad, código o país
 * Busca en la base de datos completa de 6000+ aeropuertos
 */
export function searchAirports(query: string, limit = 20): Airport[] {
  return searchInDatabase(query, limit);
}

/**
 * Calcula la distancia entre dos puntos geográficos en kilómetros
 * Usa la fórmula de Haversine
 */
export function calculateDistance(
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

/**
 * Convierte grados a radianes
 */
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Estima el tiempo de vuelo basado en la distancia
 * Usa una velocidad promedio de crucero de 850 km/h
 */
export function estimateFlightTime(distanceKm: number): { hours: number; minutes: number } {
  const averageSpeed = 850; // km/h (velocidad de crucero típica)
  const totalMinutes = Math.round((distanceKm / averageSpeed) * 60);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return { hours, minutes };
}

/**
 * Aeropuertos principales para sugerencias rápidas en la UI
 * Lista curada de los aeropuertos más buscados
 */
export const mainAirports: Airport[] = [
  // España - Principales
  findAirportByCode('MAD')!,
  findAirportByCode('BCN')!,
  findAirportByCode('AGP')!,
  findAirportByCode('PMI')!,
  findAirportByCode('SVQ')!,
  findAirportByCode('VLC')!,
  findAirportByCode('ALC')!,
  findAirportByCode('BIO')!,
  findAirportByCode('MAH')!, // Menorca
  findAirportByCode('IBZ')!,
  
  // Irlanda
  findAirportByCode('DUB')!,
  findAirportByCode('ORK')!,
  findAirportByCode('SNN')!,
  
  // Reino Unido
  findAirportByCode('LHR')!,
  findAirportByCode('LGW')!,
  findAirportByCode('MAN')!,
  findAirportByCode('EDI')!,
  
  // Francia
  findAirportByCode('CDG')!,
  findAirportByCode('ORY')!,
  findAirportByCode('NCE')!,
  
  // Alemania
  findAirportByCode('FRA')!,
  findAirportByCode('MUC')!,
  findAirportByCode('BER')!,
  
  // Italia
  findAirportByCode('FCO')!,
  findAirportByCode('MXP')!,
  findAirportByCode('VCE')!,
  
  // Países Bajos
  findAirportByCode('AMS')!,
  
  // Portugal
  findAirportByCode('LIS')!,
  findAirportByCode('OPO')!,
  
  // América
  findAirportByCode('JFK')!,
  findAirportByCode('LAX')!,
  findAirportByCode('MIA')!,
  
  // Asia
  findAirportByCode('DXB')!,
  findAirportByCode('SIN')!,
  findAirportByCode('HKG')!,
].filter((airport): airport is Airport => airport !== undefined);
