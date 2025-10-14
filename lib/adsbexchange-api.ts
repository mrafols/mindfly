/**
 * Integración con ADS-B Exchange API
 * La fuente de datos de vuelos sin filtrar más grande del mundo
 * https://www.adsbexchange.com/
 */

import { Flight } from './flights';

// Interfaces para ADS-B Exchange API v2
interface ADSBExchangeAircraft {
  hex: string; // ICAO hex code
  type?: string; // Tipo de aeronave (ej: A320, B738)
  flight?: string; // Callsign/número de vuelo
  r?: string; // Registration
  t?: string; // Tipo de aeronave
  alt_baro?: number; // Altitud barométrica en pies
  alt_geom?: number; // Altitud geométrica
  gs?: number; // Ground speed en knots
  track?: number; // Track en grados
  baro_rate?: number; // Velocidad vertical
  squawk?: string;
  category?: string;
  lat?: number;
  lon?: number;
  seen?: number; // Segundos desde la última actualización
  seen_pos?: number;
}

interface ADSBExchangeResponse {
  ac?: ADSBExchangeAircraft[]; // Lista de aeronaves
  total?: number;
  now?: number;
  msg?: string;
  ctime?: number;
  ptime?: number;
}

/**
 * Busca vuelos en tiempo real usando ADS-B Exchange API v2
 * Documentación: https://www.adsbexchange.com/version-2-api-wip/
 */
export async function searchFlightsADSBExchange(
  originIATA: string,
  destinationIATA: string
): Promise<Flight[]> {
  const apiKey = process.env.ADSBEXCHANGE_API_KEY;
  
  if (!apiKey) {
    console.warn('ADSBEXCHANGE_API_KEY no configurada');
    return [];
  }

  try {
    // ADS-B Exchange API v2 - Endpoint para búsqueda por ruta
    // Nota: La API v2 requiere coordenadas, no códigos IATA directamente
    // Necesitamos usar otro enfoque: buscar todos los vuelos y filtrar
    
    const response = await fetch(
      `https://adsbexchange-com1.p.rapidapi.com/v2/lat/40.4/lon/-3.6/dist/250/`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 60 } // Cache por 1 minuto
      }
    );

    if (!response.ok) {
      throw new Error(`ADS-B Exchange API error: ${response.status}`);
    }

    const data: ADSBExchangeResponse = await response.json();
    
    if (!data.ac || data.ac.length === 0) {
      return [];
    }

    // Filtrar y convertir los vuelos encontrados
    const flights = data.ac
      .filter(aircraft => aircraft.flight && aircraft.flight.trim() !== '')
      .map(aircraft => parseADSBExchangeFlight(aircraft))
      .filter((flight): flight is Flight => flight !== null);

    return flights;
  } catch (error) {
    console.error('Error con ADS-B Exchange:', error);
    return [];
  }
}

/**
 * Obtiene datos de un vuelo específico por su callsign/número de vuelo
 */
export async function getFlightByCallsign(callsign: string): Promise<Flight | null> {
  const apiKey = process.env.ADSBEXCHANGE_API_KEY;
  
  if (!apiKey) {
    console.warn('ADSBEXCHANGE_API_KEY no configurada');
    return null;
  }

  try {
    const response = await fetch(
      `https://adsbexchange-com1.p.rapidapi.com/v2/callsign/${callsign}/`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 30 }
      }
    );

    if (!response.ok) {
      throw new Error(`ADS-B Exchange API error: ${response.status}`);
    }

    const data: ADSBExchangeResponse = await response.json();
    
    if (!data.ac || data.ac.length === 0) {
      return null;
    }

    return parseADSBExchangeFlight(data.ac[0]);
  } catch (error) {
    console.error('Error obteniendo vuelo:', error);
    return null;
  }
}

/**
 * Busca vuelos en un área geográfica (latitud/longitud + distancia)
 */
export async function searchFlightsByArea(
  lat: number,
  lon: number,
  distanceKm: number = 250
): Promise<Flight[]> {
  const apiKey = process.env.ADSBEXCHANGE_API_KEY;
  
  if (!apiKey) {
    console.warn('ADSBEXCHANGE_API_KEY no configurada - Usando API pública');
    // Fallback a API pública sin autenticación (limitada)
    return searchFlightsPublicADSB(lat, lon, distanceKm);
  }

  try {
    const response = await fetch(
      `https://adsbexchange-com1.p.rapidapi.com/v2/lat/${lat}/lon/${lon}/dist/${distanceKm}/`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`ADS-B Exchange API error: ${response.status}`);
    }

    const data: ADSBExchangeResponse = await response.json();
    
    if (!data.ac || data.ac.length === 0) {
      return [];
    }

    const flights = data.ac
      .filter(aircraft => 
        aircraft.flight && 
        aircraft.flight.trim() !== '' &&
        aircraft.alt_baro && 
        aircraft.alt_baro > 5000 // Solo vuelos en crucero
      )
      .map(aircraft => parseADSBExchangeFlight(aircraft))
      .filter((flight): flight is Flight => flight !== null);

    return flights;
  } catch (error) {
    console.error('Error buscando vuelos por área:', error);
    return [];
  }
}

