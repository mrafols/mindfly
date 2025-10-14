import { getTranslations } from 'next-intl/server';
import FlightSearchForm from '@/components/FlightSearchForm';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            {t('searchTitle')}
          </h2>
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

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl mb-4">🌤️</div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            {t('features.realtime.title')}
          </h3>
          <p className="text-gray-600">
            {t('features.realtime.description')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            {t('features.detailed.title')}
          </h3>
          <p className="text-gray-600">
            {t('features.detailed.description')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            {t('features.visual.title')}
          </h3>
          <p className="text-gray-600">
            {t('features.visual.description')}
          </p>
        </div>
      </div>

      {/* Reassurance Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Por qué volar es seguro?
          </h2>
          <div className="text-left space-y-4 text-gray-700">
            <p>
              ✈️ <strong>Volar es el medio de transporte más seguro</strong> que existe. 
              Las estadísticas muestran que tienes más probabilidades de tener un accidente 
              en tu coche camino al aeropuerto que durante el vuelo.
            </p>
            <p>
              👨‍✈️ <strong>Los pilotos son profesionales altamente cualificados</strong> con 
              miles de horas de entrenamiento. Entrenan regularmente en simuladores para 
              manejar cualquier situación imaginable.
            </p>
            <p>
              🔧 <strong>Los aviones se revisan constantemente</strong>. Cada avión pasa por 
              múltiples inspecciones antes de cada vuelo y revisiones exhaustivas regulares.
            </p>
            <p>
              🛡️ <strong>Sistemas redundantes</strong>. Los aviones tienen múltiples sistemas 
              de respaldo para cada función crítica, garantizando la seguridad incluso si 
              algo falla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

