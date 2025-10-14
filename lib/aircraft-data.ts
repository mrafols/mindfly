/**
 * Datos de aeronaves basados en SKYbrary
 * SKYbrary es un repositorio conjunto de Eurocontrol, ICAO y otras organizaciones
 * Referencia para operaciones de vuelo, gestión de tráfico aéreo y seguridad
 */

export interface AircraftType {
  code: string; // Código ICAO
  name: string;
  manufacturer: string;
  category: 'narrow-body' | 'wide-body' | 'regional';
  maxCruiseAltitude: number; // en pies
  typicalCruiseAltitude: number; // en pies
  cruiseSpeed: number; // en knots
  maxTurbulenceRating: 'standard' | 'enhanced' | 'heavy'; // Resistencia a turbulencias
  description: string;
  wingSpan: number; // en metros
  length: number; // en metros
  maxTakeoffWeight: number; // en kg
}

// Base de datos de aeronaves comunes
export const AIRCRAFT_DATABASE: Record<string, AircraftType> = {
  'A320': {
    code: 'A320',
    name: 'Airbus A320',
    manufacturer: 'Airbus',
    category: 'narrow-body',
    maxCruiseAltitude: 39800,
    typicalCruiseAltitude: 37000,
    cruiseSpeed: 447,
    maxTurbulenceRating: 'standard',
    description: 'Avión de pasillo único, uno de los más populares del mundo. Diseño robusto y confiable.',
    wingSpan: 35.8,
    length: 37.57,
    maxTakeoffWeight: 78000
  },
  'A321': {
    code: 'A321',
    name: 'Airbus A321',
    manufacturer: 'Airbus',
    category: 'narrow-body',
    maxCruiseAltitude: 39800,
    typicalCruiseAltitude: 37000,
    cruiseSpeed: 447,
    maxTurbulenceRating: 'standard',
    description: 'Versión alargada del A320. Mayor capacidad manteniendo la misma eficiencia.',
    wingSpan: 35.8,
    length: 44.51,
    maxTakeoffWeight: 93500
  },
  'B737': {
    code: 'B737',
    name: 'Boeing 737',
    manufacturer: 'Boeing',
    category: 'narrow-body',
    maxCruiseAltitude: 41000,
    typicalCruiseAltitude: 37000,
    cruiseSpeed: 453,
    maxTurbulenceRating: 'standard',
    description: 'El avión comercial más vendido de la historia. Extremadamente confiable.',
    wingSpan: 35.9,
    length: 39.5,
    maxTakeoffWeight: 79010
  },
  'B738': {
    code: 'B738',
    name: 'Boeing 737-800',
    manufacturer: 'Boeing',
    category: 'narrow-body',
    maxCruiseAltitude: 41000,
    typicalCruiseAltitude: 37000,
    cruiseSpeed: 453,
    maxTurbulenceRating: 'standard',
    description: 'Versión más popular del 737. Usado por aerolíneas de todo el mundo.',
    wingSpan: 35.79,
    length: 39.47,
    maxTakeoffWeight: 79010
  },
  'A330': {
    code: 'A330',
    name: 'Airbus A330',
    manufacturer: 'Airbus',
    category: 'wide-body',
    maxCruiseAltitude: 41450,
    typicalCruiseAltitude: 38000,
    cruiseSpeed: 470,
    maxTurbulenceRating: 'enhanced',
    description: 'Avión de fuselaje ancho para rutas de medio y largo recorrido. Mayor estabilidad.',
    wingSpan: 60.3,
    length: 63.69,
    maxTakeoffWeight: 242000
  },
  'B777': {
    code: 'B777',
    name: 'Boeing 777',
    manufacturer: 'Boeing',
    category: 'wide-body',
    maxCruiseAltitude: 43100,
    typicalCruiseAltitude: 39000,
    cruiseSpeed: 490,
    maxTurbulenceRating: 'heavy',
    description: 'Avión de largo alcance de gran tamaño. Excelente manejo en turbulencias gracias a su peso.',
    wingSpan: 64.8,
    length: 73.86,
    maxTakeoffWeight: 351530
  },
  'B787': {
    code: 'B787',
    name: 'Boeing 787 Dreamliner',
    manufacturer: 'Boeing',
    category: 'wide-body',
    maxCruiseAltitude: 43000,
    typicalCruiseAltitude: 39000,
    cruiseSpeed: 490,
    maxTurbulenceRating: 'enhanced',
    description: 'Avión moderno con tecnología avanzada. Sistema de control de turbulencias mejorado.',
    wingSpan: 60.1,
    length: 62.8,
    maxTakeoffWeight: 254011
  },
  'A350': {
    code: 'A350',
    name: 'Airbus A350',
    manufacturer: 'Airbus',
    category: 'wide-body',
    maxCruiseAltitude: 43100,
    typicalCruiseAltitude: 39000,
    cruiseSpeed: 488,
    maxTurbulenceRating: 'enhanced',
    description: 'Avión de última generación con materiales compuestos. Vuelo muy suave.',
    wingSpan: 64.75,
    length: 66.89,
    maxTakeoffWeight: 280000
  }
};

