'use client';

import type { MetOfficeRouteAnalysis } from '@/lib/metoffice-api';

interface MetOfficeCardProps {
  metOfficeData: MetOfficeRouteAnalysis & { available: boolean };
  originCity: string;
  destCity: string;
}

export default function MetOfficeCard({ metOfficeData, originCity, destCity }: MetOfficeCardProps) {
  if (!metOfficeData || !metOfficeData.available) {
    return null; // No mostrar si no hay datos disponibles
  }

  const { summary, origin, destination } = metOfficeData;

  // Convertir mph a km/h
  const windSpeedKmh = (summary.maxWindSpeed * 1.60934).toFixed(0);

  // Determinar icono del clima
  const getWeatherIcon = (severity: string) => {
    switch (severity) {
      case 'none': return '☀️';
      case 'light': return '🌤️';
      case 'moderate': return '🌧️';
      case 'severe': return '⛈️';
      default: return '🌤️';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl border-2 border-blue-200 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            🇬🇧 Met Office UK
          </h3>
          <p className="text-sm text-slate-600">
            Servicio Meteorológico Oficial del Reino Unido
          </p>
        </div>
        <div className="text-4xl">
          {getWeatherIcon(summary.worstWeather?.severity || 'none')}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Temperatura */}
        <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌡️</span>
            <span className="text-xs font-semibold text-slate-600 uppercase">Temperatura</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {summary.avgTemperature.toFixed(1)}°C
          </p>
          <p className="text-xs text-slate-500 mt-1">Promedio en ruta</p>
        </div>

        {/* Viento */}
        <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💨</span>
            <span className="text-xs font-semibold text-slate-600 uppercase">Viento</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {windSpeedKmh} km/h
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {summary.maxWindSpeed} mph máximo
          </p>
        </div>

        {/* Precipitación */}
        <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌧️</span>
            <span className="text-xs font-semibold text-slate-600 uppercase">Precipitación</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {summary.maxPrecipitationProb}%
          </p>
          <p className="text-xs text-slate-500 mt-1">Probabilidad máxima</p>
        </div>
      </div>

      {/* Detalles por ubicación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Origen */}
        {origin?.currentWeather && (
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🛫</span>
              {originCity}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Temperatura:</span>
                <span className="font-semibold text-slate-900">
                  {origin.currentWeather.temperature}°C
                  <span className="text-slate-500 ml-1">
                    (sensación {origin.currentWeather.feelsLike}°C)
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Humedad:</span>
                <span className="font-semibold text-slate-900">
                  {origin.currentWeather.humidity}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Viento:</span>
                <span className="font-semibold text-slate-900">
                  {origin.currentWeather.windSpeed} mph {origin.currentWeather.windDirection}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Clima:</span>
                <span className="font-semibold text-slate-900">
                  {origin.currentWeather.weatherType.description}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Destino */}
        {destination?.currentWeather && (
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-200">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🛬</span>
              {destCity}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Temperatura:</span>
                <span className="font-semibold text-slate-900">
                  {destination.currentWeather.temperature}°C
                  <span className="text-slate-500 ml-1">
                    (sensación {destination.currentWeather.feelsLike}°C)
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Humedad:</span>
                <span className="font-semibold text-slate-900">
                  {destination.currentWeather.humidity}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Viento:</span>
                <span className="font-semibold text-slate-900">
                  {destination.currentWeather.windSpeed} mph {destination.currentWeather.windDirection}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Clima:</span>
                <span className="font-semibold text-slate-900">
                  {destination.currentWeather.weatherType.description}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-slate-500 text-center">
          Datos proporcionados por el Met Office DataPoint API
          <br />
          Actualización horaria • ~5000 ubicaciones en Reino Unido
        </p>
      </div>
    </div>
  );
}

