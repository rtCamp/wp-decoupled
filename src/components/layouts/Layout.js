// External.
import Head from 'next/head';
import { useEffect } from 'react';

// Internal.
import { AppProvider } from '../context/AppContext';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker
                    .register('/service-worker.js', { scope: '/' })
                    .then(function () {
                        // SW registered
                    })
                    .catch(function () {
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
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="theme-color" content="#2196F3" />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
                    />
                    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
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
