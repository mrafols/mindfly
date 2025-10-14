/**
 * Validación de datos de vuelos
 * Verifica que los datos de vuelos sean coherentes con rutas reales
 */

import { findAirport } from './airports';
import type { Flight } from './flights';

interface FlightValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Valida que un vuelo tenga datos coherentes
 */
export function validateFlight(flight: Flight, originIATA?: string, destinationIATA?: string): FlightValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar formato de número de vuelo
  if (!flight.flightNumber || flight.flightNumber.length < 2) {
    errors.push('Número de vuelo inválido');
  }

  // Validar aerolínea
  if (!flight.airline || flight.airline.trim() === '') {
    warnings.push('Nombre de aerolínea vacío');
  }

  // Validar horarios
  try {
    const depTime = new Date(flight.departureTime);
    const arrTime = new Date(flight.arrivalTime);

    if (isNaN(depTime.getTime())) {
      errors.push('Hora de salida inválida');
    }

    if (isNaN(arrTime.getTime())) {
      errors.push('Hora de llegada inválida');
    }

    // La llegada debe ser después de la salida
    if (depTime.getTime() >= arrTime.getTime()) {
      errors.push('La hora de llegada debe ser posterior a la salida');
    }

    // Validar duración razonable (no más de 24 horas para vuelos comerciales)
    const durationHours = (arrTime.getTime() - depTime.getTime()) / (1000 * 60 * 60);
    if (durationHours > 24) {
      warnings.push(`Duración del vuelo inusualmente larga: ${durationHours.toFixed(1)} horas`);
    }

    if (durationHours < 0.25) {
      warnings.push(`Duración del vuelo inusualmente corta: ${(durationHours * 60).toFixed(0)} minutos`);
    }
  } catch (e) {
    errors.push('Error al procesar horarios');
  }

  // Validar aeronave
  if (!flight.aircraft || flight.aircraft.trim() === '') {
    warnings.push('Tipo de aeronave no especificado');
  }

  // Validar que el vuelo sea coherente con la ruta solicitada
  if (originIATA && destinationIATA) {
    // Aquí podrías hacer validaciones adicionales específicas
    // Por ejemplo, verificar que no exista en una lista de rutas incorrectas conocidas
    const incorrectRoutes = getKnownIncorrectRoutes();
    const routeKey = `${originIATA}-${destinationIATA}`;
    
    if (incorrectRoutes[flight.flightNumber]?.includes(routeKey)) {
      errors.push(`El vuelo ${flight.flightNumber} no opera en la ruta ${originIATA}-${destinationIATA}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valida que la duración del vuelo sea coherente con la distancia
 */
export function validateFlightDuration(
  departureTime: string,
  arrivalTime: string,
  distanceKm: number
): FlightValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const depTime = new Date(departureTime);
    const arrTime = new Date(arrivalTime);
    
    const durationHours = (arrTime.getTime() - depTime.getTime()) / (1000 * 60 * 60);
    
    // Velocidad promedio esperada: entre 700-900 km/h
    const averageSpeed = distanceKm / durationHours;
    
    if (averageSpeed < 400) {
      warnings.push(`Velocidad promedio inusualmente baja: ${averageSpeed.toFixed(0)} km/h`);
    }
    
    if (averageSpeed > 1000) {
      warnings.push(`Velocidad promedio inusualmente alta: ${averageSpeed.toFixed(0)} km/h`);
    }

    // Calcular duración esperada (850 km/h promedio)
    const expectedDurationHours = distanceKm / 850;
    const difference = Math.abs(durationHours - expectedDurationHours);
    
    // Si la diferencia es mayor a 2 horas, algo puede estar mal
    if (difference > 2) {
      warnings.push(
        `Duración del vuelo (${durationHours.toFixed(1)}h) difiere significativamente ` +
        `de lo esperado (${expectedDurationHours.toFixed(1)}h) para ${distanceKm.toFixed(0)} km`
      );
    }
  } catch (e) {
    errors.push('Error al validar duración del vuelo');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Base de datos de vuelos con rutas incorrectas conocidas
 * Formato: { 'NUMERO_VUELO': ['RUTA_INCORRECTA1', 'RUTA_INCORRECTA2'] }
 */
function getKnownIncorrectRoutes(): Record<string, string[]> {
  return {
    // Ryanair FR2541 NO es Barcelona-Madrid, es Málaga-Memmingen
    'FR2541': ['BCN-MAD', 'MAD-BCN', 'BCN-FRA', 'MAD-FRA'],
    'FR2542': ['BCN-MAD', 'MAD-BCN', 'BCN-FRA', 'MAD-FRA'],
    
    // Puedes añadir más vuelos con rutas incorrectas conocidas aquí
  };
}

/**
 * Valida una lista de vuelos y filtra los inválidos
 */
export function filterValidFlights(
  flights: Flight[],
  originIATA: string,
  destinationIATA: string,
  distanceKm: number
): { validFlights: Flight[]; invalidFlights: Array<{ flight: Flight; reason: string }> } {
  const validFlights: Flight[] = [];
  const invalidFlights: Array<{ flight: Flight; reason: string }> = [];

  for (const flight of flights) {
    const validation = validateFlight(flight, originIATA, destinationIATA);
    const durationValidation = validateFlightDuration(
      flight.departureTime,
      flight.arrivalTime,
      distanceKm
    );

    if (!validation.isValid) {
      invalidFlights.push({
        flight,
        reason: validation.errors.join(', ')
      });
      console.warn(`❌ Vuelo inválido ${flight.flightNumber}: ${validation.errors.join(', ')}`);
      continue;
    }

    if (!durationValidation.isValid) {
      invalidFlights.push({
        flight,
        reason: durationValidation.errors.join(', ')
      });
      console.warn(`❌ Duración inválida ${flight.flightNumber}: ${durationValidation.errors.join(', ')}`);
      continue;
    }

    // Mostrar warnings si existen
    if (validation.warnings.length > 0) {
      console.warn(`⚠️ ${flight.flightNumber}: ${validation.warnings.join(', ')}`);
    }

    if (durationValidation.warnings.length > 0) {
      console.warn(`⚠️ ${flight.flightNumber}: ${durationValidation.warnings.join(', ')}`);
    }

    validFlights.push(flight);
  }

  return { validFlights, invalidFlights };
}

