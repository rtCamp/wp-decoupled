const path = require('path');

const workBoxOptions = {
    workboxOpts: {
        swSrc: 'service-worker.js',
        swDest: 'static/service-worker.js',
        exclude: [/.+error\.js$/, /\.map$/]
    }
};

const backend_hostname = new URL(process.env.NEXT_PUBLIC_WOO_SITE_URL).hostname;

module.exports = {
    images: {
        domains: [backend_hostname, 'https://via.placeholder.com']
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles', 'sass')]
    }
};
