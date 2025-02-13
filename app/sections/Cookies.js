'use client';

import React, { useState, useEffect } from 'react'; 
import { useTranslation } from 'react-i18next';

const CookieConsentPopup = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false); 

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []); 

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');  
    setIsVisible(false);  
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 min-h-[10vh] cookie-banner text-white z-50 flex flex-col md:flex-row justify-between items-start gap-4">
      <p className="text-[12px]" dangerouslySetInnerHTML={{ __html: t("cookie.text") }} />
      <div className="flex items-center space-x-4 pr-1 md:pr-24">
        <small className="cursor-pointer" onClick={() => setIsVisible(false)}>{t("cookie.decline")}</small>
        <button onClick={handleAccept} className="primary-btn- text-white rounded">
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
};

export default CookieConsentPopup;
