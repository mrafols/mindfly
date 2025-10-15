/**
 * Integración con AeroDataBox API
 * API completa para datos de aeropuertos y vuelos
 * https://api.market/store/aedbx/aerodatabox
 */

import { Flight } from './flights';

// Interfaces para AeroDataBox API
interface AeroDataBoxFlight {
  number: string;
  callSign?: string;
  status?: string;
  codeshareStatus?: string;
  isCargo?: boolean;
  aircraft?: {
    model?: string;
    reg?: string;
  };
  airline?: {
    name: string;
  };
  departure?: {
    airport: {
      iata?: string;
      name?: string;
    };
    scheduledTime?: {
      utc?: string;
      local?: string;
    };
    actualTime?: {
      utc?: string;
      local?: string;
    };
    terminal?: string;
    gate?: string;
  };
  arrival?: {
    airport: {
      iata?: string;
      name?: string;
    };
    scheduledTime?: {
      utc?: string;
      local?: string;
    };
    actualTime?: {
      utc?: string;
      local?: string;
    };
    terminal?: string;
    gate?: string;
  };
}

interface AeroDataBoxAirport {
  icao: string;
  iata?: string;
  name: string;
  shortName?: string;
  municipalityName?: string;
  location: {
    lat: number;
    lon: number;
  };
  countryCode?: string;
  continentCode?: string;
  timeZone?: string;
  urls?: {
    webSite?: string;
    wikipedia?: string;
  };
}

/**
 * Busca vuelos entre dos aeropuertos usando AeroDataBox
 */
export async function searchFlightsAeroDataBox(
  originIATA: string,
  destinationIATA: string
): Promise<Flight[]> {
  const apiKey = process.env.AERODATABOX_API_KEY;
  
  if (!apiKey) {
    console.warn('AERODATABOX_API_KEY no configurada');
    return [];
  }

  try {
    // Obtener fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    // Buscar vuelos desde el origen
    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${originIATA}/${dateStr}T00:00/${dateStr}T23:59?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=false`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 300 } // Cache 5 minutos
      }
    );

    if (!response.ok) {
      throw new Error(`AeroDataBox API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.departures || data.departures.length === 0) {
      return [];
    }

    // Filtrar vuelos que van al destino
    const flights = data.departures
      .filter((flight: AeroDataBoxFlight) => 
        flight.arrival?.airport?.iata?.toUpperCase() === destinationIATA.toUpperCase()
      )
      .map((flight: AeroDataBoxFlight) => parseAeroDataBoxFlight(flight))
      .filter((flight: Flight | null): flight is Flight => flight !== null);

    return flights;
  } catch (error) {
    console.error('Error con AeroDataBox:', error);
    return [];
  }
}

/**
 * Obtiene información detallada de un aeropuerto
 */
export async function getAirportInfo(iataCode: string): Promise<AeroDataBoxAirport | null> {
  const apiKey = process.env.AERODATABOX_API_KEY;
  
  if (!apiKey) {
    console.warn('AERODATABOX_API_KEY no configurada');
    return null;
  }

  try {
    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/airports/iata/${iataCode}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        },
        cache: 'force-cache',
        next: { revalidate: 86400 } // Cache 24 horas
      }
    );

    if (!response.ok) {
      throw new Error(`AeroDataBox API error: ${response.status}`);
    }

    const data: AeroDataBoxAirport = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo info de aeropuerto:', error);
    return null;
  }
}

/**
 * Obtiene vuelos en tiempo real de un aeropuerto específico
 */
