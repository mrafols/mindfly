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
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage('es')}
        className={`px-3 py-1 rounded-lg transition-colors ${
          locale === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        🇪🇸 ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded-lg transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}

