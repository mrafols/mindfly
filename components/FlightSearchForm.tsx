'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import AirportAutocomplete from './AirportAutocomplete';

interface FlightSearchFormProps {
  labels: {
    flightNumber: string;
    flightNumberPlaceholder: string;
    flightNumberHelper: string;
    origin: string;
    originPlaceholder: string;
    destination: string;
    destinationPlaceholder: string;
    searchButton: string;
    orText: string;
  };
  errorMessage: string;
}

export default function FlightSearchForm({ labels, errorMessage }: FlightSearchFormProps) {
  const [flightNumber, setFlightNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const locale = useLocale();

  const handleFlightNumberChange = (value: string) => {
    // Convertir automáticamente a mayúsculas y limpiar
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setFlightNumber(cleaned);
    // Si se introduce un número de vuelo, limpiar origen/destino
    if (cleaned) {
      setOrigin('');
      setDestination('');
    }
  };

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    // Si se selecciona origen/destino, limpiar número de vuelo
    if (value) {
      setFlightNumber('');
    }
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    // Si se selecciona origen/destino, limpiar número de vuelo
    if (value) {
      setFlightNumber('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que tengamos número de vuelo O ambos aeropuertos
    const hasFlightNumber = flightNumber && flightNumber.length >= 3;
    const hasRoute = origin && destination;

    if (!hasFlightNumber && !hasRoute) {
      setError(errorMessage);
      return;
    }
    
    setError('');
    
    // Construir URL con parámetros
    const params = new URLSearchParams();
    if (hasFlightNumber) {
      params.set('flight', flightNumber);
    } else if (hasRoute) {
      params.set('origin', origin);
      params.set('destination', destination);
    }
    
    router.push(`/${locale}/forecast?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
          {error}
        </div>
      )}
      
      {/* Número de Vuelo - Opción 1 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <label className="block text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          ✈️ {labels.flightNumber}
        </label>
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => handleFlightNumberChange(e.target.value)}
          placeholder={labels.flightNumberPlaceholder}
          className="w-full px-5 py-4 bg-white border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-slate-900 placeholder-slate-400 font-bold text-lg"
          maxLength={10}
          autoFocus
          disabled={!!(origin || destination)}
        />
        <p className="text-xs text-blue-600 mt-2">
          💡 {labels.flightNumberHelper}
        </p>
      </div>

      {/* Separador "O" */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white/80 text-slate-500 font-medium">
            {labels.orText}
          </span>
        </div>
      </div>

      {/* Búsqueda por Ruta - Opción 2 */}
      <div className="grid md:grid-cols-2 gap-4">
        <AirportAutocomplete
          value={origin}
          onChange={handleOriginChange}
          placeholder={labels.originPlaceholder}
          label={`🛫 ${labels.origin}`}
          disabled={!!flightNumber}
        />

        <AirportAutocomplete
          value={destination}
          onChange={handleDestinationChange}
          placeholder={labels.destinationPlaceholder}
          label={`🛬 ${labels.destination}`}
          disabled={!!flightNumber}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
      >
        {labels.searchButton}
      </button>
    </form>
  );
}
