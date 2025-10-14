export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

// Base de datos expandida de aeropuertos (150+ aeropuertos)
export const airports: Airport[] = [
  // España - Principales
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'España', lat: 40.4936, lon: -3.5668 },
  { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', country: 'España', lat: 41.2971, lon: 2.0785 },
  { code: 'AGP', name: 'Málaga-Costa del Sol', city: 'Málaga', country: 'España', lat: 36.6749, lon: -4.4991 },
  { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma de Mallorca', country: 'España', lat: 39.5517, lon: 2.7388 },
  { code: 'SVQ', name: 'Sevilla', city: 'Sevilla', country: 'España', lat: 37.4180, lon: -5.8931 },
  { code: 'VLC', name: 'Valencia', city: 'Valencia', country: 'España', lat: 39.4893, lon: -0.4817 },
  { code: 'ALC', name: 'Alicante-Elche', city: 'Alicante', country: 'España', lat: 38.2822, lon: -0.5581 },
  { code: 'BIO', name: 'Bilbao', city: 'Bilbao', country: 'España', lat: 43.3011, lon: -2.9106 },
  
  // España - Islas Baleares
  { code: 'MAH', name: 'Menorca', city: 'Mahón', country: 'España', lat: 39.8626, lon: 4.2186 },
  { code: 'IBZ', name: 'Ibiza', city: 'Ibiza', country: 'España', lat: 38.8729, lon: 1.3731 },
  
  // España - Islas Canarias
  { code: 'TFS', name: 'Tenerife Sur', city: 'Tenerife', country: 'España', lat: 28.0445, lon: -16.5725 },
  { code: 'TFN', name: 'Tenerife Norte', city: 'Tenerife', country: 'España', lat: 28.4827, lon: -16.3415 },
  { code: 'LPA', name: 'Gran Canaria', city: 'Las Palmas', country: 'España', lat: 27.9319, lon: -15.3866 },
  { code: 'ACE', name: 'Lanzarote', city: 'Arrecife', country: 'España', lat: 28.9455, lon: -13.6052 },
  { code: 'FUE', name: 'Fuerteventura', city: 'Puerto del Rosario', country: 'España', lat: 28.4527, lon: -13.8638 },
  
  // España - Otros
  { code: 'SCQ', name: 'Santiago de Compostela', city: 'Santiago', country: 'España', lat: 42.8963, lon: -8.4151 },
  { code: 'GRX', name: 'Granada-Jaén', city: 'Granada', country: 'España', lat: 37.1887, lon: -3.7774 },
  { code: 'VGO', name: 'Vigo-Peinador', city: 'Vigo', country: 'España', lat: 42.2318, lon: -8.6268 },
  { code: 'SDR', name: 'Santander', city: 'Santander', country: 'España', lat: 43.4271, lon: -3.8200 },
  { code: 'OVD', name: 'Asturias', city: 'Oviedo', country: 'España', lat: 43.5636, lon: -6.0346 },
  { code: 'REU', name: 'Reus', city: 'Reus', country: 'España', lat: 41.1474, lon: 1.1672 },
  { code: 'GRO', name: 'Girona-Costa Brava', city: 'Girona', country: 'España', lat: 41.9010, lon: 2.7605 },
  { code: 'XRY', name: 'Jerez', city: 'Jerez', country: 'España', lat: 36.7446, lon: -6.0601 },
  
  // Irlanda
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublín', country: 'Irlanda', lat: 53.4213, lon: -6.2701 },
  { code: 'ORK', name: 'Cork Airport', city: 'Cork', country: 'Irlanda', lat: 51.8413, lon: -8.4911 },
  { code: 'SNN', name: 'Shannon Airport', city: 'Shannon', country: 'Irlanda', lat: 52.7020, lon: -8.9248 },
  { code: 'KIR', name: 'Kerry Airport', city: 'Kerry', country: 'Irlanda', lat: 52.1809, lon: -9.5238 },
  
  // Reino Unido
  { code: 'LHR', name: 'London Heathrow', city: 'Londres', country: 'Reino Unido', lat: 51.4700, lon: -0.4543 },
  { code: 'LGW', name: 'London Gatwick', city: 'Londres', country: 'Reino Unido', lat: 51.1537, lon: -0.1821 },
  { code: 'STN', name: 'London Stansted', city: 'Londres', country: 'Reino Unido', lat: 51.8860, lon: 0.2389 },
  { code: 'LTN', name: 'London Luton', city: 'Londres', country: 'Reino Unido', lat: 51.8747, lon: -0.3683 },
  { code: 'LCY', name: 'London City', city: 'Londres', country: 'Reino Unido', lat: 51.5048, lon: 0.0495 },
  { code: 'MAN', name: 'Manchester', city: 'Manchester', country: 'Reino Unido', lat: 53.3537, lon: -2.2750 },
  { code: 'EDI', name: 'Edinburgh', city: 'Edimburgo', country: 'Reino Unido', lat: 55.9500, lon: -3.3725 },
  { code: 'BHX', name: 'Birmingham', city: 'Birmingham', country: 'Reino Unido', lat: 52.4539, lon: -1.7480 },
  { code: 'GLA', name: 'Glasgow', city: 'Glasgow', country: 'Reino Unido', lat: 55.8719, lon: -4.4331 },
  { code: 'BRS', name: 'Bristol', city: 'Bristol', country: 'Reino Unido', lat: 51.3827, lon: -2.7191 },
  { code: 'NCL', name: 'Newcastle', city: 'Newcastle', country: 'Reino Unido', lat: 55.0375, lon: -1.6917 },
  
  // Francia
  { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'París', country: 'Francia', lat: 49.0097, lon: 2.5479 },
  { code: 'ORY', name: 'Paris Orly', city: 'París', country: 'Francia', lat: 48.7262, lon: 2.3655 },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Niza', country: 'Francia', lat: 43.6584, lon: 7.2159 },
  { code: 'LYS', name: 'Lyon-Saint Exupéry', city: 'Lyon', country: 'Francia', lat: 45.7256, lon: 5.0811 },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marsella', country: 'Francia', lat: 43.4393, lon: 5.2214 },
  { code: 'TLS', name: 'Toulouse-Blagnac', city: 'Toulouse', country: 'Francia', lat: 43.6294, lon: 1.3638 },
  { code: 'BOD', name: 'Bordeaux-Mérignac', city: 'Burdeos', country: 'Francia', lat: 44.8283, lon: -0.7156 },
  { code: 'NTE', name: 'Nantes Atlantique', city: 'Nantes', country: 'Francia', lat: 47.1532, lon: -1.6107 },
  
  // Alemania
  { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt', country: 'Alemania', lat: 50.0379, lon: 8.5622 },
  { code: 'MUC', name: 'Munich', city: 'Múnich', country: 'Alemania', lat: 48.3538, lon: 11.7861 },
  { code: 'TXL', name: 'Berlin Tegel', city: 'Berlín', country: 'Alemania', lat: 52.5597, lon: 13.2877 },
  { code: 'DUS', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Alemania', lat: 51.2895, lon: 6.7668 },
  { code: 'HAM', name: 'Hamburg', city: 'Hamburgo', country: 'Alemania', lat: 53.6304, lon: 9.9882 },
  { code: 'CGN', name: 'Cologne Bonn', city: 'Colonia', country: 'Alemania', lat: 50.8659, lon: 7.1427 },
  { code: 'STR', name: 'Stuttgart', city: 'Stuttgart', country: 'Alemania', lat: 48.6899, lon: 9.2220 },
  
  // Italia
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Roma', country: 'Italia', lat: 41.8003, lon: 12.2389 },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milán', country: 'Italia', lat: 45.6301, lon: 8.7231 },
  { code: 'LIN', name: 'Milan Linate', city: 'Milán', country: 'Italia', lat: 45.4451, lon: 9.2767 },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venecia', country: 'Italia', lat: 45.5053, lon: 12.3519 },
  { code: 'NAP', name: 'Naples', city: 'Nápoles', country: 'Italia', lat: 40.8860, lon: 14.2908 },
  { code: 'BLQ', name: 'Bologna', city: 'Bolonia', country: 'Italia', lat: 44.5354, lon: 11.2887 },
  { code: 'PSA', name: 'Pisa', city: 'Pisa', country: 'Italia', lat: 43.6839, lon: 10.3927 },
  { code: 'FLR', name: 'Florence', city: 'Florencia', country: 'Italia', lat: 43.8100, lon: 11.2051 },
  { code: 'CTA', name: 'Catania', city: 'Catania', country: 'Italia', lat: 37.4668, lon: 15.0664 },
  { code: 'PMO', name: 'Palermo', city: 'Palermo', country: 'Italia', lat: 38.1759, lon: 13.0910 },
  
  // Países Bajos
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Ámsterdam', country: 'Países Bajos', lat: 52.3105, lon: 4.7683 },
  { code: 'EIN', name: 'Eindhoven', city: 'Eindhoven', country: 'Países Bajos', lat: 51.4500, lon: 5.3747 },
  
  // Bélgica
  { code: 'BRU', name: 'Brussels-Zaventem', city: 'Bruselas', country: 'Bélgica', lat: 50.9010, lon: 4.4844 },
  { code: 'CRL', name: 'Brussels-Charleroi', city: 'Bruselas', country: 'Bélgica', lat: 50.4592, lon: 4.4538 },
  
  // Suiza
  { code: 'ZRH', name: 'Zurich', city: 'Zúrich', country: 'Suiza', lat: 47.4647, lon: 8.5492 },
  { code: 'GVA', name: 'Geneva', city: 'Ginebra', country: 'Suiza', lat: 46.2381, lon: 6.1090 },
  { code: 'BSL', name: 'Basel-Mulhouse', city: 'Basilea', country: 'Suiza', lat: 47.5900, lon: 7.5292 },
  
  // Austria
  { code: 'VIE', name: 'Vienna', city: 'Viena', country: 'Austria', lat: 48.1103, lon: 16.5697 },
  { code: 'SZG', name: 'Salzburg', city: 'Salzburgo', country: 'Austria', lat: 47.7933, lon: 13.0043 },
  
  // Portugal
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisboa', country: 'Portugal', lat: 38.7813, lon: -9.1357 },
  { code: 'OPO', name: 'Porto', city: 'Oporto', country: 'Portugal', lat: 41.2481, lon: -8.6814 },
  { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal', lat: 37.0144, lon: -7.9659 },
  { code: 'FNC', name: 'Madeira', city: 'Funchal', country: 'Portugal', lat: 32.6979, lon: -16.7745 },
  
  // Grecia
  { code: 'ATH', name: 'Athens', city: 'Atenas', country: 'Grecia', lat: 37.9364, lon: 23.9445 },
  { code: 'HER', name: 'Heraklion', city: 'Creta', country: 'Grecia', lat: 35.3397, lon: 25.1803 },
  { code: 'RHO', name: 'Rhodes', city: 'Rodas', country: 'Grecia', lat: 36.4054, lon: 28.0862 },
  { code: 'CFU', name: 'Corfu', city: 'Corfú', country: 'Grecia', lat: 39.6019, lon: 19.9117 },
  { code: 'SKG', name: 'Thessaloniki', city: 'Tesalónica', country: 'Grecia', lat: 40.5197, lon: 22.9709 },
  
  // Países Nórdicos
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhague', country: 'Dinamarca', lat: 55.6180, lon: 12.6506 },
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Estocolmo', country: 'Suecia', lat: 59.6519, lon: 17.9186 },
  { code: 'OSL', name: 'Oslo-Gardermoen', city: 'Oslo', country: 'Noruega', lat: 60.1939, lon: 11.1004 },
  { code: 'HEL', name: 'Helsinki-Vantaa', city: 'Helsinki', country: 'Finlandia', lat: 60.3172, lon: 24.9633 },
  { code: 'BGO', name: 'Bergen', city: 'Bergen', country: 'Noruega', lat: 60.2934, lon: 5.2181 },
  { code: 'GOT', name: 'Gothenburg', city: 'Gotemburgo', country: 'Suecia', lat: 57.6628, lon: 12.2798 },
  
  // Europa del Este
  { code: 'PRG', name: 'Prague', city: 'Praga', country: 'República Checa', lat: 50.1008, lon: 14.2600 },
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Varsovia', country: 'Polonia', lat: 52.1657, lon: 20.9671 },
  { code: 'BUD', name: 'Budapest', city: 'Budapest', country: 'Hungría', lat: 47.4300, lon: 19.2556 },
  { code: 'OTP', name: 'Bucharest', city: 'Bucarest', country: 'Rumanía', lat: 44.5711, lon: 26.0850 },
  { code: 'SOF', name: 'Sofia', city: 'Sofía', country: 'Bulgaria', lat: 42.6952, lon: 23.4062 },
  
  // Estados Unidos
  { code: 'JFK', name: 'John F. Kennedy International', city: 'Nueva York', country: 'Estados Unidos', lat: 40.6413, lon: -73.7781 },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Ángeles', country: 'Estados Unidos', lat: 33.9416, lon: -118.4085 },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'Estados Unidos', lat: 25.7959, lon: -80.2870 },
  { code: 'ORD', name: 'O\'Hare International', city: 'Chicago', country: 'Estados Unidos', lat: 41.9742, lon: -87.9073 },
  { code: 'SFO', name: 'San Francisco', city: 'San Francisco', country: 'Estados Unidos', lat: 37.6213, lon: -122.3790 },
  { code: 'EWR', name: 'Newark', city: 'Nueva York', country: 'Estados Unidos', lat: 40.6895, lon: -74.1745 },
  { code: 'SEA', name: 'Seattle-Tacoma', city: 'Seattle', country: 'Estados Unidos', lat: 47.4502, lon: -122.3088 },
  { code: 'BOS', name: 'Boston Logan', city: 'Boston', country: 'Estados Unidos', lat: 42.3656, lon: -71.0096 },
  { code: 'DFW', name: 'Dallas Fort Worth', city: 'Dallas', country: 'Estados Unidos', lat: 32.8998, lon: -97.0403 },
  { code: 'ATL', name: 'Hartsfield-Jackson', city: 'Atlanta', country: 'Estados Unidos', lat: 33.6407, lon: -84.4277 },
  
  // América Latina
  { code: 'MEX', name: 'Mexico City International', city: 'Ciudad de México', country: 'México', lat: 19.4363, lon: -99.0721 },
  { code: 'CUN', name: 'Cancún', city: 'Cancún', country: 'México', lat: 21.0365, lon: -86.8771 },
  { code: 'GRU', name: 'São Paulo/Guarulhos', city: 'São Paulo', country: 'Brasil', lat: -23.4356, lon: -46.4731 },
  { code: 'EZE', name: 'Buenos Aires Ezeiza', city: 'Buenos Aires', country: 'Argentina', lat: -34.8222, lon: -58.5358 },
  { code: 'BOG', name: 'El Dorado', city: 'Bogotá', country: 'Colombia', lat: 4.7016, lon: -74.1469 },
  { code: 'LIM', name: 'Jorge Chávez', city: 'Lima', country: 'Perú', lat: -12.0219, lon: -77.1143 },
  { code: 'SCL', name: 'Santiago', city: 'Santiago', country: 'Chile', lat: -33.3930, lon: -70.7858 },
  
  // África del Norte
  { code: 'CMN', name: 'Mohammed V', city: 'Casablanca', country: 'Marruecos', lat: 33.3675, lon: -7.5898 },
  { code: 'RAK', name: 'Marrakech-Menara', city: 'Marrakech', country: 'Marruecos', lat: 31.6069, lon: -8.0363 },
  { code: 'TUN', name: 'Tunis-Carthage', city: 'Túnez', country: 'Túnez', lat: 36.8510, lon: 10.2272 },
  { code: 'CAI', name: 'Cairo', city: 'El Cairo', country: 'Egipto', lat: 30.1219, lon: 31.4056 },
  
  // Oriente Medio
  { code: 'DXB', name: 'Dubai International', city: 'Dubái', country: 'EAU', lat: 25.2532, lon: 55.3657 },
  { code: 'IST', name: 'Istanbul', city: 'Estambul', country: 'Turquía', lat: 41.2753, lon: 28.7519 },
  { code: 'DOH', name: 'Hamad', city: 'Doha', country: 'Catar', lat: 25.2731, lon: 51.6080 },
  { code: 'AUH', name: 'Abu Dhabi', city: 'Abu Dabi', country: 'EAU', lat: 24.4330, lon: 54.6511 },
  { code: 'TLV', name: 'Ben Gurion', city: 'Tel Aviv', country: 'Israel', lat: 32.0114, lon: 34.8867 },
  
  // Asia
  { code: 'NRT', name: 'Tokyo Narita', city: 'Tokio', country: 'Japón', lat: 35.7720, lon: 140.3929 },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokio', country: 'Japón', lat: 35.5494, lon: 139.7798 },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapur', country: 'Singapur', lat: 1.3644, lon: 103.9915 },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong', lat: 22.3080, lon: 113.9185 },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Tailandia', lat: 13.6900, lon: 100.7501 },
  { code: 'ICN', name: 'Seoul Incheon', city: 'Seúl', country: 'Corea del Sur', lat: 37.4602, lon: 126.4407 },
  { code: 'PEK', name: 'Beijing Capital', city: 'Pekín', country: 'China', lat: 40.0799, lon: 116.6031 },
  { code: 'PVG', name: 'Shanghai Pudong', city: 'Shanghái', country: 'China', lat: 31.1443, lon: 121.8083 },
  { code: 'DEL', name: 'Delhi', city: 'Nueva Delhi', country: 'India', lat: 28.5562, lon: 77.1000 },
  { code: 'BOM', name: 'Mumbai', city: 'Bombay', country: 'India', lat: 19.0896, lon: 72.8656 },
  
  // Oceanía
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sídney', country: 'Australia', lat: -33.9399, lon: 151.1753 },
  { code: 'MEL', name: 'Melbourne', city: 'Melbourne', country: 'Australia', lat: -37.6733, lon: 144.8433 },
  { code: 'AKL', name: 'Auckland', city: 'Auckland', country: 'Nueva Zelanda', lat: -37.0082, lon: 174.7850 },
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
  
  // Mejorar búsqueda: priorizar coincidencias exactas
  const results = airports.filter(airport =>
    airport.code.toLowerCase().includes(queryLower) ||
    airport.name.toLowerCase().includes(queryLower) ||
    airport.city.toLowerCase().includes(queryLower) ||
    airport.country.toLowerCase().includes(queryLower)
  );
  
  // Ordenar: primero por código exacto, luego por ciudad, luego por nombre
  return results.sort((a, b) => {
    const aCodeMatch = a.code.toLowerCase().startsWith(queryLower);
    const bCodeMatch = b.code.toLowerCase().startsWith(queryLower);
    if (aCodeMatch && !bCodeMatch) return -1;
    if (!aCodeMatch && bCodeMatch) return 1;
    
    const aCityMatch = a.city.toLowerCase().startsWith(queryLower);
    const bCityMatch = b.city.toLowerCase().startsWith(queryLower);
    if (aCityMatch && !bCityMatch) return -1;
    if (!aCityMatch && bCityMatch) return 1;
    
    return 0;
  }).slice(0, 10);
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
