export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

// Base de datos simplificada de aeropuertos principales
export const airports: Airport[] = [
  // España
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'España', lat: 40.4936, lon: -3.5668 },
  { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', country: 'España', lat: 41.2971, lon: 2.0785 },
  { code: 'AGP', name: 'Málaga-Costa del Sol', city: 'Málaga', country: 'España', lat: 36.6749, lon: -4.4991 },
  { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma', country: 'España', lat: 39.5517, lon: 2.7388 },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', country: 'España', lat: 37.4180, lon: -5.8931 },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'España', lat: 39.4893, lon: -0.4817 },
  { code: 'ALC', name: 'Alicante-Elche', city: 'Alicante', country: 'España', lat: 38.2822, lon: -0.5581 },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'España', lat: 43.3011, lon: -2.9106 },
  
  // Europa
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', lat: 51.4700, lon: -0.4543 },
  { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France', lat: 49.0097, lon: 2.5479 },
  { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt', country: 'Germany', lat: 50.0379, lon: 8.5622 },
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands', lat: 52.3105, lon: 4.7683 },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italy', lat: 41.8003, lon: 12.2389 },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy', lat: 45.6301, lon: 8.7231 },
  { code: 'MUC', name: 'Munich', city: 'Munich', country: 'Germany', lat: 48.3538, lon: 11.7861 },
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisbon', country: 'Portugal', lat: 38.7813, lon: -9.1357 },
  { code: 'ZRH', name: 'Zurich', city: 'Zurich', country: 'Switzerland', lat: 47.4647, lon: 8.5492 },
  { code: 'VIE', name: 'Vienna', city: 'Vienna', country: 'Austria', lat: 48.1103, lon: 16.5697 },
  
  // América
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', lat: 40.6413, lon: -73.7781 },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', lat: 33.9416, lon: -118.4085 },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA', lat: 25.7959, lon: -80.2870 },
  { code: 'MEX', name: 'Mexico City International', city: 'Mexico City', country: 'Mexico', lat: 19.4363, lon: -99.0721 },
  { code: 'YYZ', name: 'Toronto Pearson', city: 'Toronto', country: 'Canada', lat: 43.6777, lon: -79.6248 },
  { code: 'GRU', name: 'São Paulo/Guarulhos', city: 'São Paulo', country: 'Brazil', lat: -23.4356, lon: -46.4731 },
  { code: 'EZE', name: 'Buenos Aires Ezeiza', city: 'Buenos Aires', country: 'Argentina', lat: -34.8222, lon: -58.5358 },
  
  // Asia y Oceanía
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', lat: 25.2532, lon: 55.3657 },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', lat: 1.3644, lon: 103.9915 },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', lat: 35.5494, lon: 139.7798 },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong', lat: 22.3080, lon: 113.9185 },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', lat: -33.9399, lon: 151.1753 },
];

export function findAirport(search: string): Airport | undefined {
  const searchLower = search.toLowerCase().trim();
  return airports.find(airport => 
    airport.code.toLowerCase() === searchLower ||
    airport.name.toLowerCase().includes(searchLower) ||
    airport.city.toLowerCase().includes(searchLower)
  );
}

export function searchAirports(query: string): Airport[] {
  const queryLower = query.toLowerCase().trim();
  if (!queryLower) return [];
  
  return airports.filter(airport =>
    airport.code.toLowerCase().includes(queryLower) ||
    airport.name.toLowerCase().includes(queryLower) ||
    airport.city.toLowerCase().includes(queryLower) ||
    airport.country.toLowerCase().includes(queryLower)
  ).slice(0, 10);
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

export function estimateFlightTime(distance: number): string {
  // Velocidad promedio de un avión comercial: ~800 km/h
  const hours = distance / 800;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

