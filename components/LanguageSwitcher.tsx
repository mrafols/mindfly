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
    <div className="flex gap-3">
      <button
        onClick={() => switchLanguage('es')}
        className={`px-5 py-2 rounded-xl transition-all font-semibold text-lg ${
          locale === 'es'
            ? 'bg-white text-blue-600 shadow-lg'
            : 'glass text-white hover:bg-white/30'
        }`}
      >
        🇪🇸 ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-5 py-2 rounded-xl transition-all font-semibold text-lg ${
          locale === 'en'
            ? 'bg-white text-blue-600 shadow-lg'
            : 'glass text-white hover:bg-white/30'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}

