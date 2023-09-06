/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    webpack: (config) => {
        config.watchOptions.ignored.push('**/content/pages/**');
        console.log('start');
        return config;
    }
};

module.exports = nextConfig;
