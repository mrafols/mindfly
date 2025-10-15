import { Flight } from '@/lib/flights';

interface FlightCardProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: () => void;
  labels: {
    departure: string;
    arrival: string;
    duration: string;
    status: string;
    selectFlight: string;
  };
}

export default function FlightCard({ flight, isSelected, onSelect, labels }: FlightCardProps) {
  const departureDate = new Date(flight.departureTime);
  const arrivalDate = new Date(flight.arrivalTime);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };
  
  const calculateDuration = () => {
    const diff = arrivalDate.getTime() - departureDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  
  const getStatusColor = () => {
    switch (flight.status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'landed': return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };
  
  const getStatusIcon = () => {
    switch (flight.status) {
      case 'active': return '🛫';
      case 'scheduled': return '🕐';
      case 'landed': return '🛬';
      case 'cancelled': return '❌';
      default: return '⏱️';
    }
  };
  
  const getStatusText = () => {
    switch (flight.status) {
      case 'active': return 'En vuelo';
      case 'scheduled': return 'Programado';
      case 'landed': return 'Aterrizado';
      case 'cancelled': return 'Cancelado';
      default: return flight.status;
    }
  };
  
  return (
    <div 
      className={`
        bg-white/60 backdrop-blur-md rounded-xl p-4 border transition-all cursor-pointer
        ${isSelected 
          ? 'border-blue-500 shadow-lg shadow-blue-200/50 bg-blue-50/50' 
          : 'border-white/40 hover:border-blue-300 hover:shadow-md hover:bg-white/70'
        }
      `}
      onClick={onSelect}
    >
      {/* Header compacto */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">{flight.flightNumber}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
            {getStatusIcon()} {getStatusText()}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">{flight.airline}</p>
          <p className="text-xs text-slate-400">{flight.aircraft}</p>
        </div>
      </div>
      
      {/* Horarios en línea compacta */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-slate-500">{labels.departure}</p>
          <p className="text-xl font-bold text-slate-900">{formatTime(departureDate)}</p>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-2">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <div className="h-px bg-slate-300 w-8"></div>
            <div className="flex flex-col items-center">
              <span className="text-base">✈️</span>
              <span className="font-semibold whitespace-nowrap">{calculateDuration()}</span>
            </div>
            <div className="h-px bg-slate-300 w-8"></div>
          </div>
        </div>
        
        <div className="flex-1 text-right">
          <p className="text-xs text-slate-500">{labels.arrival}</p>
          <p className="text-xl font-bold text-slate-900">{formatTime(arrivalDate)}</p>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600 font-semibold text-center">
            ✓ Vuelo seleccionado - Ver pronóstico detallado abajo ↓
          </p>
        </div>
      )}
    </div>
  );
}
