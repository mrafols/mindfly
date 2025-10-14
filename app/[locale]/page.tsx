import { getTranslations } from 'next-intl/server';
import FlightSearchForm from '@/components/FlightSearchForm';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 mt-8">
        <div className="inline-block mb-6 float-animation">
          <span className="text-8xl drop-shadow-2xl">✈️</span>
        </div>
        <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
          {t('title')}
        </h1>
        <p className="text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg font-light">
          {t('subtitle')}
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="glass backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
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
        <div className="glass backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
          <div className="text-6xl mb-6 float-animation">🌤️</div>
          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {t('features.realtime.title')}
          </h3>
          <p className="text-white/80 text-lg">
            {t('features.realtime.description')}
          </p>
        </div>

        <div className="glass backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
          <div className="text-6xl mb-6 float-animation" style={{ animationDelay: '1s' }}>📖</div>
          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {t('features.detailed.title')}
          </h3>
          <p className="text-white/80 text-lg">
            {t('features.detailed.description')}
          </p>
        </div>

        <div className="glass backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
          <div className="text-6xl mb-6 float-animation" style={{ animationDelay: '2s' }}>🗺️</div>
          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {t('features.visual.title')}
          </h3>
          <p className="text-white/80 text-lg">
            {t('features.visual.description')}
          </p>
        </div>
      </div>

      {/* Reassurance Section */}
      <div className="glass backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto border border-white/20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
            ¿Por qué volar es seguro?
          </h2>
          <div className="text-left space-y-6 text-white/90 text-lg">
            <p className="flex items-start gap-4 p-4 glass rounded-xl">
              <span className="text-4xl flex-shrink-0">✈️</span>
              <span>
                <strong className="text-white">Volar es el medio de transporte más seguro</strong> que existe. 
                Las estadísticas muestran que tienes más probabilidades de tener un accidente 
                en tu coche camino al aeropuerto que durante el vuelo.
              </span>
            </p>
            <p className="flex items-start gap-4 p-4 glass rounded-xl">
              <span className="text-4xl flex-shrink-0">👨‍✈️</span>
              <span>
                <strong className="text-white">Los pilotos son profesionales altamente cualificados</strong> con 
                miles de horas de entrenamiento. Entrenan regularmente en simuladores para 
                manejar cualquier situación imaginable.
              </span>
            </p>
            <p className="flex items-start gap-4 p-4 glass rounded-xl">
              <span className="text-4xl flex-shrink-0">🔧</span>
              <span>
                <strong className="text-white">Los aviones se revisan constantemente</strong>. Cada avión pasa por 
                múltiples inspecciones antes de cada vuelo y revisiones exhaustivas regulares.
              </span>
            </p>
            <p className="flex items-start gap-4 p-4 glass rounded-xl">
              <span className="text-4xl flex-shrink-0">🛡️</span>
              <span>
                <strong className="text-white">Sistemas redundantes</strong>. Los aviones tienen múltiples sistemas 
                de respaldo para cada función crítica, garantizando la seguridad incluso si 
                algo falla.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