export async function getAirportFlights(
  iataCode: string,
  direction: 'Departure' | 'Arrival' = 'Departure'
): Promise<Flight[]> {
  const apiKey = process.env.AERODATABOX_API_KEY;
  
  if (!apiKey) {
    console.warn('AERODATABOX_API_KEY no configurada');
    return [];
  }

  try {
    const now = new Date();
    const fromTime = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 horas atrás
    const toTime = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 horas adelante
    
    const fromStr = fromTime.toISOString().slice(0, 16);
    const toStr = toTime.toISOString().slice(0, 16);

    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${iataCode}/${fromStr}/${toStr}?withLeg=true&direction=${direction}&withCancelled=false&withCodeshared=false`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`AeroDataBox API error: ${response.status}`);
    }

    const data = await response.json();
    const flightsArray = direction === 'Departure' ? data.departures : data.arrivals;
    
    if (!flightsArray || flightsArray.length === 0) {
      return [];
    }

    const flights = flightsArray
      .map((flight: AeroDataBoxFlight) => parseAeroDataBoxFlight(flight))
      .filter((flight: Flight | null): flight is Flight => flight !== null);

    return flights;
  } catch (error) {
    console.error('Error obteniendo vuelos del aeropuerto:', error);
    return [];
  }
}

/**
 * Busca un vuelo específico por su número
 */
export async function getFlightByNumber(
  flightNumber: string,
  date?: Date
): Promise<(Flight & { originIATA?: string; destinationIATA?: string }) | null> {
  const apiKey = process.env.AERODATABOX_API_KEY;
  
  if (!apiKey) {
    console.warn('AERODATABOX_API_KEY no configurada');
    return null;
  }

  try {
    const searchDate = date || new Date();
    const dateStr = searchDate.toISOString().split('T')[0];

    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/number/${flightNumber}/${dateStr}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`AeroDataBox API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      return null;
    }

    const flightData = parseAeroDataBoxFlight(data[0]);
    
    // Añadir códigos IATA de origen y destino
    if (flightData && data[0].departure?.airport?.iata && data[0].arrival?.airport?.iata) {
      return {
        ...flightData,
        originIATA: data[0].departure.airport.iata,
        destinationIATA: data[0].arrival.airport.iata
      };
    }
    
    return flightData;
  } catch (error) {
    console.error('Error obteniendo vuelo por número:', error);
    return null;
  }
}

/**
 * Parsea un vuelo de AeroDataBox a nuestro formato
 */
function parseAeroDataBoxFlight(flight: AeroDataBoxFlight): Flight | null {
  if (!flight.number || !flight.departure || !flight.arrival) {
    return null;
  }

  // Extraer tipo de aeronave
  let aircraft = 'A320'; // Default
  if (flight.aircraft?.model) {
    // Limpiar el modelo (ej: "Airbus A320" -> "A320")
    const modelMatch = flight.aircraft.model.match(/[AB]\d{3,4}/);
    if (modelMatch) {
      aircraft = modelMatch[0];
    } else {
      aircraft = flight.aircraft.model;
    }
  }

  // Determinar estado del vuelo
  let status: Flight['status'] = 'scheduled';
  if (flight.status) {
    const statusLower = flight.status.toLowerCase();
    if (statusLower.includes('landed') || statusLower.includes('arrived')) {
      status = 'landed';
    } else if (statusLower.includes('active') || statusLower.includes('en-route') || statusLower.includes('airborne')) {
      status = 'active';
    } else if (statusLower.includes('cancelled')) {
      status = 'cancelled';
    }
  }

  // Usar horarios reales si están disponibles, sino programados
  const departureTime = flight.departure.actualTime?.utc || 
                       flight.departure.scheduledTime?.utc || 
                       new Date().toISOString();
  
  const arrivalTime = flight.arrival.actualTime?.utc || 
                     flight.arrival.scheduledTime?.utc || 
                     new Date().toISOString();

  return {
    flightNumber: flight.number,
    airline: flight.airline?.name || 'Unknown Airline',
    departureTime,
    arrivalTime,
    aircraft,
    status
  };
}

/**
 * Busca vuelos entre dos aeropuertos con fallback a búsqueda por llegadas
 */
export async function searchRouteFlightsAeroDataBox(
  originIATA: string,
  destinationIATA: string
): Promise<Flight[]> {
  try {
    // Primero intentar buscar desde el origen
    let flights = await searchFlightsAeroDataBox(originIATA, destinationIATA);
    
    if (flights.length > 0) {
      return flights;
    }

    // Si no hay resultados, intentar buscar llegadas al destino desde el origen
    const apiKey = process.env.AERODATABOX_API_KEY;
    
    if (!apiKey) {
      return [];
    }

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${destinationIATA}/${dateStr}T00:00/${dateStr}T23:59?withLeg=true&direction=Arrival&withCancelled=false&withCodeshared=false`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        },
        cache: 'no-store',
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    if (!data.arrivals || data.arrivals.length === 0) {
      return [];
    }

    flights = data.arrivals
      .filter((flight: AeroDataBoxFlight) => 
        flight.departure?.airport?.iata?.toUpperCase() === originIATA.toUpperCase()
      )
      .map((flight: AeroDataBoxFlight) => parseAeroDataBoxFlight(flight))
      .filter((flight: Flight | null): flight is Flight => flight !== null);

    return flights;
  } catch (error) {
    console.error('Error buscando vuelos en ruta:', error);
    return [];
  }
}

