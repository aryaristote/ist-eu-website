import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/674d880a2480f5b4f5a6a23b/1ie3dmqu1';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkChat;
