/**
 * External dependencies
 */
const path = require('path');

const nextConfig = {
    images: {
        domains: [
            'https://via.placeholder.com',
            new URL(process.env.NEXT_PUBLIC_WOO_SITE_URL).hostname,
        ],
    },
    sassOptions: {
        includePaths: [
            path.resolve('src', 'styles'),
        ],
    }
};

module.exports = nextConfig;
