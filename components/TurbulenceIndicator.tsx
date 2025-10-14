import { TurbulenceData } from '@/lib/flights';

interface TurbulenceIndicatorProps {
  turbulence: TurbulenceData;
  labels: {
    title: string;
    severity: string;
    probability: string;
    altitude: string;
  };
}

export default function TurbulenceIndicator({ turbulence, labels }: TurbulenceIndicatorProps) {
  const getSeverityColor = () => {
    switch (turbulence.severity) {
      case 'none': return 'from-green-500 to-emerald-600';
      case 'light': return 'from-blue-500 to-cyan-600';
      case 'moderate': return 'from-yellow-500 to-orange-600';
      case 'severe': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };
  
  const getSeverityText = () => {
    switch (turbulence.severity) {
      case 'none': return '🟢 Sin turbulencias';
      case 'light': return '🔵 Turbulencias ligeras';
      case 'moderate': return '🟡 Turbulencias moderadas';
      case 'severe': return '🔴 Turbulencias intensas';
      default: return 'Desconocido';
    }
  };
  
  const getSeverityDescription = () => {
    switch (turbulence.severity) {
      case 'none': 
        return 'Vuelo muy suave. Excelentes condiciones para volar.';
      case 'light': 
        return 'Pequeños movimientos del avión, completamente normales y seguros. Como conducir por una carretera con algunos baches pequeños.';
      case 'moderate': 
        return 'Movimientos más perceptibles, pero totalmente seguros. Los pilotos están entrenados para estas condiciones. El avión está diseñado para soportar mucho más.';
      case 'severe': 
        return 'Movimientos intensos, pero el avión y pilotos están completamente preparados. Es incómodo pero no peligroso. Los aviones están diseñados con márgenes de seguridad enormes.';
      default: 
        return turbulence.description;
    }
  };
  
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        {labels.title}
      </h3>
      
      {/* Indicador visual principal */}
      <div className="mb-8">
        <div className={`w-full h-32 bg-gradient-to-r ${getSeverityColor()} rounded-2xl flex items-center justify-center shadow-lg`}>
          <div className="text-center">
            <p className="text-white text-3xl font-bold mb-2">{getSeverityText()}</p>
            <p className="text-white/90 text-lg">{labels.probability}: {turbulence.probability}%</p>
          </div>
        </div>
      </div>
      
      {/* Detalles */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">{labels.severity}</p>
          <p className="text-lg font-bold text-slate-900">{getSeverityText()}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-sm text-slate-600 mb-1">{labels.altitude}</p>
          <p className="text-lg font-bold text-slate-900">{turbulence.altitude.toLocaleString()} ft</p>
          <p className="text-xs text-slate-500">≈ {Math.round(turbulence.altitude * 0.3048 / 1000)} km</p>
        </div>
      </div>
      
      {/* Barra de probabilidad */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>{labels.probability}</span>
          <span className="font-bold">{turbulence.probability}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getSeverityColor()} transition-all duration-1000`}
            style={{ width: `${turbulence.probability}%` }}
          ></div>
        </div>
      </div>
      
      {/* Descripción */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <p className="text-slate-700 leading-relaxed">
          <strong className="text-slate-900">💡 ¿Qué significa esto?</strong>
          <br />
          {getSeverityDescription()}
        </p>
      </div>
      
      {/* Recordatorio de seguridad */}
      <div className="mt-6 bg-green-50 rounded-xl p-6 border border-green-200">
        <p className="text-green-900 font-semibold text-center">
          ✈️ Los aviones están diseñados para soportar turbulencias 5x más fuertes que las más severas jamás registradas
        </p>
      </div>
    </div>
  );
}

