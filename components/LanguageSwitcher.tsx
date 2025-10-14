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
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          locale === 'es'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
          locale === 'en'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  );
}
