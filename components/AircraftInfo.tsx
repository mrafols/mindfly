import { getAircraftInfo } from '@/lib/aircraft-data';

interface AircraftInfoProps {
  aircraftCode: string;
  labels: {
    title: string;
    manufacturer: string;
    category: string;
    cruiseAltitude: string;
    cruiseSpeed: string;
    dimensions: string;
    turbulenceRating: string;
  };
}

export default function AircraftInfo({ aircraftCode, labels }: AircraftInfoProps) {
  const aircraft = getAircraftInfo(aircraftCode);
  
  if (!aircraft) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
        <p className="text-slate-600 text-center">ℹ️ Información de aeronave no disponible</p>
      </div>
    );
  }
  
  const getCategoryText = (category: string) => {
    switch (category) {
      case 'narrow-body': return 'Fuselaje estrecho (pasillo único)';
      case 'wide-body': return 'Fuselaje ancho (doble pasillo)';
      case 'regional': return 'Regional';
      default: return category;
    }
  };
  
  const getTurbulenceRatingText = (rating: string) => {
    switch (rating) {
      case 'standard': return '⭐⭐⭐ Estándar';
      case 'enhanced': return '⭐⭐⭐⭐ Mejorado';
      case 'heavy': return '⭐⭐⭐⭐⭐ Excelente';
      default: return rating;
    }
  };
  
  const getTurbulenceRatingColor = (rating: string) => {
    switch (rating) {
      case 'standard': return 'from-blue-500 to-cyan-600';
      case 'enhanced': return 'from-green-500 to-emerald-600';
      case 'heavy': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };
  
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🛩️</span>
        {labels.title}
      </h3>
      
      <div className="space-y-4">
        {/* Nombre y fabricante */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <h4 className="text-2xl font-bold text-slate-900 mb-1">{aircraft.name}</h4>
          <p className="text-slate-600">{labels.manufacturer}: <strong>{aircraft.manufacturer}</strong></p>
          <p className="text-sm text-slate-500 mt-2">{aircraft.description}</p>
        </div>
        
        {/* Manejo de turbulencias */}
        <div className={`bg-gradient-to-r ${getTurbulenceRatingColor(aircraft.maxTurbulenceRating)} rounded-xl p-4 text-white`}>
          <p className="text-sm opacity-90 mb-1">{labels.turbulenceRating}</p>
          <p className="text-xl font-bold">{getTurbulenceRatingText(aircraft.maxTurbulenceRating)}</p>
          <p className="text-xs opacity-80 mt-2">
            {aircraft.maxTurbulenceRating === 'heavy' 
              ? 'Excelente estabilidad gracias a su peso y diseño robusto'
              : aircraft.maxTurbulenceRating === 'enhanced'
              ? 'Sistemas avanzados de control de vuelo para mayor comodidad'
              : 'Diseño confiable y probado en millones de vuelos'
            }
          </p>
        </div>
        
        {/* Especificaciones técnicas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">{labels.category}</p>
            <p className="text-sm font-semibold text-slate-900">{getCategoryText(aircraft.category)}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">{labels.cruiseAltitude}</p>
            <p className="text-sm font-semibold text-slate-900">
              {aircraft.typicalCruiseAltitude.toLocaleString()} ft
            </p>
            <p className="text-xs text-slate-500">≈ {Math.round(aircraft.typicalCruiseAltitude * 0.3048 / 1000)} km</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">{labels.cruiseSpeed}</p>
            <p className="text-sm font-semibold text-slate-900">
              {aircraft.cruiseSpeed} kt
            </p>
            <p className="text-xs text-slate-500">≈ {Math.round(aircraft.cruiseSpeed * 1.852)} km/h</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">{labels.dimensions}</p>
            <p className="text-sm font-semibold text-slate-900">
              {aircraft.length}m × {aircraft.wingSpan}m
            </p>
            <p className="text-xs text-slate-500">Longitud × Envergadura</p>
          </div>
        </div>
        
        {/* Info adicional */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <p className="text-xs text-slate-700">
            <strong>💡 Dato interesante:</strong> {aircraft.category === 'wide-body' 
              ? 'Los aviones de fuselaje ancho tienen mejor estabilidad en turbulencias debido a su mayor masa y área de alas.'
              : 'Este modelo ha sido probado extensivamente y cumple con los más altos estándares de seguridad internacional.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

