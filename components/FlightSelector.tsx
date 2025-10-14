'use client';

import { useState, useEffect } from 'react';
import { Flight, FlightForecast, getFlightForecast } from '@/lib/flights';
import FlightCard from './FlightCard';
import TurbulenceIndicator from './TurbulenceIndicator';
import AircraftInfo from './AircraftInfo';
import TurbulenceChart from './TurbulenceChart';
import RouteProgressBar from './RouteProgressBar';

interface FlightSelectorProps {
  flights: Flight[];
  originLat: number;
  originLon: number;
  destLat: number;
  destLon: number;
  originCity: string;
  destCity: string;
  labels: {
    title: string;
    noFlights: string;
    loading: string;
    flightLabels: {
      departure: string;
      arrival: string;
      duration: string;
      status: string;
      selectFlight: string;
    };
    turbulenceLabels: {
      title: string;
      severity: string;
      probability: string;
      altitude: string;
    };
    aircraftLabels: {
      title: string;
      manufacturer: string;
      category: string;
      cruiseAltitude: string;
      cruiseSpeed: string;
      dimensions: string;
      turbulenceRating: string;
    };
    chartLabels: {
      title: string;
      xAxisLabel: string;
      yAxisLabel: string;
      probability: string;
      severity: string;
      smooth: string;
      moderate: string;
      turbulent: string;
    };
    progressBarLabels: {
      title: string;
      origin: string;
      destination: string;
      cruising: string;
    };
  };
}

export default function FlightSelector({
  flights,
  originLat,
  originLon,
  destLat,
  destLon,
  originCity,
  destCity,
  labels
}: FlightSelectorProps) {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [forecast, setForecast] = useState<FlightForecast | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFlight) {
      setLoading(true);
      getFlightForecast(selectedFlight, originLat, originLon, destLat, destLon)
        .then(setForecast)
        .finally(() => setLoading(false));
    } else {
      setForecast(null);
    }
  }, [selectedFlight, originLat, originLon, destLat, destLon]);

  if (flights.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-lg text-center">
        <p className="text-slate-600">{labels.noFlights}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Lista de vuelos */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          {labels.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {flights.map((flight) => (
            <FlightCard
              key={flight.flightNumber}
              flight={flight}
              isSelected={selectedFlight?.flightNumber === flight.flightNumber}
              onSelect={() => setSelectedFlight(flight)}
              labels={labels.flightLabels}
            />
          ))}
        </div>
      </div>

      {/* Pronóstico del vuelo seleccionado */}
      {loading && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 border border-white/40 shadow-lg text-center">
          <div className="animate-pulse">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-slate-600">{labels.loading}</p>
          </div>
        </div>
      )}

      {forecast && !loading && (
        <div className="space-y-6 animate-fadeInUp">
          {/* Información de la aeronave */}
          <AircraftInfo
            aircraftCode={forecast.flight.aircraft}
            labels={labels.aircraftLabels}
          />

          {/* Barra de progreso visual de la ruta */}
          {forecast.turbulencePoints && forecast.turbulencePoints.length > 0 && (
            <RouteProgressBar
              turbulenceData={forecast.turbulencePoints}
              originCity={originCity}
              destCity={destCity}
              labels={labels.progressBarLabels}
            />
          )}

          {/* Gráficos de turbulencia */}
          {forecast.turbulencePoints && forecast.turbulencePoints.length > 0 && (
            <TurbulenceChart
              turbulenceData={forecast.turbulencePoints}
              flightDuration={`${Math.floor((new Date(forecast.flight.arrivalTime).getTime() - new Date(forecast.flight.departureTime).getTime()) / (1000 * 60 * 60))}h ${Math.floor(((new Date(forecast.flight.arrivalTime).getTime() - new Date(forecast.flight.departureTime).getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m`}
              labels={labels.chartLabels}
            />
          )}

          {/* Indicador de turbulencia */}
          <TurbulenceIndicator
            turbulence={forecast.turbulence}
            labels={labels.turbulenceLabels}
          />

          {/* Recomendación */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
              📋 Recomendación
            </h3>
            <p className="text-lg text-slate-700 text-center font-medium">
              {forecast.recommendation}
            </p>
          </div>

          {/* Alertas meteorológicas */}
          {forecast.weatherAlerts.length > 0 && (
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 shadow-lg">
              <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <span>⚠️</span>
                Avisos Meteorológicos
              </h3>
              <ul className="space-y-2">
                {forecast.weatherAlerts.map((alert, index) => (
                  <li key={index} className="text-yellow-800 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
              📊 Detalles del Vuelo
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-600 mb-1">Vuelo</p>
                <p className="text-lg font-bold text-slate-900">
                  {forecast.flight.airline} {forecast.flight.flightNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Aeronave</p>
                <p className="text-lg font-bold text-slate-900">{forecast.flight.aircraft}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Estado</p>
                <p className="text-lg font-bold text-slate-900">
                  {forecast.flight.status === 'scheduled' ? 'Programado' : 
                   forecast.flight.status === 'active' ? 'En vuelo' : 
                   forecast.flight.status === 'landed' ? 'Aterrizado' : 'Cancelado'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

