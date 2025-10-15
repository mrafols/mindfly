'use client';

interface TurbulenceSummaryCardProps {
  overallRating: string;
  emoji: string;
  smoothPercentage: number;
  turbulentPercentage: number;
  recommendation: string;
  maxSeverity: string;
}

export default function TurbulenceSummaryCard({
  overallRating,
  emoji,
  smoothPercentage,
  turbulentPercentage,
  recommendation,
  maxSeverity
}: TurbulenceSummaryCardProps) {
  
  // Color del rating
  const getRatingColor = () => {
    if (smoothPercentage >= 90) return 'from-green-500 to-emerald-600';
    if (smoothPercentage >= 70) return 'from-yellow-400 to-orange-400';
    if (smoothPercentage >= 50) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-red-700';
  };

  const getRatingBg = () => {
    if (smoothPercentage >= 90) return 'bg-green-50';
    if (smoothPercentage >= 70) return 'bg-yellow-50';
    if (smoothPercentage >= 50) return 'bg-orange-50';
    return 'bg-red-50';
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'none': return 'Ninguna';
      case 'light': return 'Ligera';
      case 'moderate': return 'Moderada';
      case 'severe': return 'Severa';
      default: return severity;
    }
  };

  return (
    <div className={`${getRatingBg()} backdrop-blur-xl rounded-3xl border-2 border-white/60 p-8 shadow-2xl`}>
      {/* Rating principal estilo Turbli */}
      <div className="text-center mb-8">
        <div className={`inline-block bg-gradient-to-r ${getRatingColor()} rounded-3xl px-12 py-6 shadow-xl`}>
          <div className="text-6xl mb-2">{emoji}</div>
          <h2 className="text-4xl font-black text-white mb-2">{overallRating}</h2>
          <p className="text-white/90 text-sm font-medium">Condiciones del Vuelo</p>
        </div>
      </div>

      {/* Estadísticas estilo Turbli */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/60 rounded-2xl p-6 text-center border border-white/40 shadow-lg">
          <div className="text-4xl font-black text-green-600 mb-2">
            {smoothPercentage}%
          </div>
          <div className="text-sm text-slate-600 font-medium">
            Ruta Suave
          </div>
          <div className="text-xs text-slate-500 mt-1">
            🟢 Sin turbulencias significativas
          </div>
        </div>
        
        <div className="bg-white/60 rounded-2xl p-6 text-center border border-white/40 shadow-lg">
          <div className="text-4xl font-black text-orange-600 mb-2">
            {turbulentPercentage}%
          </div>
          <div className="text-sm text-slate-600 font-medium">
            Con Turbulencias
          </div>
          <div className="text-xs text-slate-500 mt-1">
            🟡 Ligeras a moderadas
          </div>
        </div>
      </div>

      {/* Severidad máxima */}
      <div className="bg-white/60 rounded-2xl p-4 mb-6 border border-white/40 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Severidad Máxima Esperada:
          </span>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            maxSeverity === 'none' ? 'bg-green-100 text-green-700' :
            maxSeverity === 'light' ? 'bg-yellow-100 text-yellow-700' :
            maxSeverity === 'moderate' ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {getSeverityText(maxSeverity)}
          </span>
        </div>
      </div>

      {/* Recomendación */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Recomendación
        </h3>
        <p className="text-slate-700 leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Info adicional */}
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">
          Pronóstico basado en datos GFS de NOAA • Actualizado en tiempo real
        </p>
      </div>
    </div>
  );
}

