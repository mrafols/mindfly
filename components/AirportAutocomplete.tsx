'use client';

import { useState, useEffect, useRef } from 'react';

interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
}

export default function AirportAutocomplete({
  onChange,
  placeholder,
  label,
  disabled = false
}: AirportAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Buscar aeropuertos con debounce
  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // Usar API de aeropuertos de aviation-edge o alternativa
        // Por ahora, usaremos nuestra propia base de datos filtrada
        const response = await fetch(`/api/airports/search?q=${encodeURIComponent(query)}`);
        
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.airports || []);
        } else {
          // Fallback: buscar en la base de datos local del cliente
          const { searchAirports } = await import('@/lib/airports');
          const results = searchAirports(query, 10);
          setSuggestions(results.map(a => ({
            iata: a.code,
            name: a.name,
            city: a.city,
            country: a.country
          })));
        }
      } catch (error) {
        console.error('Error buscando aeropuertos:', error);
        // Fallback local
        try {
          const { searchAirports } = await import('@/lib/airports');
          const results = searchAirports(query, 10);
          setSuggestions(results.map(a => ({
            iata: a.code,
            name: a.name,
            city: a.city,
            country: a.country
          })));
        } catch {
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (airport: Airport) => {
    onChange(airport.iata);
    setQuery(`${airport.city} (${airport.iata})`);
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setIsOpen(true);
    
    // Si se borra, limpiar la selección
    if (!newValue) {
      onChange('');
    }
  };

  const handleFocus = () => {
    if (query && query.length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition text-slate-900 placeholder-slate-400
            ${disabled 
              ? 'border-slate-200 bg-slate-50 cursor-not-allowed' 
              : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
        />
        
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Dropdown de sugerencias */}
      {isOpen && suggestions.length > 0 && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {suggestions.map((airport) => (
            <button
              key={airport.iata}
              type="button"
              onClick={() => handleSelect(airport)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">
                    {airport.city}
                    <span className="ml-2 text-blue-600 font-bold">({airport.iata})</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {airport.name} • {airport.country}
                  </div>
                </div>
                <div className="text-2xl">✈️</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-slate-200 rounded-xl shadow-xl p-4">
          <p className="text-sm text-slate-500 text-center">
            No se encontraron aeropuertos para &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

