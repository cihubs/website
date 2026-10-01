import React from 'react';

interface LanguageSwitcherProps {
  currentLocale?: string;
  onLocaleChange?: (locale: string) => void;
}

export default function LanguageSwitcher({ currentLocale = 'es', onLocaleChange }: LanguageSwitcherProps) {
  const locales = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    // Add more locales here when needed:
    // { code: 'de', label: 'DE' },
    // { code: 'ko', label: 'KO' },
    // { code: 'zh', label: 'ZH' },
    // { code: 'ja', label: 'JA' },
    // { code: 'pt', label: 'PT' },
  ];

  const handleLocaleChange = (localeCode: string) => {
    if (onLocaleChange) {
      onLocaleChange(localeCode);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => handleLocaleChange(locale.code)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentLocale === locale.code
              ? 'bg-[#203370] text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
        >
          {locale.label}
        </button>
      ))}
    </div>
  );
}
