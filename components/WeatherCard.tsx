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
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold mb-4 text-blue-900">{title}</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{labels.temperature}:</span>
          <span className="text-2xl font-bold text-blue-600">{weather.temperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{labels.conditions}:</span>
          <span className="font-semibold text-gray-800">{weather.conditions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{labels.windSpeed}:</span>
          <span className="font-medium text-gray-700">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{labels.humidity}:</span>
          <span className="font-medium text-gray-700">{weather.humidity}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{labels.visibility}:</span>
          <span className="font-medium text-gray-700">{weather.visibility} km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{labels.pressure}:</span>
          <span className="font-medium text-gray-700">{weather.pressure} hPa</span>
        </div>
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">{weather.description}</p>
      </div>
    </div>
  );
}

