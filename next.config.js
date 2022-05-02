/** @type {{future: {webpack5: boolean}, reactStrictMode: boolean, env: {API_BASE_URL: string}}} */
const nextConfig = {
  reactStrictMode: false,
  future: {
    webpack5: true,
  },
  env: {
    'API_BASE_URL': 'http://192.168.0.112:1337'
  }
}

module.exports = nextConfig
