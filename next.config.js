// module.exports = {
//   reactStrictMode: true,
// }

/**
 * @type {import('next').NextConfig}
 */

 const nextConfig = {
  webpack: (config, { webpack }) => {
      config.plugins.push(new webpack.IgnorePlugin({
          resourceRegExp: /^web3Modal$/
      }),);
      return config
  }
}

module.exports = nextConfig