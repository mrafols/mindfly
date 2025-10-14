'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${currentPath}`);
  };

  return (
    <div className="flex gap-2 bg-white/50 backdrop-blur-sm rounded-xl p-1">
      <button
        onClick={() => switchLanguage('es')}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
          locale === 'es'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'text-slate-600 hover:bg-white/80'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
          locale === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'text-slate-600 hover:bg-white/80'
        }`}
      >
        EN
      </button>
    </div>
  );
}
