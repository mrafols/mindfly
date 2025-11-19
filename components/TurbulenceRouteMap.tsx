'use client';

import { TurbulenceSegment } from '@/lib/gfs-turbulence';

interface TurbulenceRouteMapProps {
  segments: TurbulenceSegment[];
  originCity: string;
  destCity: string;
  labels: {
    title: string;
    origin: string;
    destination: string;
    smooth: string;
    light: string;
    moderate: string;
    severe: string;
  };
}

export default function TurbulenceRouteMap({ 
  segments, 
  originCity, 
  destCity,
  labels 
}: TurbulenceRouteMapProps) {
  if (segments.length === 0) {
    return null;
  }

  // Calcular porcentajes de distancia para cada segmento
  const totalDistance = segments.reduce((sum, s) => sum + s.distance, 0);
  const segmentsWithPercentage = segments.map(segment => ({
    ...segment,
    percentage: (segment.distance / totalDistance) * 100
  }));

  // Función para obtener color según severidad
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'none': return 'bg-green-500';
      case 'light': return 'bg-yellow-400';
      case 'moderate': return 'bg-orange-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getSeverityBorderColor = (severity: string) => {
    switch (severity) {
      case 'none': return 'border-green-500';
      case 'light': return 'border-yellow-400';
      case 'moderate': return 'border-orange-500';
      case 'severe': return 'border-red-500';
      default: return 'border-gray-400';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'none': return 'text-green-700';
      case 'light': return 'text-yellow-700';
      case 'moderate': return 'text-orange-700';
      case 'severe': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'none': return 'bg-green-50';
      case 'light': return 'bg-yellow-50';
      case 'moderate': return 'bg-orange-50';
      case 'severe': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'none': return labels.smooth;
      case 'light': return labels.light;
      case 'moderate': return labels.moderate;
      case 'severe': return labels.severe;
      default: return severity;
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-3xl">🗺️</span>
        {labels.title}
      </h3>

      {/* Barra de ruta visual estilo Turbli */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-500 rounded-full p-2 shadow-lg">
            <span className="text-white text-xs font-bold">🛫</span>
          </div>
          <span className="text-sm font-semibold text-slate-700">{originCity}</span>
        </div>

        {/* Barra de progreso segmentada */}
        <div className="relative">
          <div className="flex h-12 rounded-xl overflow-hidden shadow-lg border-2 border-slate-200">
            {segmentsWithPercentage.map((segment, index) => (
              <div
                key={index}
                className={`${getSeverityColor(segment.severity)} relative group cursor-pointer transition-all hover:brightness-110`}
                style={{ width: `${segment.percentage}%` }}
              >
                {/* Tooltip al hacer hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl whitespace-nowrap">
                    <p className="font-bold mb-1">Segmento {index + 1}</p>
                    <p>{Math.round(segment.distance)} km</p>
                    <p className="capitalize">{getSeverityLabel(segment.severity)}</p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="border-8 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-sm font-semibold text-slate-700">{destCity}</span>
          <div className="bg-purple-500 rounded-full p-2 shadow-lg">
            <span className="text-white text-xs font-bold">🛬</span>
          </div>
        </div>
      </div>

      {/* Detalles de segmentos */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
          Detalles por Tramo
        </h4>
        {segmentsWithPercentage.map((segment, index) => (
          <div
            key={index}
            className={`${getSeverityBgColor(segment.severity)} rounded-xl p-4 border-l-4 ${getSeverityBorderColor(segment.severity)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900">
                Tramo {index + 1} de {segments.length}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getSeverityColor(segment.severity)} text-white`}>
                {getSeverityLabel(segment.severity).toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <p>📏 Distancia: <strong>{Math.round(segment.distance)} km</strong> ({Math.round(segment.percentage)}% del vuelo)</p>
              <p className={getSeverityTextColor(segment.severity)}>
                {segment.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wide">
          Leyenda
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-xs text-slate-700">{labels.smooth}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span className="text-xs text-slate-700">{labels.light}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-xs text-slate-700">{labels.moderate}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs text-slate-700">{labels.severe}</span>
          </div>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <p className="text-xs text-slate-700">
          <strong>💡 Cómo interpretar:</strong> Esta visualización divide tu ruta en tramos y muestra 
          las condiciones de turbulencia esperadas en cada uno. Los colores indican la severidad: 
          verde = suave, amarillo = ligera, naranja = moderada, rojo = severa.
        </p>
      </div>
    </div>
  );
}

