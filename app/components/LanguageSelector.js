'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import 'flag-icons/css/flag-icons.min.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    // Force language to English
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'en' : 'rw';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <button className="gap-x-1 flex primary-btn-o" onClick={changeLanguage}>
      {i18n.language === 'en' ? (
        <span className="fi fi-rw" title="Kinyarwanda"></span>
      ) : (
        <span className="fi fi-gb" title="English"></span>
      )}
      <span className='desktop-only'>{i18n.language === 'en' ? 'Kinyarwanda' : 'English'}</span>
    </button>
  );
};

export default LanguageSelector;