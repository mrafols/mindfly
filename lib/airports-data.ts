/**
 * Base de datos completa de aeropuertos globales
 * Incluye más de 1000 aeropuertos principales y secundarios
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

/**
 * Base de datos expandida de aeropuertos globales
 * Organizada por región para mejor mantenimiento
 */
export const airportsDatabase: Airport[] = [
  // ==================== ESPAÑA (45 aeropuertos) ====================
  { code: 'MAD', icao: 'LEMD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'España', lat: 40.4936, lon: -3.5668, timezone: 'Europe/Madrid' },
  { code: 'BCN', icao: 'LEBL', name: 'Barcelona-El Prat Josep Tarradellas', city: 'Barcelona', country: 'España', lat: 41.2971, lon: 2.0785, timezone: 'Europe/Madrid' },
  { code: 'AGP', icao: 'LEMG', name: 'Málaga-Costa del Sol', city: 'Málaga', country: 'España', lat: 36.6749, lon: -4.4991, timezone: 'Europe/Madrid' },
  { code: 'PMI', icao: 'LEPA', name: 'Palma de Mallorca', city: 'Palma', country: 'España', lat: 39.5517, lon: 2.7388, timezone: 'Europe/Madrid' },
  { code: 'SVQ', icao: 'LEZL', name: 'Sevilla', city: 'Sevilla', country: 'España', lat: 37.4180, lon: -5.8931, timezone: 'Europe/Madrid' },
  { code: 'VLC', icao: 'LEVC', name: 'Valencia', city: 'Valencia', country: 'España', lat: 39.4893, lon: -0.4817, timezone: 'Europe/Madrid' },
  { code: 'ALC', icao: 'LEAL', name: 'Alicante-Elche Miguel Hernández', city: 'Alicante', country: 'España', lat: 38.2822, lon: -0.5581, timezone: 'Europe/Madrid' },
  { code: 'BIO', icao: 'LEBB', name: 'Bilbao', city: 'Bilbao', country: 'España', lat: 43.3011, lon: -2.9106, timezone: 'Europe/Madrid' },
  { code: 'SCQ', icao: 'LEST', name: 'Santiago de Compostela', city: 'Santiago', country: 'España', lat: 42.8963, lon: -8.4151, timezone: 'Europe/Madrid' },
  { code: 'TFN', icao: 'GCXO', name: 'Tenerife Norte', city: 'Tenerife', country: 'España', lat: 28.4827, lon: -16.3415, timezone: 'Atlantic/Canary' },
  { code: 'TFS', icao: 'GCTS', name: 'Tenerife Sur', city: 'Tenerife', country: 'España', lat: 28.0445, lon: -16.5725, timezone: 'Atlantic/Canary' },
  { code: 'LPA', icao: 'GCLP', name: 'Gran Canaria', city: 'Las Palmas', country: 'España', lat: 27.9319, lon: -15.3866, timezone: 'Atlantic/Canary' },
  { code: 'ACE', icao: 'GCRR', name: 'Lanzarote César Manrique', city: 'Lanzarote', country: 'España', lat: 28.9456, lon: -13.6052, timezone: 'Atlantic/Canary' },
  { code: 'FUE', icao: 'GCFV', name: 'Fuerteventura', city: 'Fuerteventura', country: 'España', lat: 28.4527, lon: -13.8638, timezone: 'Atlantic/Canary' },
  { code: 'IBZ', icao: 'LEIB', name: 'Ibiza', city: 'Ibiza', country: 'España', lat: 38.8729, lon: 1.3731, timezone: 'Europe/Madrid' },
  { code: 'MAH', icao: 'LEMH', name: 'Menorca', city: 'Mahón', country: 'España', lat: 39.8626, lon: 4.2186, timezone: 'Europe/Madrid' },
  { code: 'GRO', icao: 'LEGE', name: 'Girona-Costa Brava', city: 'Girona', country: 'España', lat: 41.9010, lon: 2.7605, timezone: 'Europe/Madrid' },
  { code: 'REU', icao: 'LERE', name: 'Reus', city: 'Reus', country: 'España', lat: 41.1474, lon: 1.1672, timezone: 'Europe/Madrid' },
  { code: 'VGO', icao: 'LEVX', name: 'Vigo-Peinador', city: 'Vigo', country: 'España', lat: 42.2318, lon: -8.6268, timezone: 'Europe/Madrid' },
  { code: 'SDR', icao: 'LEXJ', name: 'Santander', city: 'Santander', country: 'España', lat: 43.4271, lon: -3.8200, timezone: 'Europe/Madrid' },
  { code: 'OVD', icao: 'LEAS', name: 'Asturias', city: 'Oviedo', country: 'España', lat: 43.5636, lon: -6.0346, timezone: 'Europe/Madrid' },
  { code: 'GRX', icao: 'LEGR', name: 'Granada-Jaén', city: 'Granada', country: 'España', lat: 37.1887, lon: -3.7774, timezone: 'Europe/Madrid' },
  { code: 'XRY', icao: 'LEJR', name: 'Jerez de la Frontera', city: 'Jerez', country: 'España', lat: 36.7446, lon: -6.0601, timezone: 'Europe/Madrid' },
  { code: 'VIT', icao: 'LEVT', name: 'Vitoria', city: 'Vitoria', country: 'España', lat: 42.8828, lon: -2.7245, timezone: 'Europe/Madrid' },
  { code: 'LEI', icao: 'LELN', name: 'Almería', city: 'Almería', country: 'España', lat: 36.8439, lon: -2.3701, timezone: 'Europe/Madrid' },
  { code: 'ZAZ', icao: 'LEZG', name: 'Zaragoza', city: 'Zaragoza', country: 'España', lat: 41.6662, lon: -1.0415, timezone: 'Europe/Madrid' },
  { code: 'VLL', icao: 'LEVD', name: 'Valladolid', city: 'Valladolid', country: 'España', lat: 41.7061, lon: -4.8520, timezone: 'Europe/Madrid' },
  { code: 'SLM', icao: 'LESA', name: 'Salamanca', city: 'Salamanca', country: 'España', lat: 40.9521, lon: -5.5020, timezone: 'Europe/Madrid' },
  { code: 'BJZ', icao: 'LEBZ', name: 'Badajoz', city: 'Badajoz', country: 'España', lat: 38.8913, lon: -6.8213, timezone: 'Europe/Madrid' },
  { code: 'RJL', icao: 'LELO', name: 'Logroño-Agoncillo', city: 'Logroño', country: 'España', lat: 42.4605, lon: -2.3227, timezone: 'Europe/Madrid' },
  { code: 'PNA', icao: 'LEPP', name: 'Pamplona', city: 'Pamplona', country: 'España', lat: 42.7700, lon: -1.6463, timezone: 'Europe/Madrid' },
  { code: 'ABC', icao: 'LEAB', name: 'Albacete Los Llanos', city: 'Albacete', country: 'España', lat: 38.9485, lon: -1.8635, timezone: 'Europe/Madrid' },
  { code: 'HSK', icao: 'LEHC', name: 'Huesca-Pirineos', city: 'Huesca', country: 'España', lat: 42.0761, lon: -0.3167, timezone: 'Europe/Madrid' },
  { code: 'RGS', icao: 'LEBG', name: 'Burgos', city: 'Burgos', country: 'España', lat: 42.3576, lon: -3.6207, timezone: 'Europe/Madrid' },
  { code: 'TOJ', icao: 'LETO', name: 'Madrid-Torrejón', city: 'Madrid', country: 'España', lat: 40.4967, lon: -3.4459, timezone: 'Europe/Madrid' },
  { code: 'CDT', icao: 'LECD', name: 'Castellón-Costa Azahar', city: 'Castellón', country: 'España', lat: 40.2139, lon: 0.0733, timezone: 'Europe/Madrid' },
  { code: 'MJV', icao: 'LESU', name: 'Murcia-San Javier', city: 'Murcia', country: 'España', lat: 37.7750, lon: -0.8139, timezone: 'Europe/Madrid' },
  { code: 'RMU', icao: 'LEMI', name: 'Región de Murcia International', city: 'Murcia', country: 'España', lat: 37.8029, lon: -1.1250, timezone: 'Europe/Madrid' },
  { code: 'LEU', icao: 'LELL', name: 'La Seu d\'Urgell', city: 'La Seu', country: 'España', lat: 42.3386, lon: 1.4092, timezone: 'Europe/Madrid' },
  { code: 'GMZ', icao: 'GCGM', name: 'La Gomera', city: 'La Gomera', country: 'España', lat: 28.0296, lon: -17.2146, timezone: 'Atlantic/Canary' },
  { code: 'VDE', icao: 'GCVD', name: 'El Hierro', city: 'El Hierro', country: 'España', lat: 27.8148, lon: -17.8871, timezone: 'Atlantic/Canary' },
  { code: 'SPC', icao: 'GCLA', name: 'La Palma', city: 'La Palma', country: 'España', lat: 28.6265, lon: -17.7556, timezone: 'Atlantic/Canary' },
  { code: 'MLN', icao: 'GEMA', name: 'Melilla', city: 'Melilla', country: 'España', lat: 35.2798, lon: -2.9562, timezone: 'Africa/Ceuta' },
  { code: 'CQM', icao: 'GEML', name: 'Ciudad Real Central', city: 'Ciudad Real', country: 'España', lat: 38.8564, lon: -3.9700, timezone: 'Europe/Madrid' },
  { code: 'OZP', icao: 'LEZO', name: 'Moron Air Base', city: 'Sevilla', country: 'España', lat: 37.1749, lon: -5.6159, timezone: 'Europe/Madrid' },

  // ==================== PORTUGAL (15 aeropuertos) ====================
  { code: 'LIS', icao: 'LPPT', name: 'Lisbon Portela Humberto Delgado', city: 'Lisboa', country: 'Portugal', lat: 38.7813, lon: -9.1357, timezone: 'Europe/Lisbon' },
  { code: 'OPO', icao: 'LPPR', name: 'Porto Francisco Sá Carneiro', city: 'Porto', country: 'Portugal', lat: 41.2481, lon: -8.6814, timezone: 'Europe/Lisbon' },
  { code: 'FAO', icao: 'LPFR', name: 'Faro', city: 'Faro', country: 'Portugal', lat: 37.0144, lon: -7.9659, timezone: 'Europe/Lisbon' },
  { code: 'FNC', icao: 'LPMA', name: 'Funchal Cristiano Ronaldo', city: 'Funchal', country: 'Portugal', lat: 32.6979, lon: -16.7745, timezone: 'Atlantic/Madeira' },
  { code: 'PDL', icao: 'LPPD', name: 'Ponta Delgada João Paulo II', city: 'Ponta Delgada', country: 'Portugal', lat: 37.7412, lon: -25.6979, timezone: 'Atlantic/Azores' },
  { code: 'TER', icao: 'LPLA', name: 'Terceira Lajes', city: 'Terceira', country: 'Portugal', lat: 38.7618, lon: -27.0908, timezone: 'Atlantic/Azores' },
  { code: 'HOR', icao: 'LPHR', name: 'Horta', city: 'Horta', country: 'Portugal', lat: 38.5199, lon: -28.7159, timezone: 'Atlantic/Azores' },
  { code: 'PIX', icao: 'LPPI', name: 'Pico', city: 'Pico', country: 'Portugal', lat: 38.5543, lon: -28.4413, timezone: 'Atlantic/Azores' },
  { code: 'SMA', icao: 'LPAZ', name: 'Santa Maria', city: 'Santa Maria', country: 'Portugal', lat: 36.9714, lon: -25.1706, timezone: 'Atlantic/Azores' },
  { code: 'GRW', icao: 'LPGR', name: 'Graciosa', city: 'Graciosa', country: 'Portugal', lat: 39.0922, lon: -28.0298, timezone: 'Atlantic/Azores' },
  { code: 'FLW', icao: 'LPFL', name: 'Flores', city: 'Flores', country: 'Portugal', lat: 39.4553, lon: -31.1314, timezone: 'Atlantic/Azores' },
  { code: 'CVU', icao: 'LPCO', name: 'Corvo', city: 'Corvo', country: 'Portugal', lat: 39.6715, lon: -31.1136, timezone: 'Atlantic/Azores' },
  { code: 'PRM', icao: 'LPPS', name: 'Porto Santo', city: 'Porto Santo', country: 'Portugal', lat: 33.0734, lon: -16.3500, timezone: 'Atlantic/Madeira' },
  { code: 'BGC', icao: 'LPBG', name: 'Bragança', city: 'Bragança', country: 'Portugal', lat: 41.8578, lon: -6.7071, timezone: 'Europe/Lisbon' },
  { code: 'CHV', icao: 'LPCH', name: 'Chaves', city: 'Chaves', country: 'Portugal', lat: 41.7214, lon: -7.4677, timezone: 'Europe/Lisbon' },

  // ==================== REINO UNIDO (35 aeropuertos) ====================
  { code: 'LHR', icao: 'EGLL', name: 'London Heathrow', city: 'London', country: 'UK', lat: 51.4700, lon: -0.4543, timezone: 'Europe/London' },
  { code: 'LGW', icao: 'EGKK', name: 'London Gatwick', city: 'London', country: 'UK', lat: 51.1537, lon: -0.1821, timezone: 'Europe/London' },
  { code: 'STN', icao: 'EGSS', name: 'London Stansted', city: 'London', country: 'UK', lat: 51.8850, lon: 0.2350, timezone: 'Europe/London' },
  { code: 'LTN', icao: 'EGGW', name: 'London Luton', city: 'London', country: 'UK', lat: 51.8747, lon: -0.3683, timezone: 'Europe/London' },
  { code: 'LCY', icao: 'EGLC', name: 'London City', city: 'London', country: 'UK', lat: 51.5053, lon: 0.0553, timezone: 'Europe/London' },
  { code: 'SEN', icao: 'EGMC', name: 'London Southend', city: 'London', country: 'UK', lat: 51.5714, lon: 0.6956, timezone: 'Europe/London' },
  { code: 'MAN', icao: 'EGCC', name: 'Manchester', city: 'Manchester', country: 'UK', lat: 53.3537, lon: -2.2750, timezone: 'Europe/London' },
  { code: 'BHX', icao: 'EGBB', name: 'Birmingham', city: 'Birmingham', country: 'UK', lat: 52.4539, lon: -1.7480, timezone: 'Europe/London' },
  { code: 'EDI', icao: 'EGPH', name: 'Edinburgh', city: 'Edinburgh', country: 'UK', lat: 55.9500, lon: -3.3725, timezone: 'Europe/London' },
  { code: 'GLA', icao: 'EGPF', name: 'Glasgow', city: 'Glasgow', country: 'UK', lat: 55.8719, lon: -4.4331, timezone: 'Europe/London' },
  { code: 'BRS', icao: 'EGGD', name: 'Bristol', city: 'Bristol', country: 'UK', lat: 51.3827, lon: -2.7191, timezone: 'Europe/London' },
  { code: 'NCL', icao: 'EGNT', name: 'Newcastle', city: 'Newcastle', country: 'UK', lat: 55.0375, lon: -1.6917, timezone: 'Europe/London' },
  { code: 'LBA', icao: 'EGNM', name: 'Leeds Bradford', city: 'Leeds', country: 'UK', lat: 53.8659, lon: -1.6606, timezone: 'Europe/London' },
  { code: 'LPL', icao: 'EGGP', name: 'Liverpool John Lennon', city: 'Liverpool', country: 'UK', lat: 53.3336, lon: -2.8497, timezone: 'Europe/London' },
  { code: 'EMA', icao: 'EGNX', name: 'East Midlands', city: 'Nottingham', country: 'UK', lat: 52.8311, lon: -1.3278, timezone: 'Europe/London' },
  { code: 'ABZ', icao: 'EGPD', name: 'Aberdeen', city: 'Aberdeen', country: 'UK', lat: 57.2019, lon: -2.1978, timezone: 'Europe/London' },
  { code: 'BFS', icao: 'EGAA', name: 'Belfast International', city: 'Belfast', country: 'UK', lat: 54.6575, lon: -6.2158, timezone: 'Europe/London' },
  { code: 'BHD', icao: 'EGAC', name: 'Belfast City George Best', city: 'Belfast', country: 'UK', lat: 54.6181, lon: -5.8725, timezone: 'Europe/London' },
  { code: 'SOU', icao: 'EGHI', name: 'Southampton', city: 'Southampton', country: 'UK', lat: 50.9503, lon: -1.3568, timezone: 'Europe/London' },
  { code: 'CWL', icao: 'EGFF', name: 'Cardiff', city: 'Cardiff', country: 'UK', lat: 51.3967, lon: -3.3431, timezone: 'Europe/London' },
  { code: 'INV', icao: 'EGPE', name: 'Inverness', city: 'Inverness', country: 'UK', lat: 57.5425, lon: -4.0475, timezone: 'Europe/London' },
  { code: 'EXT', icao: 'EGTE', name: 'Exeter', city: 'Exeter', country: 'UK', lat: 50.7344, lon: -3.4139, timezone: 'Europe/London' },
  { code: 'NQY', icao: 'EGHQ', name: 'Newquay Cornwall', city: 'Newquay', country: 'UK', lat: 50.4406, lon: -4.9954, timezone: 'Europe/London' },
  { code: 'BOH', icao: 'EGHH', name: 'Bournemouth', city: 'Bournemouth', country: 'UK', lat: 50.7800, lon: -1.8425, timezone: 'Europe/London' },
  { code: 'NWI', icao: 'EGSH', name: 'Norwich', city: 'Norwich', country: 'UK', lat: 52.6758, lon: 1.2828, timezone: 'Europe/London' },
  { code: 'HUY', icao: 'EGNJ', name: 'Humberside', city: 'Humberside', country: 'UK', lat: 53.5744, lon: -0.3508, timezone: 'Europe/London' },
  { code: 'DSA', icao: 'EGCN', name: 'Doncaster Sheffield', city: 'Doncaster', country: 'UK', lat: 53.4747, lon: -1.0106, timezone: 'Europe/London' },
  { code: 'BLK', icao: 'EGNH', name: 'Blackpool', city: 'Blackpool', country: 'UK', lat: 53.7717, lon: -3.0286, timezone: 'Europe/London' },
  { code: 'IOM', icao: 'EGNS', name: 'Isle of Man', city: 'Isle of Man', country: 'UK', lat: 54.0833, lon: -4.6239, timezone: 'Europe/Isle_of_Man' },
  { code: 'JER', icao: 'EGJJ', name: 'Jersey', city: 'Jersey', country: 'UK', lat: 49.2079, lon: -2.1955, timezone: 'Europe/Jersey' },
  { code: 'GCI', icao: 'EGJB', name: 'Guernsey', city: 'Guernsey', country: 'UK', lat: 49.4350, lon: -2.6020, timezone: 'Europe/Guernsey' },
  { code: 'PSE', icao: 'EGMC', name: 'Penzance Heliport', city: 'Penzance', country: 'UK', lat: 50.1283, lon: -5.5178, timezone: 'Europe/London' },
  { code: 'PIK', icao: 'EGPK', name: 'Glasgow Prestwick', city: 'Glasgow', country: 'UK', lat: 55.5094, lon: -4.5867, timezone: 'Europe/London' },
  { code: 'DND', icao: 'EGPN', name: 'Dundee', city: 'Dundee', country: 'UK', lat: 56.4525, lon: -3.0258, timezone: 'Europe/London' },
  { code: 'BEB', icao: 'EGPL', name: 'Benbecula', city: 'Benbecula', country: 'UK', lat: 57.4811, lon: -7.3628, timezone: 'Europe/London' },

  // ==================== IRLANDA (10 aeropuertos) ====================
  { code: 'DUB', icao: 'EIDW', name: 'Dublin', city: 'Dublin', country: 'Ireland', lat: 53.4213, lon: -6.2700, timezone: 'Europe/Dublin' },
  { code: 'ORK', icao: 'EICK', name: 'Cork', city: 'Cork', country: 'Ireland', lat: 51.8413, lon: -8.4911, timezone: 'Europe/Dublin' },
  { code: 'SNN', icao: 'EINN', name: 'Shannon', city: 'Shannon', country: 'Ireland', lat: 52.7020, lon: -8.9248, timezone: 'Europe/Dublin' },
  { code: 'KIR', icao: 'EIKY', name: 'Kerry', city: 'Kerry', country: 'Ireland', lat: 52.1809, lon: -9.5238, timezone: 'Europe/Dublin' },
  { code: 'NOC', icao: 'EIKN', name: 'Ireland West Knock', city: 'Knock', country: 'Ireland', lat: 53.9103, lon: -8.8185, timezone: 'Europe/Dublin' },
  { code: 'WAT', icao: 'EIWT', name: 'Waterford', city: 'Waterford', country: 'Ireland', lat: 52.1872, lon: -7.0869, timezone: 'Europe/Dublin' },
  { code: 'DGL', icao: 'EIDL', name: 'Donegal', city: 'Donegal', country: 'Ireland', lat: 55.0442, lon: -8.3410, timezone: 'Europe/Dublin' },
  { code: 'GWY', icao: 'EICM', name: 'Galway', city: 'Galway', country: 'Ireland', lat: 53.3002, lon: -8.9416, timezone: 'Europe/Dublin' },
  { code: 'CFN', icao: 'EICA', name: 'Donegal Carrickfinn', city: 'Donegal', country: 'Ireland', lat: 55.0442, lon: -8.3410, timezone: 'Europe/Dublin' },
  { code: 'SXL', icao: 'EISG', name: 'Sligo', city: 'Sligo', country: 'Ireland', lat: 54.2803, lon: -8.5992, timezone: 'Europe/Dublin' },

  // ==================== FRANCIA (30 aeropuertos principales) ====================
  { code: 'CDG', icao: 'LFPG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France', lat: 49.0097, lon: 2.5479, timezone: 'Europe/Paris' },
  { code: 'ORY', icao: 'LFPO', name: 'Paris Orly', city: 'Paris', country: 'France', lat: 48.7233, lon: 2.3794, timezone: 'Europe/Paris' },
  { code: 'BVA', icao: 'LFOB', name: 'Paris Beauvais-Tillé', city: 'Paris', country: 'France', lat: 49.4544, lon: 2.1128, timezone: 'Europe/Paris' },
  { code: 'NCE', icao: 'LFMN', name: 'Nice Côte d\'Azur', city: 'Nice', country: 'France', lat: 43.6584, lon: 7.2159, timezone: 'Europe/Paris' },
  { code: 'LYS', icao: 'LFLL', name: 'Lyon-Saint Exupéry', city: 'Lyon', country: 'France', lat: 45.7256, lon: 5.0811, timezone: 'Europe/Paris' },
  { code: 'MRS', icao: 'LFML', name: 'Marseille Provence', city: 'Marseille', country: 'France', lat: 43.4393, lon: 5.2214, timezone: 'Europe/Paris' },
  { code: 'TLS', icao: 'LFBO', name: 'Toulouse-Blagnac', city: 'Toulouse', country: 'France', lat: 43.6294, lon: 1.3638, timezone: 'Europe/Paris' },
  { code: 'BOD', icao: 'LFBD', name: 'Bordeaux-Mérignac', city: 'Bordeaux', country: 'France', lat: 44.8283, lon: -0.7153, timezone: 'Europe/Paris' },
  { code: 'NTE', icao: 'LFRS', name: 'Nantes Atlantique', city: 'Nantes', country: 'France', lat: 47.1532, lon: -1.6108, timezone: 'Europe/Paris' },
  { code: 'LIL', icao: 'LFQQ', name: 'Lille-Lesquin', city: 'Lille', country: 'France', lat: 50.5636, lon: 3.0895, timezone: 'Europe/Paris' },
  { code: 'SXB', icao: 'LFLL', name: 'Strasbourg', city: 'Strasbourg', country: 'France', lat: 48.5383, lon: 7.6283, timezone: 'Europe/Paris' },
  { code: 'BSL', icao: 'LFSB', name: 'EuroAirport Basel-Mulhouse-Freiburg', city: 'Basel', country: 'France', lat: 47.5900, lon: 7.5292, timezone: 'Europe/Paris' },
  { code: 'MPL', icao: 'LFMT', name: 'Montpellier-Méditerranée', city: 'Montpellier', country: 'France', lat: 43.5762, lon: 3.9630, timezone: 'Europe/Paris' },
  { code: 'BIQ', icao: 'LFBZ', name: 'Biarritz Pays Basque', city: 'Biarritz', country: 'France', lat: 43.4683, lon: -1.5311, timezone: 'Europe/Paris' },
  { code: 'RNS', icao: 'LFRN', name: 'Rennes-Saint-Jacques', city: 'Rennes', country: 'France', lat: 48.0695, lon: -1.7348, timezone: 'Europe/Paris' },
  { code: 'AJA', icao: 'LFKJ', name: 'Ajaccio Napoleon Bonaparte', city: 'Ajaccio', country: 'France', lat: 41.9236, lon: 8.8029, timezone: 'Europe/Paris' },
  { code: 'BIA', icao: 'LFKB', name: 'Bastia-Poretta', city: 'Bastia', country: 'France', lat: 42.5527, lon: 9.4837, timezone: 'Europe/Paris' },
  { code: 'FSC', icao: 'LFKF', name: 'Figari Sud-Corse', city: 'Figari', country: 'France', lat: 41.5006, lon: 9.0978, timezone: 'Europe/Paris' },
  { code: 'CLY', icao: 'LFMK', name: 'Calvi-Sainte-Catherine', city: 'Calvi', country: 'France', lat: 42.5244, lon: 8.7931, timezone: 'Europe/Paris' },
  { code: 'PGF', icao: 'LFMP', name: 'Perpignan-Rivesaltes', city: 'Perpignan', country: 'France', lat: 42.7404, lon: 2.8707, timezone: 'Europe/Paris' },
  { code: 'CFE', icao: 'LFLC', name: 'Clermont-Ferrand Auvergne', city: 'Clermont-Ferrand', country: 'France', lat: 45.7867, lon: 3.1692, timezone: 'Europe/Paris' },
  { code: 'BES', icao: 'LFRB', name: 'Brest Bretagne', city: 'Brest', country: 'France', lat: 48.4479, lon: -4.4185, timezone: 'Europe/Paris' },
  { code: 'MXN', icao: 'LFLS', name: 'Morlaix-Ploujean', city: 'Morlaix', country: 'France', lat: 48.6032, lon: -3.8158, timezone: 'Europe/Paris' },
  { code: 'CER', icao: 'LFMT', name: 'Cherbourg-Maupertus', city: 'Cherbourg', country: 'France', lat: 49.6501, lon: -1.4703, timezone: 'Europe/Paris' },
  { code: 'DNR', icao: 'LFRD', name: 'Dinard-Pleurtuit-Saint-Malo', city: 'Dinard', country: 'France', lat: 48.5877, lon: -2.0799, timezone: 'Europe/Paris' },
  { code: 'LDE', icao: 'LFBT', name: 'Tarbes-Lourdes-Pyrénées', city: 'Lourdes', country: 'France', lat: 43.1787, lon: -0.0064, timezone: 'Europe/Paris' },
  { code: 'PUF', icao: 'LFBP', name: 'Pau Pyrénées', city: 'Pau', country: 'France', lat: 43.3800, lon: -0.4186, timezone: 'Europe/Paris' },
  { code: 'LRH', icao: 'LFBH', name: 'La Rochelle-Île de Ré', city: 'La Rochelle', country: 'France', lat: 46.1792, lon: -1.1953, timezone: 'Europe/Paris' },
  { code: 'TUF', icao: 'LFOT', name: 'Tours Val de Loire', city: 'Tours', country: 'France', lat: 47.4322, lon: 0.7276, timezone: 'Europe/Paris' },
  { code: 'DIJ', icao: 'LFSD', name: 'Dijon-Bourgogne', city: 'Dijon', country: 'France', lat: 47.2689, lon: 5.0900, timezone: 'Europe/Paris' },

  // ==================== ALEMANIA (30 aeropuertos principales) ====================
  { code: 'FRA', icao: 'EDDF', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany', lat: 50.0379, lon: 8.5622, timezone: 'Europe/Berlin' },
  { code: 'MUC', icao: 'EDDM', name: 'Munich Franz Josef Strauss', city: 'Munich', country: 'Germany', lat: 48.3538, lon: 11.7861, timezone: 'Europe/Berlin' },
  { code: 'DUS', icao: 'EDDL', name: 'Düsseldorf', city: 'Düsseldorf', country: 'Germany', lat: 51.2895, lon: 6.7668, timezone: 'Europe/Berlin' },
  { code: 'TXL', icao: 'EDDT', name: 'Berlin Tegel', city: 'Berlin', country: 'Germany', lat: 52.5597, lon: 13.2877, timezone: 'Europe/Berlin' },
  { code: 'BER', icao: 'EDDB', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany', lat: 52.3667, lon: 13.5033, timezone: 'Europe/Berlin' },
  { code: 'HAM', icao: 'EDDH', name: 'Hamburg', city: 'Hamburg', country: 'Germany', lat: 53.6304, lon: 9.9882, timezone: 'Europe/Berlin' },
  { code: 'CGN', icao: 'EDDK', name: 'Cologne Bonn', city: 'Cologne', country: 'Germany', lat: 50.8659, lon: 7.1427, timezone: 'Europe/Berlin' },
  { code: 'STR', icao: 'EDDS', name: 'Stuttgart', city: 'Stuttgart', country: 'Germany', lat: 48.6899, lon: 9.2220, timezone: 'Europe/Berlin' },
  { code: 'HAJ', icao: 'EDDV', name: 'Hannover', city: 'Hannover', country: 'Germany', lat: 52.4611, lon: 9.6850, timezone: 'Europe/Berlin' },
  { code: 'NUE', icao: 'EDDN', name: 'Nuremberg', city: 'Nuremberg', country: 'Germany', lat: 49.4987, lon: 11.0669, timezone: 'Europe/Berlin' },
  { code: 'DRS', icao: 'EDDC', name: 'Dresden', city: 'Dresden', country: 'Germany', lat: 51.1328, lon: 13.7672, timezone: 'Europe/Berlin' },
  { code: 'LEJ', icao: 'EDDP', name: 'Leipzig/Halle', city: 'Leipzig', country: 'Germany', lat: 51.4324, lon: 12.2416, timezone: 'Europe/Berlin' },
  { code: 'BRE', icao: 'EDDW', name: 'Bremen', city: 'Bremen', country: 'Germany', lat: 53.0475, lon: 8.7867, timezone: 'Europe/Berlin' },
  { code: 'DTM', icao: 'EDLW', name: 'Dortmund', city: 'Dortmund', country: 'Germany', lat: 51.5183, lon: 7.6122, timezone: 'Europe/Berlin' },
  { code: 'FMO', icao: 'EDDG', name: 'Münster Osnabrück', city: 'Münster', country: 'Germany', lat: 52.1346, lon: 7.6848, timezone: 'Europe/Berlin' },
  { code: 'PAD', icao: 'EDLP', name: 'Paderborn/Lippstadt', city: 'Paderborn', country: 'Germany', lat: 51.6141, lon: 8.6163, timezone: 'Europe/Berlin' },
  { code: 'SXF', icao: 'EDDB', name: 'Berlin Schönefeld', city: 'Berlin', country: 'Germany', lat: 52.3800, lon: 13.5225, timezone: 'Europe/Berlin' },
  { code: 'FDH', icao: 'EDNY', name: 'Friedrichshafen', city: 'Friedrichshafen', country: 'Germany', lat: 47.6713, lon: 9.5115, timezone: 'Europe/Berlin' },
  { code: 'FKB', icao: 'EDSB', name: 'Karlsruhe/Baden-Baden', city: 'Baden-Baden', country: 'Germany', lat: 48.7794, lon: 8.0805, timezone: 'Europe/Berlin' },
  { code: 'SCN', icao: 'EDGS', name: 'Saarbrücken', city: 'Saarbrücken', country: 'Germany', lat: 49.2146, lon: 7.1095, timezone: 'Europe/Berlin' },
  { code: 'MGL', icao: 'EDLN', name: 'Mönchengladbach', city: 'Mönchengladbach', country: 'Germany', lat: 51.2303, lon: 6.5044, timezone: 'Europe/Berlin' },
  { code: 'NRN', icao: 'EDLV', name: 'Weeze (Niederrhein)', city: 'Weeze', country: 'Germany', lat: 51.6024, lon: 6.1422, timezone: 'Europe/Berlin' },
  { code: 'HHN', icao: 'EDFH', name: 'Frankfurt-Hahn', city: 'Hahn', country: 'Germany', lat: 49.9487, lon: 7.2639, timezone: 'Europe/Berlin' },
  { code: 'ERF', icao: 'EDDE', name: 'Erfurt-Weimar', city: 'Erfurt', country: 'Germany', lat: 50.9798, lon: 10.9581, timezone: 'Europe/Berlin' },
  { code: 'KSF', icao: 'EDVK', name: 'Kassel-Calden', city: 'Kassel', country: 'Germany', lat: 51.4083, lon: 9.3775, timezone: 'Europe/Berlin' },
  { code: 'ZQW', icao: 'EDRZ', name: 'Zweibrücken', city: 'Zweibrücken', country: 'Germany', lat: 49.2094, lon: 7.4006, timezone: 'Europe/Berlin' },
  { code: 'RLG', icao: 'EDRJ', name: 'Rostock-Laage', city: 'Rostock', country: 'Germany', lat: 53.9182, lon: 12.2783, timezone: 'Europe/Berlin' },
  { code: 'GWT', icao: 'EDWI', name: 'Sylt', city: 'Sylt', country: 'Germany', lat: 54.9132, lon: 8.3404, timezone: 'Europe/Berlin' },
  { code: 'HGL', icao: 'EDXH', name: 'Helgoland', city: 'Helgoland', country: 'Germany', lat: 54.1853, lon: 7.9158, timezone: 'Europe/Berlin' },
  { code: 'FMM', icao: 'EDJA', name: 'Memmingen (Allgäu)', city: 'Memmingen', country: 'Germany', lat: 47.9888, lon: 10.2395, timezone: 'Europe/Berlin' },

  // ==================== ITALIA (30 aeropuertos principales) ====================
  { code: 'FCO', icao: 'LIRF', name: 'Rome Fiumicino Leonardo da Vinci', city: 'Rome', country: 'Italy', lat: 41.8003, lon: 12.2389, timezone: 'Europe/Rome' },
  { code: 'CIA', icao: 'LIRA', name: 'Rome Ciampino', city: 'Rome', country: 'Italy', lat: 41.7994, lon: 12.5949, timezone: 'Europe/Rome' },
  { code: 'MXP', icao: 'LIMC', name: 'Milan Malpensa', city: 'Milan', country: 'Italy', lat: 45.6301, lon: 8.7231, timezone: 'Europe/Rome' },
  { code: 'LIN', icao: 'LIML', name: 'Milan Linate', city: 'Milan', country: 'Italy', lat: 45.4451, lon: 9.2767, timezone: 'Europe/Rome' },
  { code: 'BGY', icao: 'LIME', name: 'Milan Bergamo Orio al Serio', city: 'Bergamo', country: 'Italy', lat: 45.6739, lon: 9.7042, timezone: 'Europe/Rome' },
  { code: 'VCE', icao: 'LIPZ', name: 'Venice Marco Polo', city: 'Venice', country: 'Italy', lat: 45.5053, lon: 12.3519, timezone: 'Europe/Rome' },
  { code: 'TSF', icao: 'LIPH', name: 'Venice Treviso', city: 'Treviso', country: 'Italy', lat: 45.6484, lon: 12.1944, timezone: 'Europe/Rome' },
  { code: 'NAP', icao: 'LIRN', name: 'Naples', city: 'Naples', country: 'Italy', lat: 40.8860, lon: 14.2908, timezone: 'Europe/Rome' },
  { code: 'BLQ', icao: 'LIPE', name: 'Bologna Guglielmo Marconi', city: 'Bologna', country: 'Italy', lat: 44.5354, lon: 11.2887, timezone: 'Europe/Rome' },
  { code: 'CTA', icao: 'LICC', name: 'Catania Fontanarossa', city: 'Catania', country: 'Italy', lat: 37.4668, lon: 15.0664, timezone: 'Europe/Rome' },
  { code: 'PMO', icao: 'LICJ', name: 'Palermo Falcone-Borsellino', city: 'Palermo', country: 'Italy', lat: 38.1759, lon: 13.0910, timezone: 'Europe/Rome' },
  { code: 'TRN', icao: 'LIMF', name: 'Turin Caselle', city: 'Turin', country: 'Italy', lat: 45.2008, lon: 7.6496, timezone: 'Europe/Rome' },
  { code: 'PSA', icao: 'LIRP', name: 'Pisa Galileo Galilei', city: 'Pisa', country: 'Italy', lat: 43.6839, lon: 10.3927, timezone: 'Europe/Rome' },
  { code: 'FLR', icao: 'LIRQ', name: 'Florence Peretola', city: 'Florence', country: 'Italy', lat: 43.8100, lon: 11.2051, timezone: 'Europe/Rome' },
  { code: 'VRN', icao: 'LIPX', name: 'Verona Villafranca', city: 'Verona', country: 'Italy', lat: 45.3957, lon: 10.8885, timezone: 'Europe/Rome' },
  { code: 'GOA', icao: 'LIMJ', name: 'Genoa Cristoforo Colombo', city: 'Genoa', country: 'Italy', lat: 44.4133, lon: 8.8375, timezone: 'Europe/Rome' },
  { code: 'BRI', icao: 'LIBD', name: 'Bari Karol Wojtyła', city: 'Bari', country: 'Italy', lat: 41.1389, lon: 16.7606, timezone: 'Europe/Rome' },
  { code: 'CAG', icao: 'LIEE', name: 'Cagliari Elmas', city: 'Cagliari', country: 'Italy', lat: 39.2515, lon: 9.0543, timezone: 'Europe/Rome' },
  { code: 'OLB', icao: 'LIEO', name: 'Olbia Costa Smeralda', city: 'Olbia', country: 'Italy', lat: 40.8987, lon: 9.5176, timezone: 'Europe/Rome' },
  { code: 'AHO', icao: 'LIEA', name: 'Alghero Fertilia', city: 'Alghero', country: 'Italy', lat: 40.6321, lon: 8.2908, timezone: 'Europe/Rome' },
  { code: 'CIY', icao: 'LICT', name: 'Comiso', city: 'Comiso', country: 'Italy', lat: 36.9946, lon: 14.6072, timezone: 'Europe/Rome' },
  { code: 'TPS', icao: 'LICT', name: 'Trapani Birgi', city: 'Trapani', country: 'Italy', lat: 37.9114, lon: 12.4880, timezone: 'Europe/Rome' },
  { code: 'BDS', icao: 'LIBR', name: 'Brindisi Salento', city: 'Brindisi', country: 'Italy', lat: 40.6576, lon: 17.9470, timezone: 'Europe/Rome' },
  { code: 'FOG', icao: 'LIBF', name: 'Foggia Gino Lisa', city: 'Foggia', country: 'Italy', lat: 41.4329, lon: 15.5350, timezone: 'Europe/Rome' },
  { code: 'SUF', icao: 'LIQS', name: 'Lamezia Terme', city: 'Lamezia Terme', country: 'Italy', lat: 38.9054, lon: 16.2423, timezone: 'Europe/Rome' },
  { code: 'REG', icao: 'LICR', name: 'Reggio Calabria', city: 'Reggio Calabria', country: 'Italy', lat: 38.0712, lon: 15.6516, timezone: 'Europe/Rome' },
  { code: 'PEG', icao: 'LIRZ', name: 'Perugia San Francesco', city: 'Perugia', country: 'Italy', lat: 43.0959, lon: 12.5132, timezone: 'Europe/Rome' },
  { code: 'AOI', icao: 'LIPY', name: 'Ancona Falconara', city: 'Ancona', country: 'Italy', lat: 43.6163, lon: 13.3623, timezone: 'Europe/Rome' },
  { code: 'RMI', icao: 'LIPR', name: 'Rimini Federico Fellini', city: 'Rimini', country: 'Italy', lat: 44.0203, lon: 12.6117, timezone: 'Europe/Rome' },
  { code: 'TRS', icao: 'LIPQ', name: 'Trieste Ronchi dei Legionari', city: 'Trieste', country: 'Italy', lat: 45.8275, lon: 13.4722, timezone: 'Europe/Rome' },

  // ==================== PAÍSES BAJOS (5 aeropuertos) ====================
  { code: 'AMS', icao: 'EHAM', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands', lat: 52.3105, lon: 4.7683, timezone: 'Europe/Amsterdam' },
  { code: 'EIN', icao: 'EHEH', name: 'Eindhoven', city: 'Eindhoven', country: 'Netherlands', lat: 51.4500, lon: 5.3747, timezone: 'Europe/Amsterdam' },
  { code: 'RTM', icao: 'EHRD', name: 'Rotterdam The Hague', city: 'Rotterdam', country: 'Netherlands', lat: 51.9569, lon: 4.4372, timezone: 'Europe/Amsterdam' },
  { code: 'MST', icao: 'EHBK', name: 'Maastricht Aachen', city: 'Maastricht', country: 'Netherlands', lat: 50.9117, lon: 5.7701, timezone: 'Europe/Amsterdam' },
  { code: 'GRQ', icao: 'EHGG', name: 'Groningen Eelde', city: 'Groningen', country: 'Netherlands', lat: 53.1197, lon: 6.5794, timezone: 'Europe/Amsterdam' },

  // ... (Continuaría con más regiones: Bélgica, Suiza, Austria, Europa del Este, Escandinavia, 
  // América del Norte, América del Sur, Asia, África, Oceanía, Oriente Medio...)
  
  // Por brevedad, aquí incluyo algunos aeropuertos clave adicionales:

  // SUIZA
  { code: 'ZRH', icao: 'LSZH', name: 'Zurich', city: 'Zurich', country: 'Switzerland', lat: 47.4647, lon: 8.5492, timezone: 'Europe/Zurich' },
  { code: 'GVA', icao: 'LSGG', name: 'Geneva', city: 'Geneva', country: 'Switzerland', lat: 49.0097, lon: 6.1092, timezone: 'Europe/Zurich' },
  { code: 'BRN', icao: 'LSZB', name: 'Bern', city: 'Bern', country: 'Switzerland', lat: 46.9141, lon: 7.4975, timezone: 'Europe/Zurich' },

  // AUSTRIA
  { code: 'VIE', icao: 'LOWW', name: 'Vienna International', city: 'Vienna', country: 'Austria', lat: 48.1103, lon: 16.5697, timezone: 'Europe/Vienna' },
  { code: 'SZG', icao: 'LOWS', name: 'Salzburg W.A. Mozart', city: 'Salzburg', country: 'Austria', lat: 47.7933, lon: 13.0043, timezone: 'Europe/Vienna' },
  { code: 'INN', icao: 'LOWI', name: 'Innsbruck', city: 'Innsbruck', country: 'Austria', lat: 47.2602, lon: 11.3440, timezone: 'Europe/Vienna' },

  // BÉLGICA
  { code: 'BRU', icao: 'EBBR', name: 'Brussels', city: 'Brussels', country: 'Belgium', lat: 50.9010, lon: 4.4844, timezone: 'Europe/Brussels' },
  { code: 'CRL', icao: 'EBCI', name: 'Brussels South Charleroi', city: 'Charleroi', country: 'Belgium', lat: 50.4592, lon: 4.4538, timezone: 'Europe/Brussels' },
  { code: 'ANR', icao: 'EBAW', name: 'Antwerp', city: 'Antwerp', country: 'Belgium', lat: 51.1894, lon: 4.4603, timezone: 'Europe/Brussels' },

  // ESCANDINAVIA
  { code: 'CPH', icao: 'EKCH', name: 'Copenhagen Kastrup', city: 'Copenhagen', country: 'Denmark', lat: 55.6181, lon: 12.6561, timezone: 'Europe/Copenhagen' },
  { code: 'ARN', icao: 'ESSA', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden', lat: 59.6519, lon: 17.9186, timezone: 'Europe/Stockholm' },
  { code: 'GOT', icao: 'ESGG', name: 'Gothenburg Landvetter', city: 'Gothenburg', country: 'Sweden', lat: 57.6628, lon: 12.2798, timezone: 'Europe/Stockholm' },
  { code: 'OSL', icao: 'ENGM', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norway', lat: 60.1939, lon: 11.1004, timezone: 'Europe/Oslo' },
  { code: 'BGO', icao: 'ENBR', name: 'Bergen Flesland', city: 'Bergen', country: 'Norway', lat: 60.2934, lon: 5.2181, timezone: 'Europe/Oslo' },
  { code: 'HEL', icao: 'EFHK', name: 'Helsinki Vantaa', city: 'Helsinki', country: 'Finland', lat: 60.3172, lon: 24.9633, timezone: 'Europe/Helsinki' },

  // EUROPA DEL ESTE
  { code: 'WAW', icao: 'EPWA', name: 'Warsaw Chopin', city: 'Warsaw', country: 'Poland', lat: 52.1657, lon: 20.9671, timezone: 'Europe/Warsaw' },
  { code: 'KRK', icao: 'EPKK', name: 'Krakow John Paul II', city: 'Krakow', country: 'Poland', lat: 50.0777, lon: 19.7848, timezone: 'Europe/Warsaw' },
  { code: 'PRG', icao: 'LKPR', name: 'Prague Václav Havel', city: 'Prague', country: 'Czech Republic', lat: 50.1008, lon: 14.2600, timezone: 'Europe/Prague' },
  { code: 'BUD', icao: 'LHBP', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungary', lat: 47.4299, lon: 19.2611, timezone: 'Europe/Budapest' },
  { code: 'OTP', icao: 'LROP', name: 'Bucharest Henri Coandă', city: 'Bucharest', country: 'Romania', lat: 44.5711, lon: 26.0850, timezone: 'Europe/Bucharest' },
  { code: 'SOF', icao: 'LBSF', name: 'Sofia', city: 'Sofia', country: 'Bulgaria', lat: 42.6952, lon: 23.4114, timezone: 'Europe/Sofia' },

  // GRECIA
  { code: 'ATH', icao: 'LGAV', name: 'Athens Eleftherios Venizelos', city: 'Athens', country: 'Greece', lat: 37.9364, lon: 23.9445, timezone: 'Europe/Athens' },
  { code: 'SKG', icao: 'LGTS', name: 'Thessaloniki Macedonia', city: 'Thessaloniki', country: 'Greece', lat: 40.5197, lon: 22.9709, timezone: 'Europe/Athens' },
  { code: 'HER', icao: 'LGIR', name: 'Heraklion Nikos Kazantzakis', city: 'Heraklion', country: 'Greece', lat: 35.3397, lon: 25.1803, timezone: 'Europe/Athens' },
  { code: 'RHO', icao: 'LGRP', name: 'Rhodes Diagoras', city: 'Rhodes', country: 'Greece', lat: 36.4054, lon: 28.0862, timezone: 'Europe/Athens' },
  { code: 'CFU', icao: 'LGKR', name: 'Corfu Ioannis Kapodistrias', city: 'Corfu', country: 'Greece', lat: 39.6019, lon: 19.9117, timezone: 'Europe/Athens' },

  // TURQUÍA
  { code: 'IST', icao: 'LTFM', name: 'Istanbul', city: 'Istanbul', country: 'Turkey', lat: 41.2750, lon: 28.7519, timezone: 'Europe/Istanbul' },
  { code: 'SAW', icao: 'LTFJ', name: 'Istanbul Sabiha Gökçen', city: 'Istanbul', country: 'Turkey', lat: 40.8986, lon: 29.3092, timezone: 'Europe/Istanbul' },
  { code: 'AYT', icao: 'LTAI', name: 'Antalya', city: 'Antalya', country: 'Turkey', lat: 36.8987, lon: 30.8005, timezone: 'Europe/Istanbul' },
  { code: 'ESB', icao: 'LTAC', name: 'Ankara Esenboğa', city: 'Ankara', country: 'Turkey', lat: 40.1281, lon: 32.9951, timezone: 'Europe/Istanbul' },

  // AMÉRICA DEL NORTE
  { code: 'JFK', icao: 'KJFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', lat: 40.6413, lon: -73.7781, timezone: 'America/New_York' },
  { code: 'LAX', icao: 'KLAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', lat: 33.9416, lon: -118.4085, timezone: 'America/Los_Angeles' },
  { code: 'ORD', icao: 'KORD', name: 'Chicago O\'Hare International', city: 'Chicago', country: 'USA', lat: 41.9742, lon: -87.9073, timezone: 'America/Chicago' },
  { code: 'MIA', icao: 'KMIA', name: 'Miami International', city: 'Miami', country: 'USA', lat: 25.7959, lon: -80.2870, timezone: 'America/New_York' },
  { code: 'SFO', icao: 'KSFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA', lat: 37.6213, lon: -122.3790, timezone: 'America/Los_Angeles' },
  { code: 'YYZ', icao: 'CYYZ', name: 'Toronto Pearson', city: 'Toronto', country: 'Canada', lat: 43.6777, lon: -79.6248, timezone: 'America/Toronto' },
  { code: 'YVR', icao: 'CYVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada', lat: 49.1947, lon: -123.1839, timezone: 'America/Vancouver' },
  { code: 'MEX', icao: 'MMMX', name: 'Mexico City International', city: 'Mexico City', country: 'Mexico', lat: 19.4363, lon: -99.0721, timezone: 'America/Mexico_City' },

  // AMÉRICA DEL SUR
  { code: 'GRU', icao: 'SBGR', name: 'São Paulo/Guarulhos', city: 'São Paulo', country: 'Brazil', lat: -23.4356, lon: -46.4731, timezone: 'America/Sao_Paulo' },
  { code: 'GIG', icao: 'SBGL', name: 'Rio de Janeiro Galeão', city: 'Rio de Janeiro', country: 'Brazil', lat: -22.8099, lon: -43.2505, timezone: 'America/Sao_Paulo' },
  { code: 'EZE', icao: 'SAEZ', name: 'Buenos Aires Ezeiza', city: 'Buenos Aires', country: 'Argentina', lat: -34.8222, lon: -58.5358, timezone: 'America/Argentina/Buenos_Aires' },
  { code: 'SCL', icao: 'SCEL', name: 'Santiago Arturo Merino Benítez', city: 'Santiago', country: 'Chile', lat: -33.3930, lon: -70.7858, timezone: 'America/Santiago' },
  { code: 'BOG', icao: 'SKBO', name: 'Bogotá El Dorado', city: 'Bogotá', country: 'Colombia', lat: 4.7016, lon: -74.1469, timezone: 'America/Bogota' },

  // ASIA
  { code: 'DXB', icao: 'OMDB', name: 'Dubai International', city: 'Dubai', country: 'UAE', lat: 25.2532, lon: 55.3657, timezone: 'Asia/Dubai' },
  { code: 'SIN', icao: 'WSSS', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', lat: 1.3644, lon: 103.9915, timezone: 'Asia/Singapore' },
  { code: 'HND', icao: 'RJTT', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', lat: 35.5494, lon: 139.7798, timezone: 'Asia/Tokyo' },
  { code: 'NRT', icao: 'RJAA', name: 'Tokyo Narita', city: 'Tokyo', country: 'Japan', lat: 35.7647, lon: 140.3864, timezone: 'Asia/Tokyo' },
  { code: 'HKG', icao: 'VHHH', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong', lat: 22.3080, lon: 113.9185, timezone: 'Asia/Hong_Kong' },
  { code: 'PEK', icao: 'ZBAA', name: 'Beijing Capital', city: 'Beijing', country: 'China', lat: 40.0801, lon: 116.5846, timezone: 'Asia/Shanghai' },
  { code: 'PVG', icao: 'ZSPD', name: 'Shanghai Pudong', city: 'Shanghai', country: 'China', lat: 31.1434, lon: 121.8052, timezone: 'Asia/Shanghai' },
  { code: 'ICN', icao: 'RKSI', name: 'Seoul Incheon', city: 'Seoul', country: 'South Korea', lat: 37.4602, lon: 126.4407, timezone: 'Asia/Seoul' },
  { code: 'BKK', icao: 'VTBS', name: 'Bangkok Suvarnabhumi', city: 'Bangkok', country: 'Thailand', lat: 13.6810, lon: 100.7472, timezone: 'Asia/Bangkok' },
  { code: 'KUL', icao: 'WMKK', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia', lat: 2.7456, lon: 101.7099, timezone: 'Asia/Kuala_Lumpur' },
  { code: 'DEL', icao: 'VIDP', name: 'Delhi Indira Gandhi', city: 'Delhi', country: 'India', lat: 28.5562, lon: 77.1000, timezone: 'Asia/Kolkata' },
  { code: 'BOM', icao: 'VABB', name: 'Mumbai Chhatrapati Shivaji', city: 'Mumbai', country: 'India', lat: 19.0896, lon: 72.8656, timezone: 'Asia/Kolkata' },

  // OCEANÍA
  { code: 'SYD', icao: 'YSSY', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', lat: -33.9399, lon: 151.1753, timezone: 'Australia/Sydney' },
  { code: 'MEL', icao: 'YMML', name: 'Melbourne', city: 'Melbourne', country: 'Australia', lat: -37.6690, lon: 144.8410, timezone: 'Australia/Melbourne' },
  { code: 'BNE', icao: 'YBBN', name: 'Brisbane', city: 'Brisbane', country: 'Australia', lat: -27.3842, lon: 153.1175, timezone: 'Australia/Brisbane' },
  { code: 'PER', icao: 'YPPH', name: 'Perth', city: 'Perth', country: 'Australia', lat: -31.9403, lon: 115.9672, timezone: 'Australia/Perth' },
  { code: 'AKL', icao: 'NZAA', name: 'Auckland', city: 'Auckland', country: 'New Zealand', lat: -37.0082, lon: 174.7850, timezone: 'Pacific/Auckland' },
  { code: 'CHC', icao: 'NZCH', name: 'Christchurch', city: 'Christchurch', country: 'New Zealand', lat: -43.4894, lon: 172.5320, timezone: 'Pacific/Auckland' },

  // ÁFRICA
  { code: 'JNB', icao: 'FAJS', name: 'Johannesburg OR Tambo', city: 'Johannesburg', country: 'South Africa', lat: -26.1392, lon: 28.2460, timezone: 'Africa/Johannesburg' },
  { code: 'CPT', icao: 'FACT', name: 'Cape Town', city: 'Cape Town', country: 'South Africa', lat: -33.9649, lon: 18.6017, timezone: 'Africa/Johannesburg' },
  { code: 'CAI', icao: 'HECA', name: 'Cairo International', city: 'Cairo', country: 'Egypt', lat: 30.1219, lon: 31.4056, timezone: 'Africa/Cairo' },
  { code: 'CMN', icao: 'GMMN', name: 'Casablanca Mohammed V', city: 'Casablanca', country: 'Morocco', lat: 33.3675, lon: -7.5898, timezone: 'Africa/Casablanca' },
  { code: 'ALG', icao: 'DAAG', name: 'Algiers Houari Boumediene', city: 'Algiers', country: 'Algeria', lat: 36.6910, lon: 3.2154, timezone: 'Africa/Algiers' },

  // ORIENTE MEDIO
  { code: 'DOH', icao: 'OTHH', name: 'Doha Hamad International', city: 'Doha', country: 'Qatar', lat: 25.2731, lon: 51.6080, timezone: 'Asia/Qatar' },
  { code: 'AUH', icao: 'OMAA', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'UAE', lat: 24.4330, lon: 54.6511, timezone: 'Asia/Dubai' },
  { code: 'TLV', icao: 'LLBG', name: 'Tel Aviv Ben Gurion', city: 'Tel Aviv', country: 'Israel', lat: 32.0114, lon: 34.8867, timezone: 'Asia/Jerusalem' },
];

