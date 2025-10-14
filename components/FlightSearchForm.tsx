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
        <div className="bg-red-500/20 border border-red-400/50 text-white px-5 py-4 rounded-xl backdrop-blur-sm">
          {error}
        </div>
      )}
      
      <div className="relative">
        <label className="block text-lg font-semibold text-white mb-3 drop-shadow-lg">
          {labels.origin}
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => handleOriginChange(e.target.value)}
          placeholder={labels.originPlaceholder}
          className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-4 focus:ring-white/50 focus:border-white transition-all shadow-lg text-gray-800 placeholder-gray-500 text-lg"
        />
        {showOriginSuggestions && originSuggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-2 glass backdrop-blur-xl rounded-xl shadow-2xl max-h-80 overflow-y-auto border border-white/30">
            {originSuggestions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => selectOrigin(airport)}
                className="w-full text-left px-5 py-4 hover:bg-white/20 transition-all first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="font-bold text-white text-lg">{airport.city} ({airport.code})</div>
                <div className="text-sm text-white/80">{airport.name}, {airport.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-lg font-semibold text-white mb-3 drop-shadow-lg">
          {labels.destination}
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => handleDestChange(e.target.value)}
          placeholder={labels.destinationPlaceholder}
          className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-4 focus:ring-white/50 focus:border-white transition-all shadow-lg text-gray-800 placeholder-gray-500 text-lg"
        />
        {showDestSuggestions && destSuggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-2 glass backdrop-blur-xl rounded-xl shadow-2xl max-h-80 overflow-y-auto border border-white/30">
            {destSuggestions.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => selectDestination(airport)}
                className="w-full text-left px-5 py-4 hover:bg-white/20 transition-all first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="font-bold text-white text-lg">{airport.city} ({airport.code})</div>
                <div className="text-sm text-white/80">{airport.name}, {airport.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 px-8 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
      >
        ✈️ {labels.searchButton}
      </button>
    </form>
  );
}

