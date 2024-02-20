// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "munitydatabucket.s3.amazonaws.com",
      },
    ],
  },
};
