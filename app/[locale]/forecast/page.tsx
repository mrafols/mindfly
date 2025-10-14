import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { findAirport, calculateDistance, estimateFlightTime } from '@/lib/airports';
import { getRouteWeather } from '@/lib/weather';
import { searchFlights } from '@/lib/flights';
import RouteMap from '@/components/RouteMap';
import WeatherCard from '@/components/WeatherCard';
import FlightSelector from '@/components/FlightSelector';

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

  // Buscar vuelos disponibles
  const flights = await searchFlights(origin, destination);

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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6 mx-auto">
            <span className="text-3xl">✈️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t('title')}
          </h1>
          <p className="text-2xl text-slate-700 mb-6 font-semibold">
            {t('route', { origin: originAirport.city, destination: destAirport.city })}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/40 shadow-lg">
              <span className="text-slate-600 text-sm font-medium">📏 {t('distance', { distance: distance.toString() })}</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/40 shadow-lg">
              <span className="text-slate-600 text-sm font-medium">⏱️ {t('flightTime', { time: flightTime })}</span>
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

        {/* Vuelos Disponibles */}
        <div className="mb-16">
          <FlightSelector
            flights={flights}
            originLat={originAirport.lat}
            originLon={originAirport.lon}
            destLat={destAirport.lat}
            destLon={destAirport.lon}
            labels={{
              title: t('flights.title'),
              noFlights: t('flights.noFlights'),
              loading: t('flights.loading'),
              flightLabels: {
                departure: t('flights.departure'),
                arrival: t('flights.arrival'),
                duration: t('flights.duration'),
                status: t('flights.status'),
                selectFlight: t('flights.selectFlight'),
              },
              turbulenceLabels: {
                title: t('turbulence.title'),
                severity: t('turbulence.severity'),
                probability: t('turbulence.probability'),
                altitude: t('turbulence.altitude'),
              },
            }}
          />
        </div>

        {/* Weather Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
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
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-10 mb-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            {t('explanation.title')}
          </h2>
          
          <div className="space-y-6 text-slate-700">
            <p className="text-slate-600 text-center text-lg">
              {t('explanation.intro')}
            </p>

            {/* Overall Conditions */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-2xl shadow-sm">
              <p className="font-semibold text-green-900 text-lg">
                {avgWindSpeed < 20 && avgVisibility > 8
                  ? t('explanation.goodConditions')
                  : t('explanation.normalConditions')}
              </p>
            </div>

            {/* Turbulence Section */}
            {hasTurbulence && (
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t('explanation.turbulence.title')}
                </h3>
                <p className="mb-3 text-slate-600">
                  {avgWindSpeed < 30
                    ? t('explanation.turbulence.light')
                    : t('explanation.turbulence.moderate')}
                </p>
                <p className="text-sm text-slate-500">
                  {t('explanation.turbulence.info')}
                </p>
              </div>
            )}

            {/* Wind Section */}
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t('explanation.wind.title')}
              </h3>
              <p className="text-slate-600">
                {hasStrongWind
                  ? t('explanation.wind.strong')
                  : t('explanation.wind.normal')}
              </p>
            </div>

            {/* Visibility Section */}
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t('explanation.visibility.title')}
              </h3>
              <p className="text-slate-600">
                {hasReducedVisibility
                  ? t('explanation.visibility.reduced')
                  : t('explanation.visibility.good')}
              </p>
            </div>

            {/* Safety Reminder */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-lg">
              <p className="font-semibold text-blue-900 text-lg">
                💙 {t('explanation.safety')}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href={`/${locale}`}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-10 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg shadow-blue-500/30 hover:shadow-xl"
          >
            {t('newSearch')}
          </Link>
        </div>
      </div>
    </div>
  );
}

