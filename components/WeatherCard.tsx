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
    <div className="glass backdrop-blur-lg rounded-2xl shadow-2xl p-8 hover:scale-105 transition-all border border-white/30">
      <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-base">{labels.temperature}:</span>
          <span className="text-4xl font-bold text-white drop-shadow-lg">{weather.temperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-base">{labels.conditions}:</span>
          <span className="font-semibold text-white">{weather.conditions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-base">{labels.windSpeed}:</span>
          <span className="font-medium text-white">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-base">{labels.humidity}:</span>
          <span className="font-medium text-white">{weather.humidity}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-base">{labels.visibility}:</span>
          <span className="font-medium text-white">{weather.visibility} km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/80 text-base">{labels.pressure}:</span>
          <span className="font-medium text-white">{weather.pressure} hPa</span>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
        <p className="text-sm text-white/90 font-medium">{weather.description}</p>
      </div>
    </div>
  );
}

