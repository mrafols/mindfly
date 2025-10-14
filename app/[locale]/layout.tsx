import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import './globals.css';

const locales = ['es', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>MindFly - Vuela Tranquilo | Información Meteorológica de Vuelos</title>
        <meta name="description" content="Conoce las condiciones meteorológicas de tu vuelo y vuela con tranquilidad. Información en tiempo real de rutas aéreas con mapas y explicaciones detalladas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="vuelo, meteorología, clima, aviación, miedo a volar, ansiedad, aeropuertos, pronóstico" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <NextIntlClientProvider messages={messages}>
          <nav className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-xl">✈️</span>
                  </div>
                  <h1 className="text-xl font-bold text-gradient">
                    MindFly
                  </h1>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <footer className="mt-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <p className="text-sm opacity-90 font-semibold">© 2025 MindFly - Vuela con confianza</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-xs opacity-70 max-w-4xl mx-auto">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 opacity-100">📊 Pronósticos Meteorológicos</h4>
                  <p className="mb-2">
                    Los pronósticos de turbulencias y vientos utilizados por MindFly son proporcionados por <strong>NOAA/NWS</strong> (National Oceanic and Atmospheric Administration).
                  </p>
                  <p className="text-xs opacity-60">
                    MindFly procesa estos datos y los adapta a cada ruta de vuelo específica. Los datos presentados no deben considerarse idénticos a las salidas oficiales de NOAA/NWS.
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 opacity-100">✈️ Datos de Aeronaves</h4>
                  <p className="mb-2">
                    Los datos de aeronaves utilizados provienen de <strong>SKYbrary</strong>, un esfuerzo conjunto de Eurocontrol, ICAO y otras organizaciones.
                  </p>
                  <p className="text-xs opacity-60">
                    SKYbrary es un repositorio de referencia para operaciones de vuelo, gestión de tráfico aéreo y seguridad en aviación.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-xs opacity-50">
                  Datos meteorológicos adicionales: Open-Meteo API
                </p>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

