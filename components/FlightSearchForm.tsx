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
    
    const originCode = origin.match(/\(([A-Z]{3})\)/)?.[1] || origin;
    const destCode = destination.match(/\(([A-Z]{3})\)/)?.[1] || destination;
    
    router.push(`/${locale}/forecast?origin=${originCode}&destination=${destCode}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
          {error}
        </div>
      )}
      
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
