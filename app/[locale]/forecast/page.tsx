import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { findAirport, calculateDistance, estimateFlightTime } from '@/lib/airports';
import { getRouteWeather } from '@/lib/weather';
import RouteMap from '@/components/RouteMap';
import WeatherCard from '@/components/WeatherCard';

interface ForecastPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ origin?: string; destination?: string }>;
}

export default async function ForecastPage({ params, searchParams }: ForecastPageProps) {
  const { locale } = await params;
  const { origin, destination } = await searchParams;
  const t = await getTranslations('forecast');

  if (!origin || !destination) {
    notFound();
  }

  const originAirport = findAirport(origin);
  const destAirport = findAirport(destination);

  if (!originAirport || !destAirport) {
    notFound();
  }

  // Obtener datos meteorológicos
  const weather = await getRouteWeather(
    originAirport.lat,
    originAirport.lon,
    destAirport.lat,
    destAirport.lon
  );

  // Calcular distancia y tiempo de vuelo
  const distance = Math.round(
    calculateDistance(
      originAirport.lat,
      originAirport.lon,
      destAirport.lat,
      destAirport.lon
    )
  );
  const flightTime = estimateFlightTime(distance);

  // Análisis de condiciones
  const avgWindSpeed = (weather.origin.windSpeed + weather.destination.windSpeed + (weather.midpoint?.windSpeed || 0)) / 3;
  const avgVisibility = (weather.origin.visibility + weather.destination.visibility + (weather.midpoint?.visibility || 10)) / 3;
  
  const hasStrongWind = avgWindSpeed > 30;
  const hasReducedVisibility = avgVisibility < 5;
  const hasTurbulence = avgWindSpeed > 20;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-700">
          {t('route', { origin: originAirport.city, destination: destAirport.city })}
        </p>
        <div className="flex justify-center gap-6 mt-4 text-gray-600">
          <span>📏 {t('distance', { distance: distance.toString() })}</span>
          <span>⏱️ {t('flightTime', { time: flightTime })}</span>
        </div>
      </div>

      {/* Map */}
      <div className="mb-12">
        <RouteMap
          originLat={originAirport.lat}
          originLon={originAirport.lon}
          originName={originAirport.city}
          destLat={destAirport.lat}
          destLon={destAirport.lon}
          destName={destAirport.city}
        />
      </div>

      {/* Weather Cards */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          {t('weatherConditions')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <WeatherCard
            title={t('originWeather')}
            weather={weather.origin}
            labels={{
              temperature: t('temperature'),
              humidity: t('humidity'),
              windSpeed: t('windSpeed'),
              conditions: t('conditions'),
              pressure: t('pressure'),
              visibility: t('visibility'),
            }}
          />
          {weather.midpoint && (
            <WeatherCard
              title={t('routeWeather')}
              weather={weather.midpoint}
              labels={{
                temperature: t('temperature'),
                humidity: t('humidity'),
                windSpeed: t('windSpeed'),
                conditions: t('conditions'),
                pressure: t('pressure'),
                visibility: t('visibility'),
              }}
            />
          )}
          <WeatherCard
            title={t('destinationWeather')}
            weather={weather.destination}
            labels={{
              temperature: t('temperature'),
              humidity: t('humidity'),
              windSpeed: t('windSpeed'),
              conditions: t('conditions'),
              pressure: t('pressure'),
              visibility: t('visibility'),
            }}
          />
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          {t('explanation.title')}
        </h2>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-lg">
            {t('explanation.intro')}
          </p>

          {/* Overall Conditions */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="font-semibold text-green-900">
              {avgWindSpeed < 20 && avgVisibility > 8
                ? t('explanation.goodConditions')
                : t('explanation.normalConditions')}
            </p>
          </div>

          {/* Turbulence Section */}
          {hasTurbulence && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {t('explanation.turbulence.title')}
              </h3>
              <p className="mb-2">
                {avgWindSpeed < 30
                  ? t('explanation.turbulence.light')
                  : t('explanation.turbulence.moderate')}
              </p>
              <p className="text-sm">
                {t('explanation.turbulence.info')}
              </p>
            </div>
          )}

          {/* Wind Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              {t('explanation.wind.title')}
            </h3>
            <p>
              {hasStrongWind
                ? t('explanation.wind.strong')
                : t('explanation.wind.normal')}
            </p>
          </div>

          {/* Visibility Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              {t('explanation.visibility.title')}
            </h3>
            <p>
              {hasReducedVisibility
                ? t('explanation.visibility.reduced')
                : t('explanation.visibility.good')}
            </p>
          </div>

          {/* Safety Reminder */}
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border-2 border-blue-300">
            <p className="text-lg font-semibold text-blue-900">
              💙 {t('explanation.safety')}
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Link
          href={`/${locale}`}
          className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          {t('newSearch')}
        </Link>
      </div>
    </div>
  );
}

