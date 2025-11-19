'use client';

import type { NWSAlert } from '@/lib/nws-api';

interface NWSWeatherCardProps {
  nwsData: {
    origin: {
      currentConditions: {
        properties: {
          temperature: { value: number | null };
          relativeHumidity: { value: number | null };
          windSpeed: { value: number | null };
          textDescription: string;
        };
      } | null;
    } | null;
    destination: {
      currentConditions: {
        properties: {
          temperature: { value: number | null };
          relativeHumidity: { value: number | null };
          windSpeed: { value: number | null };
          textDescription: string;
        };
      } | null;
    } | null;
    summary: {
      maxTemperature: number;
      minTemperature: number;
      maxWindSpeed: number;
      precipitationProbability: number;
      alertCount: number;
      worstAlert: NWSAlert | null;
    };
    coverage: boolean;
  };
  originCity: string;
  destCity: string;
}

export default function NWSWeatherCard({ nwsData, originCity, destCity }: NWSWeatherCardProps) {
  if (!nwsData || !nwsData.coverage) {
    return null; // No mostrar si no hay datos disponibles
  }

  const { summary, origin, destination } = nwsData;

  // Convertir km/h a mph
  const windSpeedMph = (summary.maxWindSpeed * 0.621371).toFixed(0);
  
  // Convertir km/h a nudos
  const windSpeedKnots = (summary.maxWindSpeed * 0.539957).toFixed(0);

  // Determinar icono del clima según alertas
  const getWeatherIcon = () => {
    if (summary.alertCount > 0) {
      if (summary.worstAlert?.properties?.severity === 'Extreme') return '🚨';
      if (summary.worstAlert?.properties?.severity === 'Severe') return '⚠️';
      return '⚡';
    }
    if (summary.precipitationProbability > 60) return '🌧️';
    if (summary.precipitationProbability > 30) return '🌤️';
    return '☀️';
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-3xl border-2 border-blue-300 p-6 shadow-2xl text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
            🇺🇸 National Weather Service
          </h3>
          <p className="text-sm text-blue-100">
            Servicio Meteorológico Nacional de EE.UU. (NOAA)
          </p>
        </div>
        <div className="text-5xl">
          {getWeatherIcon()}
        </div>
      </div>

      {/* Alertas (si hay) */}
      {summary.alertCount > 0 && summary.worstAlert && (
        <div className="bg-red-500 bg-opacity-20 backdrop-blur border-2 border-red-300 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                {summary.worstAlert.properties.event}
                <span className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
                  {summary.worstAlert.properties.severity}
                </span>
              </h4>
              <p className="text-sm text-blue-50 line-clamp-2">
                {summary.worstAlert.properties.headline}
              </p>
              {summary.alertCount > 1 && (
                <p className="text-xs text-blue-100 mt-2">
                  + {summary.alertCount - 1} alerta(s) adicional(es)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Temperatura */}
        <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 border border-white border-opacity-30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌡️</span>
            <span className="text-xs font-semibold text-blue-100 uppercase">Temperatura</span>
          </div>
          <p className="text-2xl font-bold">
            {summary.minTemperature.toFixed(0)}°C - {summary.maxTemperature.toFixed(0)}°C
          </p>
          <p className="text-xs text-blue-100 mt-1">Rango en ruta</p>
        </div>

        {/* Viento */}
        <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 border border-white border-opacity-30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💨</span>
            <span className="text-xs font-semibold text-blue-100 uppercase">Viento</span>
          </div>
          <p className="text-2xl font-bold">
            {summary.maxWindSpeed.toFixed(0)} km/h
          </p>
          <p className="text-xs text-blue-100 mt-1">
            {windSpeedMph} mph • {windSpeedKnots} kt
          </p>
        </div>

        {/* Precipitación */}
        <div className="bg-white bg-opacity-20 backdrop-blur rounded-xl p-4 border border-white border-opacity-30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌧️</span>
            <span className="text-xs font-semibold text-blue-100 uppercase">Precipitación</span>
          </div>
          <p className="text-2xl font-bold">
            {summary.precipitationProbability}%
          </p>
          <p className="text-xs text-blue-100 mt-1">Probabilidad máxima</p>
        </div>
      </div>

      {/* Detalles por ubicación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Origen */}
        {origin?.currentConditions && (
          <div className="bg-white bg-opacity-15 backdrop-blur rounded-xl p-4 border border-white border-opacity-20">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="text-lg">🛫</span>
              {originCity}
            </h4>
            <div className="space-y-2 text-sm">
              {origin.currentConditions.properties.temperature?.value !== null && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Temperatura:</span>
                  <span className="font-semibold">
                    {origin.currentConditions.properties.temperature.value?.toFixed(1)}°C
                  </span>
                </div>
              )}
              {origin.currentConditions.properties.relativeHumidity?.value !== null && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Humedad:</span>
                  <span className="font-semibold">
                    {origin.currentConditions.properties.relativeHumidity.value?.toFixed(0)}%
                  </span>
                </div>
              )}
              {origin.currentConditions.properties.windSpeed?.value !== null && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Viento:</span>
                  <span className="font-semibold">
                    {origin.currentConditions.properties.windSpeed.value?.toFixed(0)} km/h
                  </span>
                </div>
              )}
              {origin.currentConditions.properties.textDescription && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Condiciones:</span>
                  <span className="font-semibold">
                    {origin.currentConditions.properties.textDescription}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Destino */}
        {destination?.currentConditions && (
          <div className="bg-white bg-opacity-15 backdrop-blur rounded-xl p-4 border border-white border-opacity-20">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <span className="text-lg">🛬</span>
              {destCity}
            </h4>
            <div className="space-y-2 text-sm">
              {destination.currentConditions.properties.temperature?.value !== null && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Temperatura:</span>
                  <span className="font-semibold">
                    {destination.currentConditions.properties.temperature.value?.toFixed(1)}°C
                  </span>
                </div>
              )}
              {destination.currentConditions.properties.relativeHumidity?.value !== null && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Humedad:</span>
                  <span className="font-semibold">
                    {destination.currentConditions.properties.relativeHumidity.value?.toFixed(0)}%
                  </span>
                </div>
              )}
              {destination.currentConditions.properties.windSpeed?.value !== null && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Viento:</span>
                  <span className="font-semibold">
                    {destination.currentConditions.properties.windSpeed.value?.toFixed(0)} km/h
                  </span>
                </div>
              )}
              {destination.currentConditions.properties.textDescription && (
                <div className="flex justify-between">
                  <span className="text-blue-100">Condiciones:</span>
                  <span className="font-semibold">
                    {destination.currentConditions.properties.textDescription}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white border-opacity-20">
        <p className="text-xs text-blue-100 text-center">
          Datos proporcionados por el National Weather Service (NOAA)
          <br />
          100% GRATIS • No requiere API key • Cobertura: Estados Unidos
        </p>
      </div>
    </div>
  );
}

