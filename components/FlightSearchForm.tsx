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
    searchButton: string;
  };
  errorMessage: string;
}

export default function FlightSearchForm({ labels, errorMessage }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
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
    if (!origin || !destination) {
      setError(errorMessage);
      return;
    }
    setError('');
    
    // Extraer código de aeropuerto
    const originCode = origin.match(/\(([A-Z]{3})\)/)?.[1] || origin;
    const destCode = destination.match(/\(([A-Z]{3})\)/)?.[1] || destination;
    
    router.push(`/${locale}/forecast?origin=${originCode}&destination=${destCode}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.origin}
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => handleOriginChange(e.target.value)}
          placeholder={labels.originPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {showOriginSuggestions && originSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {originSuggestions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => selectOrigin(airport)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
              >
                <div className="font-semibold">{airport.city} ({airport.code})</div>
                <div className="text-sm text-gray-600">{airport.name}, {airport.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.destination}
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => handleDestChange(e.target.value)}
          placeholder={labels.destinationPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {showDestSuggestions && destSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {destSuggestions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => selectDestination(airport)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
              >
                <div className="font-semibold">{airport.city} ({airport.code})</div>
                <div className="text-sm text-gray-600">{airport.name}, {airport.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        {labels.searchButton}
      </button>
    </form>
  );
}

