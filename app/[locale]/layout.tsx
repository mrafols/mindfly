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
      <body className="min-h-screen bg-white">
        <NextIntlClientProvider messages={messages}>
          <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✈️</span>
                  <h1 className="text-xl font-semibold text-gray-900">
                    MindFly
                  </h1>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <footer className="mt-auto border-t border-gray-100 py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
              <p className="text-sm">© 2025 MindFly</p>
              <p className="text-xs mt-1 text-gray-500">Datos meteorológicos: Open-Meteo</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

