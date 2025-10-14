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
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'landed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
        bg-white/70 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all cursor-pointer hover-lift
        ${isSelected 
          ? 'border-blue-500 shadow-blue' 
          : 'border-white/40 shadow-lg hover:border-blue-300'
        }
      `}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {flight.airline} {flight.flightNumber}
          </h3>
          <p className="text-sm text-slate-600">{flight.aircraft}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">{labels.departure}</p>
          <p className="text-lg font-bold text-slate-900">{formatTime(departureDate)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">{labels.duration}</p>
          <p className="text-sm font-semibold text-slate-700">{calculateDuration()}</p>
          <div className="flex items-center justify-center mt-1">
            <div className="h-px bg-slate-300 flex-1"></div>
            <span className="text-lg mx-2">✈️</span>
            <div className="h-px bg-slate-300 flex-1"></div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1">{labels.arrival}</p>
          <p className="text-lg font-bold text-slate-900">{formatTime(arrivalDate)}</p>
        </div>
      </div>
      
      {isSelected && (
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-blue-600 font-semibold text-center">
            ✓ Vuelo seleccionado - Ver pronóstico detallado abajo
          </p>
        </div>
      )}
    </div>
  );
}

