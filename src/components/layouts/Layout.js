import { useState, useEffect } from 'react';
import { AppProvider } from '../context/AppContext';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/service-worker.js', { scope: '/' })
          .then(function (registration) {
            // SW registered
          })
          .catch(function (registrationError) {
            // SW registration failed
          });
      });
    }
  }, []);

  return (
    <AppProvider>
      <div>
        <Head>
          <title>WP Decoupled</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="theme-color" content="#2196F3" />
          <link rel="manifest" href="/static/manifest/manifest.json" />
        </Head>
        <Header />
        <div className="wd-content">{props.children}</div>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default Layout;
