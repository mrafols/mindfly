import { getTranslations } from 'next-intl/server';
import FlightSearchForm from '@/components/FlightSearchForm';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-block mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-6 mx-auto">
            <span className="text-4xl">✈️</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fadeInUp">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-8 md:p-10 border border-white/20">
          <FlightSearchForm
            labels={{
              flightNumber: t('flightNumber'),
              flightNumberPlaceholder: t('flightNumberPlaceholder'),
              flightNumberHelper: t('flightNumberHelper'),
              searchButton: t('searchButton'),
            }}
            errorMessage={t.raw('errors.fillFields')}
          />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover-lift border border-white/40 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
              🌤️
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {t('features.realtime.title')}
            </h3>
            <p className="text-slate-600">
              {t('features.realtime.description')}
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover-lift border border-white/40 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
              📖
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {t('features.detailed.title')}
            </h3>
            <p className="text-slate-600">
              {t('features.detailed.description')}
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover-lift border border-white/40 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
              🗺️
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {t('features.visual.title')}
            </h3>
            <p className="text-slate-600">
              {t('features.visual.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Safety Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          ¿Por qué volar es seguro?
        </h2>
        <p className="text-center text-slate-600 mb-12 text-lg">Datos que te ayudarán a volar con confianza</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover-lift border border-white/40 shadow-lg">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                ✈️
              </div>
              <div>
                <strong className="text-slate-900 text-lg">El medio más seguro</strong>
                <p className="text-slate-600 mt-1 text-sm">Las estadísticas lo confirman: es más seguro que conducir.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover-lift border border-white/40 shadow-lg">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                👨‍✈️
              </div>
              <div>
                <strong className="text-slate-900 text-lg">Pilotos expertos</strong>
                <p className="text-slate-600 mt-1 text-sm">Miles de horas de entrenamiento y experiencia.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover-lift border border-white/40 shadow-lg">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                🔧
              </div>
              <div>
                <strong className="text-slate-900 text-lg">Mantenimiento riguroso</strong>
                <p className="text-slate-600 mt-1 text-sm">Inspecciones constantes y protocolos estrictos.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 hover-lift border border-white/40 shadow-lg">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                🛡️
              </div>
              <div>
                <strong className="text-slate-900 text-lg">Sistemas redundantes</strong>
                <p className="text-slate-600 mt-1 text-sm">Múltiples respaldos para cada función crítica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

