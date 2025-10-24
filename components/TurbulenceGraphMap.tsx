'use client';

import { TurbulenceSegment } from '@/lib/gfs-turbulence';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TurbulenceGraphMapProps {
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
    distance: string;
    severity: string;
  };
}

export default function TurbulenceGraphMap({ 
  segments, 
  originCity, 
  destCity,
  labels 
}: TurbulenceGraphMapProps) {
  if (segments.length === 0) {
    return null;
  }

  // Calcular distancias acumuladas para el eje X
  let cumulativeDistance = 0;
  const chartData = segments.map((segment, index) => {
    const startDistance = cumulativeDistance;
    cumulativeDistance += segment.distance;
    
    // Convertir severidad a valor numérico para el gráfico
    const severityValue = getSeverityValue(segment.severity);
    
    return {
      name: `T${index + 1}`,
      distance: Math.round(startDistance),
      distanceEnd: Math.round(cumulativeDistance),
      severity: severityValue,
      severityLabel: getSeverityLabel(segment.severity, labels),
      description: segment.description,
      originalSeverity: segment.severity
    };
  });

  // Añadir punto final
  chartData.push({
    name: destCity,
    distance: Math.round(cumulativeDistance),
    distanceEnd: Math.round(cumulativeDistance),
    severity: chartData[chartData.length - 1]?.severity || 0,
    severityLabel: chartData[chartData.length - 1]?.severityLabel || '',
    description: '',
    originalSeverity: chartData[chartData.length - 1]?.originalSeverity || 'none'
  });

  const totalDistance = cumulativeDistance;

  // Función para obtener valor numérico de severidad
  function getSeverityValue(severity: string): number {
    switch (severity) {
      case 'none': return 0;
      case 'light': return 1;
      case 'moderate': return 2;
      case 'severe': return 3;
      default: return 0;
    }
  }

  function getSeverityLabel(severity: string, labels: TurbulenceGraphMapProps['labels']): string {
    switch (severity) {
      case 'none': return labels.smooth;
      case 'light': return labels.light;
      case 'moderate': return labels.moderate;
      case 'severe': return labels.severe;
      default: return severity;
    }
  }

  // Función para obtener color según severidad
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'none': return '#10b981'; // green-500
      case 'light': return '#fbbf24'; // yellow-400
      case 'moderate': return '#f97316'; // orange-500
      case 'severe': return '#ef4444'; // red-500
      default: return '#94a3b8'; // slate-400
    }
  };

  // Custom Tooltip
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ payload: typeof chartData[0] }>;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl">
          <p className="font-bold mb-1">{data.name}</p>
          <p className="mb-1">📏 {data.distance} km</p>
          <p className="capitalize font-semibold" style={{ color: getSeverityColor(data.originalSeverity) }}>
            {data.severityLabel}
          </p>
          {data.description && (
            <p className="mt-1 text-slate-300 text-[10px]">{data.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-3xl">📊</span>
        {labels.title}
      </h3>

      {/* Gráfico de Área */}
      <div className="mb-8">
        <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 rounded-full p-2 shadow-lg">
                <span className="text-white text-xs font-bold">🛫</span>
              </div>
              <span className="font-semibold text-slate-700">{originCity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{destCity}</span>
              <div className="bg-purple-500 rounded-full p-2 shadow-lg">
                <span className="text-white text-xs font-bold">🛬</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSeverity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} />
              <XAxis 
                dataKey="distance" 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
                label={{ value: `${labels.distance} (km)`, position: 'insideBottom', offset: -5, fill: '#475569' }}
              />
              <YAxis 
                stroke="#64748b"
                domain={[0, 3]}
                ticks={[0, 1, 2, 3]}
                tickFormatter={(value) => {
                  const severityMap: { [key: number]: string } = {
                    0: labels.smooth,
                    1: labels.light,
                    2: labels.moderate,
                    3: labels.severe
                  };
                  return severityMap[value] || '';
                }}
                style={{ fontSize: '11px' }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Líneas de referencia para cada nivel */}
              <ReferenceLine y={0.5} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.3} />
              <ReferenceLine y={1.5} stroke="#fbbf24" strokeDasharray="3 3" strokeOpacity={0.3} />
              <ReferenceLine y={2.5} stroke="#f97316" strokeDasharray="3 3" strokeOpacity={0.3} />
              
              <Area 
                type="stepAfter" 
                dataKey="severity" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSeverity)"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-600">
              📏 <strong>{labels.distance} total:</strong> {Math.round(totalDistance)} km
            </p>
          </div>
        </div>
      </div>

      {/* Detalles de segmentos */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
          Detalles por Tramo
        </h4>
        {segments.map((segment, index) => {
          const percentage = (segment.distance / totalDistance) * 100;
          const severityColor = getSeverityColor(segment.severity);
          const severityLabel = getSeverityLabel(segment.severity, labels);
          
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border-l-4 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderLeftColor: severityColor }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900">
                  Tramo {index + 1} de {segments.length}
                </span>
                <span 
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: severityColor }}
                >
                  {severityLabel.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p>📏 <strong>Distancia:</strong> {Math.round(segment.distance)} km ({Math.round(percentage)}% del vuelo)</p>
                <p style={{ color: severityColor }}>
                  {segment.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wide">
          Leyenda de Severidad
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
          <strong>💡 Cómo interpretar:</strong> Este gráfico muestra la intensidad de turbulencia esperada 
          a lo largo de tu ruta. El eje horizontal representa la distancia recorrida y el eje vertical 
          muestra el nivel de turbulencia (más alto = más turbulencia).
        </p>
      </div>
    </div>
  );
}

