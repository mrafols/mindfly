'use client';

import { TurbulenceForecastPoint } from '@/lib/noaa-weather';

interface RouteProgressBarProps {
  turbulenceData: TurbulenceForecastPoint[];
  originCity: string;
  destCity: string;
  labels: {
    title: string;
    origin: string;
    destination: string;
    cruising: string;
  };
}

export default function RouteProgressBar({ 
  turbulenceData, 
  originCity, 
  destCity,
  labels 
}: RouteProgressBarProps) {
  // Función para obtener color según severidad
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'none': return 'bg-green-500';
      case 'light': return 'bg-blue-500';
      case 'moderate': return 'bg-yellow-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  // Crear segmentos para la barra de progreso
  const totalSegments = turbulenceData.length;
  const segmentWidth = 100 / totalSegments;

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
        {labels.title}
      </h3>

      {/* Barra de progreso visual */}
      <div className="relative mb-6">
        {/* Etiquetas de ciudades */}
        <div className="flex justify-between mb-2 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1">
            <span className="text-lg">🛫</span>
            {originCity}
          </span>
          <span className="text-slate-500">{labels.cruising}</span>
          <span className="flex items-center gap-1">
            {destCity}
            <span className="text-lg">🛬</span>
          </span>
        </div>

        {/* Barra de segmentos coloreados */}
        <div className="relative h-12 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
          {turbulenceData.map((point, index) => (
            <div
              key={index}
              className={`${getSeverityColor(point.severity)} transition-all duration-300 hover:opacity-80 cursor-pointer relative group`}
              style={{ width: `${segmentWidth}%` }}
              title={`${point.severity} - ${point.probability}%`}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-slate-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                  <p className="font-semibold">
                    {point.severity === 'none' ? '🟢 Suave' :
                     point.severity === 'light' ? '🔵 Ligera' :
                     point.severity === 'moderate' ? '🟡 Moderada' :
                     '🔴 Intensa'}
                  </p>
                  <p>{point.probability}% probabilidad</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-slate-900"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de posición */}
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Leyenda */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-700">Suave</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-700">Ligera</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-slate-700">Moderada</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-slate-700">Intensa</span>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 bg-slate-50 rounded-lg p-3 border border-slate-100">
        <p className="text-xs text-slate-600">
          <strong>💡 Pasa el cursor</strong> sobre cualquier segmento para ver detalles específicos de esa zona del vuelo.
        </p>
      </div>
    </div>
  );
}

