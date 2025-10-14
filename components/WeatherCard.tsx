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
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{labels.temperature}</span>
          <span className="text-2xl font-bold text-gray-900">{weather.temperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{labels.conditions}</span>
          <span className="font-medium text-gray-700">{weather.conditions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{labels.windSpeed}</span>
          <span className="text-gray-700">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{labels.humidity}</span>
          <span className="text-gray-700">{weather.humidity}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{labels.visibility}</span>
          <span className="text-gray-700">{weather.visibility} km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{labels.pressure}</span>
          <span className="text-gray-700">{weather.pressure} hPa</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">{weather.description}</p>
      </div>
    </div>
  );
}