/**
 * API pública de ADS-B Exchange (sin autenticación, limitada)
 * Útil como fallback cuando no hay API key
 */
async function searchFlightsPublicADSB(
  lat: number,
  lon: number,
  distanceKm: number
): Promise<Flight[]> {
  try {
    // La API pública tiene endpoints limitados
    // Podemos usar el feed global y filtrar localmente
    const response = await fetch(
      'https://globe.adsbexchange.com/data/aircraft.json',
      {
        cache: 'no-store',
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      return [];
    }

    const data: ADSBExchangeResponse = await response.json();
    
    if (!data.ac || data.ac.length === 0) {
      return [];
    }

    // Filtrar vuelos dentro del área
    const flights = data.ac
      .filter(aircraft => {
        if (!aircraft.lat || !aircraft.lon || !aircraft.flight) return false;
        const distance = calculateDistance(lat, lon, aircraft.lat, aircraft.lon);
        return distance <= distanceKm;
      })
      .map(aircraft => parseADSBExchangeFlight(aircraft))
      .filter((flight): flight is Flight => flight !== null);

    return flights.slice(0, 20); // Limitar a 20 vuelos
  } catch (error) {
    console.error('Error con API pública ADS-B:', error);
    return [];
  }
}

/**
 * Parsea datos de aeronave de ADS-B Exchange a formato Flight
 */
function parseADSBExchangeFlight(aircraft: ADSBExchangeAircraft): Flight | null {
  if (!aircraft.flight) return null;

  const callsign = aircraft.flight.trim();
  
  // Intentar extraer aerolínea del callsign
  const airlineCode = callsign.substring(0, 2);
  const airline = getAirlineName(airlineCode);
  
  // Determinar tipo de aeronave
  let aircraftType = 'A320'; // Default
  if (aircraft.t) {
    aircraftType = aircraft.t;
  } else if (aircraft.type) {
    aircraftType = aircraft.type;
  }

  // Determinar estado del vuelo
  let status: Flight['status'] = 'active';
  if (aircraft.alt_baro && aircraft.alt_baro < 1000) {
    status = 'landed';
  } else if (aircraft.gs && aircraft.gs < 50) {
    status = 'scheduled';
  }

  // Como no tenemos horarios exactos en tiempo real, estimamos
  const now = new Date();
  const departureTime = new Date(now);
  departureTime.setHours(now.getHours() - 1); // Estimado: despegó hace 1h
  
  const arrivalTime = new Date(now);
  arrivalTime.setHours(now.getHours() + 1); // Estimado: aterriza en 1h

  const flight: Flight = {
    flightNumber: callsign,
    airline,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    aircraft: aircraftType,
    status,
    currentPosition: aircraft.lat && aircraft.lon && aircraft.alt_baro ? {
      lat: aircraft.lat,
      lon: aircraft.lon,
      altitude: aircraft.alt_baro,
      speed: aircraft.gs || 0
    } : undefined
  };

  return flight;
}

/**
 * Mapeo de códigos IATA a nombres de aerolíneas
 */
function getAirlineName(code: string): string {
  const airlines: Record<string, string> = {
    'IB': 'Iberia',
    'VY': 'Vueling',
    'UX': 'Air Europa',
    'FR': 'Ryanair',
    'BA': 'British Airways',
    'AF': 'Air France',
    'LH': 'Lufthansa',
    'KL': 'KLM',
    'AZ': 'ITA Airways',
    'TP': 'TAP Air Portugal',
    'EI': 'Aer Lingus',
    'U2': 'easyJet',
    'DY': 'Norwegian',
    'SK': 'SAS',
    'AY': 'Finnair',
    'OS': 'Austrian',
    'LX': 'Swiss',
    'SN': 'Brussels Airlines',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'TK': 'Turkish Airlines',
    'AA': 'American Airlines',
    'UA': 'United Airlines',
    'DL': 'Delta Air Lines'
  };
  
  return airlines[code] || `Airline ${code}`;
}

/**
 * Calcula distancia entre dos puntos geográficos
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
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
 * Función principal para buscar vuelos entre dos aeropuertos
 * usando ADS-B Exchange
 */
export async function searchRouteFlightsADSB(
  originLat: number,
  originLon: number,
  destLat: number,
  destLon: number
): Promise<Flight[]> {
  try {
    // Buscar vuelos en un área alrededor del origen
    const originFlights = await searchFlightsByArea(originLat, originLon, 100);
    
    // Buscar vuelos en un área alrededor del destino
    const destFlights = await searchFlightsByArea(destLat, destLon, 100);
    
    // Combinar y eliminar duplicados
    const allFlights = [...originFlights, ...destFlights];
    const uniqueFlights = Array.from(
      new Map(allFlights.map(f => [f.flightNumber, f])).values()
    );
    
    return uniqueFlights;
  } catch (error) {
    console.error('Error buscando vuelos en ruta:', error);
    return [];
  }
}

