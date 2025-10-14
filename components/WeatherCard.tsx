import { WeatherData } from '@/lib/weather';

interface WeatherCardProps {
  title: string;
  weather: WeatherData;
  labels: {
    temperature: string;
    humidity: string;
    windSpeed: string;
    conditions: string;
    pressure: string;
    visibility: string;
  };
}

export default function WeatherCard({ title, weather, labels }: WeatherCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl hover-lift">
      <h3 className="text-lg font-bold mb-6 text-slate-900 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-lg">📍</span>
        </div>
        {title}
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">{labels.temperature}</span>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {weather.temperature}°C
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-t border-slate-100">
          <span className="text-slate-600 text-sm">{labels.conditions}</span>
          <span className="font-semibold text-slate-700">{weather.conditions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">{labels.windSpeed}</span>
          <span className="text-slate-700">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">{labels.humidity}</span>
          <span className="text-slate-700">{weather.humidity}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">{labels.visibility}</span>
          <span className="text-slate-700">{weather.visibility} km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 text-sm">{labels.pressure}</span>
          <span className="text-slate-700">{weather.pressure} hPa</span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">{weather.description}</p>
      </div>
    </div>
  );
}
