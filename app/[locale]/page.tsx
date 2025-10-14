import { getTranslations } from 'next-intl/server';
import FlightSearchForm from '@/components/FlightSearchForm';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <FlightSearchForm
            labels={{
              origin: t('origin'),
              originPlaceholder: t('originPlaceholder'),
              destination: t('destination'),
              destinationPlaceholder: t('destinationPlaceholder'),
              searchButton: t('searchButton'),
            }}
            errorMessage={t.raw('errors.fillFields')}
          />
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🌤️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('features.realtime.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('features.realtime.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('features.detailed.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('features.detailed.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('features.visual.title')}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('features.visual.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Safety Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ¿Por qué volar es seguro?
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex gap-4">
              <span className="text-3xl">✈️</span>
              <div>
                <strong className="text-gray-900">Volar es el medio de transporte más seguro</strong>
                <p className="text-gray-600 mt-1">Las estadísticas muestran que tienes más probabilidades de tener un accidente en tu coche camino al aeropuerto que durante el vuelo.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex gap-4">
              <span className="text-3xl">👨‍✈️</span>
              <div>
                <strong className="text-gray-900">Pilotos altamente cualificados</strong>
                <p className="text-gray-600 mt-1">Miles de horas de entrenamiento y práctica regular en simuladores para manejar cualquier situación.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex gap-4">
              <span className="text-3xl">🔧</span>
              <div>
                <strong className="text-gray-900">Revisiones constantes</strong>
                <p className="text-gray-600 mt-1">Múltiples inspecciones antes de cada vuelo y revisiones exhaustivas regulares.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex gap-4">
              <span className="text-3xl">🛡️</span>
              <div>
                <strong className="text-gray-900">Sistemas redundantes</strong>
                <p className="text-gray-600 mt-1">Múltiples sistemas de respaldo para cada función crítica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

