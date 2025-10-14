'use client';

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TurbulenceForecastPoint } from '@/lib/noaa-weather';

interface TurbulenceChartProps {
  turbulenceData: TurbulenceForecastPoint[];
  flightDuration: string; // e.g., "2h 30m"
  labels: {
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    probability: string;
    severity: string;
    smooth: string;
    moderate: string;
    turbulent: string;
  };
}

export default function TurbulenceChart({ turbulenceData, flightDuration, labels }: TurbulenceChartProps) {
  // Convertir duración a minutos
  const parseFlightDuration = (duration: string): number => {
    const hoursMatch = duration.match(/(\d+)h/);
    const minutesMatch = duration.match(/(\d+)m/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
    return hours * 60 + minutes;
  };

  const totalMinutes = parseFlightDuration(flightDuration);

  // Convertir datos de turbulencia a formato para gráfico
  const chartData = turbulenceData.map((point, index) => {
    const progress = (index / (turbulenceData.length - 1)) * 100;
    const timeInMinutes = Math.round((index / (turbulenceData.length - 1)) * totalMinutes);
    const hours = Math.floor(timeInMinutes / 60);
    const mins = timeInMinutes % 60;
    const timeLabel = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    // Convertir severidad a valor numérico
    const severityValue = 
      point.severity === 'none' ? 0 :
      point.severity === 'light' ? 1 :
      point.severity === 'moderate' ? 2 :
      3; // severe

    return {
      name: timeLabel,
      progress: Math.round(progress),
      probability: point.probability,
      severity: severityValue,
      severityLabel: point.severity,
      timeInMinutes
    };
  });

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof chartData[0] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const severityText = 
        data.severityLabel === 'none' ? labels.smooth :
        data.severityLabel === 'light' ? '🔵 Ligera' :
        data.severityLabel === 'moderate' ? labels.moderate :
        labels.turbulent;

      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-4 shadow-xl">
          <p className="font-bold text-slate-900 mb-2">{data.name}</p>
          <p className="text-sm text-slate-700">
            <strong>{labels.probability}:</strong> {data.probability}%
          </p>
          <p className="text-sm text-slate-700">
            <strong>{labels.severity}:</strong> {severityText}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        {labels.title}
      </h3>

      {/* Gráfico de área de probabilidad */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-slate-700 mb-4 text-center">
          {labels.probability} (%)
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorProbability" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="progress" 
              label={{ value: labels.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="#64748b"
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              label={{ value: labels.yAxisLabel, angle: -90, position: 'insideLeft' }}
              stroke="#64748b"
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="probability" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fill="url(#colorProbability)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de línea de severidad */}
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-4 text-center">
          {labels.severity}
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="progress" 
              label={{ value: labels.xAxisLabel, position: 'insideBottom', offset: -5 }}
              stroke="#64748b"
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              stroke="#64748b"
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickFormatter={(value) => {
                const labels = ['Suave', 'Ligera', 'Moderada', 'Intensa'];
                return labels[value] || '';
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="severity" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda visual */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-green-900">{labels.smooth}</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs font-medium text-blue-900">Ligera</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs font-medium text-yellow-900">{labels.moderate}</span>
        </div>
        <div className="flex items-center gap-2 bg-red-50 rounded-lg p-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs font-medium text-red-900">{labels.turbulent}</span>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
        <p className="text-xs text-slate-700">
          <strong>💡 Cómo leer este gráfico:</strong> El gráfico muestra la probabilidad y severidad de turbulencias 
          a lo largo del vuelo. El eje horizontal representa el progreso del vuelo (0% = despegue, 100% = aterrizaje). 
          Las zonas más altas indican mayor probabilidad o severidad de turbulencias.
        </p>
      </div>
    </div>
  );
}