/**
 * Obtiene información de una aeronave por su código
 */
export function getAircraftInfo(code: string): AircraftType | null {
  return AIRCRAFT_DATABASE[code.toUpperCase()] || null;
}

/**
 * Ajusta el pronóstico de turbulencia según el tipo de aeronave
 * Los aviones más grandes y pesados manejan mejor las turbulencias
 */
export function adjustTurbulenceByAircraft(
  baseSeverity: 'none' | 'light' | 'moderate' | 'severe',
  baseProbability: number,
  aircraftCode: string
): {
  adjustedSeverity: 'none' | 'light' | 'moderate' | 'severe';
  adjustedProbability: number;
  explanation: string;
} {
  const aircraft = getAircraftInfo(aircraftCode);
  
  if (!aircraft) {
    return {
      adjustedSeverity: baseSeverity,
      adjustedProbability: baseProbability,
      explanation: 'Aeronave estándar'
    };
  }
  
  let adjustedSeverity = baseSeverity;
  let adjustedProbability = baseProbability;
  let explanation = '';
  
  // Los aviones más grandes manejan mejor las turbulencias
  if (aircraft.category === 'wide-body') {
    // Reducir severidad
    if (baseSeverity === 'moderate') {
      adjustedSeverity = 'light';
      adjustedProbability = Math.max(10, baseProbability - 15);
      explanation = `El ${aircraft.name} es un avión de fuselaje ancho con mayor peso, lo que proporciona más estabilidad en turbulencias.`;
    } else if (baseSeverity === 'light') {
      adjustedProbability = Math.max(5, baseProbability - 10);
      explanation = `El ${aircraft.name} manejará estas condiciones con facilidad gracias a su diseño robusto.`;
    }
  }
  
  // Aviones con rating de turbulencia mejorado
  if (aircraft.maxTurbulenceRating === 'enhanced' || aircraft.maxTurbulenceRating === 'heavy') {
    adjustedProbability = Math.max(5, adjustedProbability - 5);
    explanation += explanation ? ' ' : '';
    explanation += 'Este modelo tiene sistemas avanzados de control de vuelo que minimizan el impacto de las turbulencias.';
  }
  
  if (!explanation) {
    explanation = `El ${aircraft.name} es una aeronave ${aircraft.category === 'narrow-body' ? 'estándar muy confiable' : 'de gran tamaño y estabilidad'}.`;
  }
  
  return {
    adjustedSeverity,
    adjustedProbability,
    explanation
  };
}

/**
 * Obtiene la altitud de crucero típica para una aeronave
 */
export function getTypicalCruiseAltitude(aircraftCode: string): number {
  const aircraft = getAircraftInfo(aircraftCode);
  return aircraft?.typicalCruiseAltitude || 35000;
}

