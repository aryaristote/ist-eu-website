'use client';

import './styles/globals.css'; 
import './utils/i18n';
import Head from "./head";
import Layout from './components/Layout';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
        <Head></Head>
    </head>
      <body>
        <Layout>{children}</Layout>
        <Script id="tawk-script" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/674d880a2480f5b4f5a6a23b/1ie3dmqu1';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
