'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { searchAirports, Airport } from '@/lib/airports';

interface FlightSearchFormProps {
  labels: {
    origin: string;
    originPlaceholder: string;
    destination: string;
    destinationPlaceholder: string;
    flightNumber: string;
    flightNumberPlaceholder: string;
    flightNumberHelper: string;
    searchButton: string;
  };
  errorMessage: string;
}

export default function FlightSearchForm({ labels, errorMessage }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Airport[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const locale = useLocale();

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    if (value.length >= 2) {
      const results = searchAirports(value);
      setOriginSuggestions(results);
      setShowOriginSuggestions(true);
    } else {
      setShowOriginSuggestions(false);
    }
  };

  const handleDestChange = (value: string) => {
    setDestination(value);
    if (value.length >= 2) {
      const results = searchAirports(value);
      setDestSuggestions(results);
      setShowDestSuggestions(true);
    } else {
      setShowDestSuggestions(false);
    }
  };

  const handleFlightNumberChange = (value: string) => {
    // Convertir automáticamente a mayúsculas y limpiar
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setFlightNumber(cleaned);
  };

  const selectOrigin = (airport: Airport) => {
    setOrigin(`${airport.city} (${airport.code})`);
    setShowOriginSuggestions(false);
  };

  const selectDestination = (airport: Airport) => {
    setDestination(`${airport.city} (${airport.code})`);
    setShowDestSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que al menos tengamos número de vuelo O origen+destino
    if (!flightNumber && (!origin || !destination)) {
      setError(errorMessage);
      return;
    }
    
    setError('');
    
    const originCode = origin.match(/\(([A-Z]{3})\)/)?.[1] || origin;
    const destCode = destination.match(/\(([A-Z]{3})\)/)?.[1] || destination;
    
    // Construir URL con parámetros
    const params = new URLSearchParams();
    if (originCode) params.set('origin', originCode);
    if (destCode) params.set('destination', destCode);
    if (flightNumber) params.set('flight', flightNumber);
    
    router.push(`/${locale}/forecast?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
          {error}
        </div>
      )}
      
      {/* Número de Vuelo - Campo destacado */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <label className="block text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
          ✈️ {labels.flightNumber}
          <span className="text-xs font-normal text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            Recomendado
          </span>
        </label>
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => handleFlightNumberChange(e.target.value)}
          placeholder={labels.flightNumberPlaceholder}
          className="w-full px-5 py-4 bg-white border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-slate-900 placeholder-slate-400 font-bold text-lg"
          maxLength={10}
        />
        <p className="text-xs text-blue-600 mt-2">
          💡 {labels.flightNumberHelper}
        </p>
      </div>

      {/* Separador */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-xs text-slate-500 font-semibold">O BUSCAR POR RUTA</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>
      
      <div className="relative">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {labels.origin}
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => handleOriginChange(e.target.value)}
          placeholder={labels.originPlaceholder}
          className="w-full px-5 py-4 bg-white/50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-slate-900 placeholder-slate-400"
        />
        {showOriginSuggestions && originSuggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
            {originSuggestions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => selectOrigin(airport)}
                className="w-full text-left px-5 py-4 hover:bg-blue-50 transition first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="font-semibold text-slate-900">{airport.city} ({airport.code})</div>
                <div className="text-sm text-slate-500">{airport.name}, {airport.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {labels.destination}
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => handleDestChange(e.target.value)}
          placeholder={labels.destinationPlaceholder}
          className="w-full px-5 py-4 bg-white/50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-slate-900 placeholder-slate-400"
        />
        {showDestSuggestions && destSuggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
            {destSuggestions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => selectDestination(airport)}
                className="w-full text-left px-5 py-4 hover:bg-blue-50 transition first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="font-semibold text-slate-900">{airport.city} ({airport.code})</div>
                <div className="text-sm text-slate-500">{airport.name}, {airport.country}</div>
              </button>
            ))}
          </div>
        )}
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
