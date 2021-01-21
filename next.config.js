const withCss = require('@zeit/next-css');
const path = require('path');

const withOffline = require('next-offline');
const withSass = require('@zeit/next-sass');

const workBoxOptions = {
    workboxOpts: {
        swSrc: 'service-worker.js',
        swDest: 'static/service-worker.js',
        exclude: [/.+error\.js$/, /\.map$/]
    }
};

const backend_hostname = new URL(process.env.NEXT_PUBLIC_WOO_SITE_URL).hostname;

module.exports = withOffline(
    withCss(
        withSass({
            workboxOpts: workBoxOptions.workboxOpts,
            generateInDevMode: true,
            dontAutoRegisterSw: true,
            generateSw: false,
            globPatterns: ['static/**/*'],
            globDirectory: '.',
            target: 'serverless',
            images: {
                  domains: [
                        backend_hostname,
                        'https://via.placeholder.com'
                    ],
            },
        })
    )
);
