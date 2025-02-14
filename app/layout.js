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
      </body>
    </html>
  );
}
