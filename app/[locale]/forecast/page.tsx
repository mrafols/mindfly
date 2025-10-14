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
      <div className="text-center mb-12">
        <div className="inline-block mb-6 float-animation">
          <span className="text-7xl drop-shadow-2xl">✈️</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl">
          {t('title')}
        </h1>
        <p className="text-3xl text-white/90 drop-shadow-lg font-light">
          {t('route', { origin: originAirport.city, destination: destAirport.city })}
        </p>
        <div className="flex justify-center gap-8 mt-6">
          <div className="glass backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
            <span className="text-white text-lg font-semibold">📏 {t('distance', { distance: distance.toString() })}</span>
          </div>
          <div className="glass backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
            <span className="text-white text-lg font-semibold">⏱️ {t('flightTime', { time: flightTime })}</span>
          </div>
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
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
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
      <div className="glass backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-12 border border-white/20">
        <h2 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          {t('explanation.title')}
        </h2>
        
        <div className="space-y-6 text-white/90 text-lg">
          <p className="text-xl text-center font-light">
            {t('explanation.intro')}
          </p>

          {/* Overall Conditions */}
          <div className="bg-green-500/20 border-l-4 border-green-400 p-6 rounded-xl backdrop-blur-sm">
            <p className="font-semibold text-white text-lg">
              {avgWindSpeed < 20 && avgVisibility > 8
                ? t('explanation.goodConditions')
                : t('explanation.normalConditions')}
            </p>
          </div>

          {/* Turbulence Section */}
          {hasTurbulence && (
            <div className="glass backdrop-blur-sm p-8 rounded-2xl border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('explanation.turbulence.title')}
              </h3>
              <p className="mb-4 text-white/90">
                {avgWindSpeed < 30
                  ? t('explanation.turbulence.light')
                  : t('explanation.turbulence.moderate')}
              </p>
              <p className="text-sm text-white/80">
                {t('explanation.turbulence.info')}
              </p>
            </div>
          )}

          {/* Wind Section */}
          <div className="glass backdrop-blur-sm p-8 rounded-2xl border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('explanation.wind.title')}
            </h3>
            <p className="text-white/90">
              {hasStrongWind
                ? t('explanation.wind.strong')
                : t('explanation.wind.normal')}
            </p>
          </div>

          {/* Visibility Section */}
          <div className="glass backdrop-blur-sm p-8 rounded-2xl border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('explanation.visibility.title')}
            </h3>
            <p className="text-white/90">
              {hasReducedVisibility
                ? t('explanation.visibility.reduced')
                : t('explanation.visibility.good')}
            </p>
          </div>

          {/* Safety Reminder */}
          <div className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 p-8 rounded-2xl border-2 border-blue-400/50 backdrop-blur-sm">
            <p className="text-xl font-semibold text-white flex items-center gap-3">
              <span className="text-3xl">💙</span> {t('explanation.safety')}
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Link
          href={`/${locale}`}
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-10 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
        >
          ✈️ {t('newSearch')}
        </Link>
      </div>
    </div>
  );
}

