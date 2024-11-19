export default {
  reactStrictMode: false,
  images: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com', 'randomuser.me'],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
