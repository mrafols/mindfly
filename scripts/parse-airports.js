/**
 * Script para parsear la base de datos de OpenFlights
 * y generar una base de datos TypeScript optimizada
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo CSV de OpenFlights
const csvPath = path.join(__dirname, '../lib/airports-full.json');
const outputPath = path.join(__dirname, '../lib/airports-database.ts');

const rawData = fs.readFileSync(csvPath, 'utf-8');
const lines = rawData.trim().split('\n');

const airports = [];

lines.forEach((line) => {
  // Parsear CSV manualmente
  const parts = line.split(',');
  if (parts.length < 14) return;
  
  const name = parts[1].replace(/^"|"$/g, '');
  const city = parts[2].replace(/^"|"$/g, '');
  const country = parts[3].replace(/^"|"$/g, '');
  const iata = parts[4].replace(/^"|"$/g, '');
  const icao = parts[5].replace(/^"|"$/g, '');
  const lat = parts[6];
  const lon = parts[7];
  const tz = parts[11].replace(/^"|"$/g, '');
  
  // Solo incluir aeropuertos con código IATA válido (3 letras)
  if (!iata || iata.length !== 3 || iata === '\\N') return;
  
  // Validar coordenadas
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  if (isNaN(latitude) || isNaN(longitude)) return;
  
  // Escapar comillas simples correctamente para JavaScript
  const escapeSingleQuote = (str) => str.replace(/'/g, "\\'").replace(/\\/g, '\\\\');
  
  airports.push({
    code: iata,
    icao: icao && icao !== '\\N' ? icao : undefined,
    name: escapeSingleQuote(name),
    city: escapeSingleQuote(city),
    country: escapeSingleQuote(country),
    lat: latitude,
    lon: longitude,
    timezone: tz && tz !== '\\N' ? tz : undefined
  });
});

console.log(`✅ Parsed ${airports.length} airports with IATA codes`);

// Ordenar por código IATA
airports.sort((a, b) => a.code.localeCompare(b.code));

// Generar archivo TypeScript
let tsContent = `/**
 * Base de datos completa de aeropuertos globales
 * Generada automáticamente desde OpenFlights Database
 * ${airports.length} aeropuertos con códigos IATA válidos
 * 
 * Fuente: https://openflights.org/data.html
 * Licencia: Open Database License
 */

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  icao?: string;
  timezone?: string;
}

export const airportsDatabase: Airport[] = [
`;

airports.forEach((airport, index) => {
  const comma = index < airports.length - 1 ? ',' : '';
  tsContent += `  { code: '${airport.code}'${airport.icao ? `, icao: '${airport.icao}'` : ''}, name: '${airport.name}', city: '${airport.city}', country: '${airport.country}', lat: ${airport.lat}, lon: ${airport.lon}${airport.timezone ? `, timezone: '${airport.timezone}'` : ''} }${comma}\n`;
});

tsContent += `];\n\n`;

// Agregar función de búsqueda optimizada
tsContent += `/**
 * Índice de aeropuertos por código IATA para búsqueda rápida
 */
const airportIndex = new Map<string, Airport>(
  airportsDatabase.map(airport => [airport.code, airport])
);

/**
 * Busca un aeropuerto por su código IATA
 */
export function findAirportByCode(iataCode: string): Airport | undefined {
  return airportIndex.get(iataCode.toUpperCase());
}

/**
 * Busca aeropuertos por nombre o ciudad (búsqueda parcial)
 */
export function searchAirports(query: string, limit = 20): Airport[] {
  const lowerQuery = query.toLowerCase();
  return airportsDatabase
    .filter(airport => 
      airport.name.toLowerCase().includes(lowerQuery) ||
      airport.city.toLowerCase().includes(lowerQuery) ||
      airport.code.toLowerCase().includes(lowerQuery) ||
      airport.country.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
}

/**
 * Obtiene todos los aeropuertos de un país
 */
export function getAirportsByCountry(country: string): Airport[] {
  const lowerCountry = country.toLowerCase();
  return airportsDatabase.filter(airport => 
    airport.country.toLowerCase() === lowerCountry
  );
}
`;

fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`✅ Generated TypeScript file: ${outputPath}`);
console.log(`📊 Total airports: ${airports.length}`);
console.log(`🌍 Countries covered: ${[...new Set(airports.map(a => a.country))].length}`);

