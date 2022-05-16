/** @type {{future: {webpack5: boolean}, reactStrictMode: boolean, env: {API_BASE_URL: string}}} */
const nextConfig = {
    reactStrictMode: false,

    future: {
        webpack5: true,
    },
    env: {
        'API_BASE_URL': 'https://loremguo.com/back-office'
    },
    images: {
        domains: ['loremguo.com'],
    },
}

module.exports = nextConfig
